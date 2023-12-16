import { db } from "../conexion.js";
import { collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";

function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatearYSetear = (arrayDeDocumentos) => {
    setLoading(false);
    const categoriasTemp = arrayDeDocumentos.map((documento) => {
      return { ...documento.data(), id: documento.id };
    });
    setCategorias(categoriasTemp);
    localStorage.setItem("categorias", JSON.stringify(categoriasTemp));
  };

  const getCategoriasDB = async () => {
    const categoriasCollection = collection(db, "categorias");
    const categoriasQuery = query(categoriasCollection);
    const consulta = await getDocs(categoriasQuery);
    formatearYSetear(consulta.docs);
  };

  useEffect(() => {
    getCategoriasDB();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!loading) {
    return (
      <>
        <option value="">Seleccione una categoria</option>
        {categorias.map((element, index) => {
          return (
            <option key={index} value={element.categoria}>
              {element.icon} {element.categoria}
            </option>
          );
        })}
      </>
    );
  } else {
    return <></>;
  }
}

export default Categorias;
