'use client'

import { useEffect, useState } from "react";
import { getCategoriesDB } from "../services/db.js";

function Categorias() {
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  const getCategories = async () => {
    const categories = await getCategoriesDB();
    setCategories(categories);
    setLoading(false);
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    localStorage.setItem("categorias", JSON.stringify(categories));
  }, [categories]);

  if (loading) return <option>Cargando...</option>;

  return (
    <>
      <option value="">Seleccione una categoria</option>
      {categories.map((element, index) => {
        return (
          <option key={index} value={element.categoria}>
            {element.icon} {element.categoria}
          </option>
        );
      })}
    </>
  );
}

export default Categorias;
