import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../conexion";
import {
  doc,
  updateDoc,
  deleteDoc,
  collection,
  where,
  query,
  orderBy,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { getCategoriesDB } from "../services/db";
import { formatFirebaseData } from "../auxiliar/formatFirebaseData";

const contexto = createContext();
const { Provider } = contexto;

export const useGeneral = () => {
  return useContext(contexto);
};

const GeneralProvider = ({ children }) => {
  const [records, setRecords] = useState([]);
  const [dateFilter, setDateFilter] = useState();
  const [loadingRecords, setLoadingRecords] = useState(true);
  const [editingRecord, setEditingRecord] = useState({
    state: false,
    record: {},
  });
  const [categories, setCategories] = useState([]);
  const [resume, setResume] = useState({ total: 0, totalPerUser: {} });

  const postRecords = (records) => {
    setRecords(records);
  };

  const editRecord = async (collection, id, updateDocument) => {
    const documentRef = doc(db, collection, id);
    await updateDoc(documentRef, updateDocument);
  };

  const delRecord = async (collection, id) => {
    let del = false;
    if (window.confirm("Se borrará el registro. ¿Está seguro?")) del = true;

    if (del) {
      await deleteDoc(doc(db, collection, id));
      toast.success("Registro borrado con exito", { theme: "dark" });
    }
  };

  useEffect(() => {
    getCategories();

    // Establece la fecha actual como filtro
    const currentDate = new Date();
    let currentMonth = currentDate.getMonth() + 1;
    currentMonth =
      currentMonth.length === 2 ? currentMonth : "0" + currentMonth;
    setDateFilter(`${currentDate.getFullYear()}-${currentMonth}`);
  }, []);

  useEffect(() => {
    if (!dateFilter || categories.length === 0) return;

    const recordColl = collection(db, "gastos");
    const [y, m] = dateFilter.split("-");
    const date1 = new Date(y, m - 1, 1);
    const date2 = new Date(y, m, 1);

    const w2 = where("date", ">=", date1);
    const w3 = where("date", "<=", date2);
    const q = query(recordColl, w2, w3, orderBy("date", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const records = formatFirebaseData(querySnapshot.docs);
      const recordsWithIcon = records.map((record) => {
        const catIcon = categories.find(
          (categorie) => categorie.categoria === record.categoria
        );
        const dateFormated = record.date.toDate();
        return { ...record, icon: catIcon?.icon || "", date: dateFormated };
      });
      setRecords(recordsWithIcon);
      setLoadingRecords(false);
    });
  }, [dateFilter, categories]);

  useEffect(() => {
    let total = 0;

    const totalPerUser = {};
    records.forEach(({ monto, persona }) => {
      // Total
      total += monto;

      // Total per user
      if (totalPerUser[persona.name]) {
        totalPerUser[persona.name] += monto;
      } else {
        totalPerUser[persona.name] = monto;
      }
    });

    setResume({ total, totalPerUser });
  }, [records]);

  const getCategories = async () => {
    const categories = await getCategoriesDB();
    setCategories(categories);
  };

  const contextValues = {
    records,
    dateFilter,
    setDateFilter,
    loadingRecords,
    postRecords,
    editRecord,
    delRecord,
    setEditingRecord,
    editingRecord,
    categories,
    resume,
  };

  return <Provider value={contextValues}>{children}</Provider>;
};

export default GeneralProvider;
