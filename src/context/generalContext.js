'use client'

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
} from "firebase/firestore";
import { toast } from "react-toastify";
import { getCategoriesDB } from "../services/db";
import { formatFirebaseData } from "../auxiliar/formatFirebaseData";

const getInitialDateState = () => {
  const currentDate = new Date()

  const year = currentDate.getFullYear()
  const month = String(currentDate.getMonth() + 1).padStart(2, "0")
  const date = `${year}-${month}`

  return date
}

const contexto = createContext();
const { Provider } = contexto;

export const useGeneral = () => {
  return useContext(contexto);
};

const GeneralProvider = ({ children }) => {
  const [records, setRecords] = useState([]);
  const [filter, setFilter] = useState({
    date: getInitialDateState(),
    category: "all"
  });
  const [loadingRecords, setLoadingRecords] = useState(true);
  const [editingRecord, setEditingRecord] = useState({
    state: false,
    record: {},
  });
  const [categories, setCategories] = useState([]);
  const [resume, setResume] = useState({ total: 0, totalPerUser: {} });

  const [recordModal, setRecordModal] = useState({
    show: false,
    record: {},
  });

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
      return true;
    }
  };

  useEffect(() => {
    getCategories()
  }, [])

  useEffect(() => {
    if (!filter.date || !filter.category || categories.length === 0) return;

    const whereConditions = []

    const recordColl = collection(db, "gastos")

    // Date filters
    const [y, m] = filter.date.split("-")
    const date1 = new Date(y, m - 1, 1)
    const date2 = new Date(y, m, 1)

    whereConditions.push(where("date", ">=", date1))
    whereConditions.push(where("date", "<=", date2))

    // Category filter
    if (filter.category !== "all") {
      whereConditions.push(where("categoria", "==", filter.category))
    }

    const q = query(recordColl, ...whereConditions, orderBy("date", "desc"));
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
  }, [filter, categories]);

  useEffect(() => {
    console.log("Hasta acá llega sin problemas")
    let total = 0;

    const totalPerUser = {};
    records.forEach(({ monto, persona }) => {
      // Total
      total += Number(monto);

      // Total per user
      if (totalPerUser[persona.name]) {
        totalPerUser[persona.name] += Number(monto);
      } else {
        totalPerUser[persona.name] = Number(monto);
      }
    });

    setResume({ total, totalPerUser });
  }, [records]);

  const getCategories = async () => {
    const categories = await getCategoriesDB();
    setCategories(categories);
  };

  const closeModal = () => setRecordModal({ ...recordModal, show: false });

  const contextValues = {
    records,
    filter,
    setFilter,
    loadingRecords,
    postRecords,
    editRecord,
    delRecord,
    setEditingRecord,
    editingRecord,
    categories,
    resume,
    recordModal,
    setRecordModal,
    closeModal,
  };

  return <Provider value={contextValues}>{children}</Provider>;
};

export default GeneralProvider;
