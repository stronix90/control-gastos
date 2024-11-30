'use client'

import RecordList from "./RecordList";
import { useGeneral } from "../context/generalContext";

export default function RecordsContainer() {
  const { filter, setFilter, categories } = useGeneral();

  const handleChange = (e) => {
    setFilter((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      }
    });
  };

  // const handleCategoryChange = (e) => {};

  return (
    <div className="card bg-dark mt-5">
      <div className="card-header">
        <h5>Registros</h5>
      </div>

      <div className="card flex-row flew-wrap bg-dark m-2">
        <input
          type="month"
          id="date"
          name="date"
          defaultValue={filter.date}
          onChange={handleChange}
          className="m-2 p-2"
          style={{ width: "100%" }}
        />
        <select
          name="category"
          id="records-category"
          className="m-2 p-2"
          style={{ width: "100%" }}
          onChange={handleChange}
        >
          <option value="all">Mostrar todas las categorias</option>
          {categories.map((category) => {
            return (
              <option
                key={category.categoria}
                value={category.categoria}
              >{`${category.icon} ${category.categoria}`}</option>
            );
          })}
        </select>
      </div>
      {filter.date && <RecordList />}
    </div>
  );
}
