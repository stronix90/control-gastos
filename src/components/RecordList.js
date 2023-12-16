import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../conexion";
import Records from "./Records";
import { useGeneral } from "../context/generalContext";
import JSONToCSVConvertor from "../auxiliar/convJSONtoCSV";
import { Button } from "react-bootstrap";

const RecordList = ({ dateFilter }) => {
  const [total, setTotal] = useState({ total: 0, totalesPorPersona: 0 });
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const { records, postRecords } = useGeneral();

  const formatearYSetear = (arrayDeDocumentos) => {
    return arrayDeDocumentos.map((documento) => {
      return { ...documento.data(), id: documento.id };
    });
  };

  const calcTotal = (registros) => {
    const total = registros.reduce(
      (previous, current) => previous + current.monto,
      0
    );

    const totalesPorPersona = {};
    registros.forEach((registro) => {
      if (totalesPorPersona[registro.persona.name]) {
        totalesPorPersona[registro.persona.name] += registro.monto;
      } else {
        totalesPorPersona[registro.persona.name] = registro.monto;
      }
    });

    setTotal({ total, totalesPorPersona });
  };

  const getRecords = async (categorias) => {
    const gastosCollection = collection(db, "gastos");
    const [y, m] = dateFilter.split("-");
    const date1 = new Date(y, m - 1, 1);
    const date2 = new Date(y, m, 1);

    const w2 = where("date", ">=", date1);
    const w3 = where("date", "<=", date2);
    const q = query(gastosCollection, w2, w3, orderBy("date", "desc"));

    const unsubscribe = await onSnapshot(q, (querySnapshot) => {
      const result = formatearYSetear(querySnapshot.docs);
      let records = addIconToCategorie(result, categorias || categories);

      records.map((record) => {
        record.date = record.date.toDate();
      });
      postRecords(records);
      calcTotal(records);
      setLoading(false);
    });
  };

  const addIconToCategorie = (records, categorias) => {
    return records.map((record) => {
      const catIcon = categorias.find(
        (categorie) => categorie.categoria === record.categoria
      );
      return { ...record, icon: catIcon?.icon || "" };
    });
  };

  useEffect(() => {
    if (categories.length === 0) {
      const categoriasCollection = collection(db, "categorias");
      const categoriasQuery = query(categoriasCollection);
      getDocs(categoriasQuery).then((querySnapshot) => {
        const result = formatearYSetear(querySnapshot.docs);
        setCategories(result);
        getRecords(result);
      });
    } else getRecords();

    // return () => {
    //     unsubscribe();
    // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateFilter]);

  const handleDownloadExcel = () => {
    records.map((record) => {
      record.date = record.date.toLocaleDateString();
      record.persona = record.persona.name;
    });

    console.log(records);
    JSONToCSVConvertor(records, "Control Gastos", true);
  };

  const porcentajes = {
    "Brian Luna": 60,
    "Noelia Torres": 40,
  };

  let opciones = {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  return (
    <>
      <div className="card records">
        {loading ? (
          <p>Cargando</p>
        ) : (
          <>
            {records.map((record, index) => (
              <Records key={index} record={record} />
            ))}
            <Button variant="warning" onClick={handleDownloadExcel}>
              <img
                width={28}
                src="https://upload.wikimedia.org/wikipedia/commons/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg"
                alt=""
              />
              Descargar
            </Button>

            <div
              style={{
                display: "flex",
                gap: ".5rem",
                flexDirection: "column",
                paddingLeft: "1rem",
              }}
            >
              <p>
                <b>
                  Gasto total: ${total.total.toLocaleString("es-ES", opciones)}
                </b>
              </p>
              {Object.keys(total.totalesPorPersona).map((persona) => {
                return (
                  <p key={persona}>
                    {persona}: $
                    {total.totalesPorPersona[persona].toLocaleString(
                      "es-ES",
                      opciones
                    )}
                    | [{porcentajes[persona]}] | $
                    {(
                      (total.total * porcentajes[persona]) /
                      100
                    ).toLocaleString("es-ES", opciones)}
                  </p>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default RecordList;
