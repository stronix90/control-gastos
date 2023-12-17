import { collection, getDocs, onSnapshot, query } from "firebase/firestore";
import { formatFirebaseData } from "../auxiliar/formatFirebaseData";
import { db } from "../conexion.js";

export async function getCategoriesDB() {
  const categoriesColl = collection(db, "categorias");
  const categoriesQuery = query(categoriesColl);
  const categories = await getDocs(categoriesQuery);

  return formatFirebaseData(categories.docs);
}
