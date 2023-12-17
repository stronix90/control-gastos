import RecordList from "./RecordList";
import { useGeneral } from "../context/generalContext";

export default function RecordsContainer() {
  const { setDateFilter, dateFilter } = useGeneral();

  const handleChange = (e) => {
    setDateFilter(e.target.value);
  };

  return (
    <div className="card bg-dark mt-5">
      <div className="card-header">
        <h5>Registros</h5>
      </div>

      <input
        type="month"
        id="date"
        name="date"
        defaultValue={dateFilter}
        onChange={handleChange}
        className="m-2 p-2"
      />
      {dateFilter && <RecordList />}
    </div>
  );
}
