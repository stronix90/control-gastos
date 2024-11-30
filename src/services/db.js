import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { formatFirebaseData } from "../auxiliar/formatFirebaseData";
import { db } from "../conexion.js";

export async function getCategoriesDB() {
  const categoriesColl = collection(db, "categorias");
  const categoriesQuery = query(categoriesColl);
  const categories = await getDocs(categoriesQuery);

  return formatFirebaseData(categories.docs);
}

export async function getGroupsDB({uid}) {
  const groupColl = collection(db, "grupos")
  const q = query(groupColl, where("usuarios", "array-contains", uid))
  const querySnapshot = await getDocs(q)

  const grupos = []
  querySnapshot.forEach((doc) => { grupos.push({ id: doc.id, ...doc.data() }); })
  return grupos
}
