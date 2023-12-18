import { useGeneral } from "../context/generalContext";

const Records = ({ record, openModal }) => {
  const { delRecord, setEditingRecord } = useGeneral();

  const daysName = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];

  const iniciales = record.persona.name
    .split(" ")
    .map((palabra) => {
      return palabra[0];
    })
    .join("");

  const delEntry = async () => {
    delRecord("gastos", record.id);
  };

  const editEntry = () => {
    setEditingRecord({ state: true, record: record });
  };

  return (
    <>
      <div className="row record">
        {/* // Avatars */}
        <div className="col-auto my-auto d-flex flex-column align-items-center ps-0">
          <div className="mainAvatar">{iniciales}</div>
          <div className="secondAvatar">{record.icon}</div>
        </div>

        {/* // 2da columna */}
        <div className="col px-0 details_column">
          <p className="text_primary">
            {record.description ? `${record.description}` : record.categoria}
          </p>

          <div className="details_extra">
            <p className="text_secondary">
              {record.description
                ? daysName[new Date(record.date).getDay()] +
                  " " +
                  new Date(record.date).getDate() +
                  " | " +
                  record.categoria
                : daysName[new Date(record.date).getDay()] +
                  " " +
                  new Date(record.date).getDate()}
            </p>
            <p className="text_amount">${record.monto}</p>
          </div>
        </div>

        {/* // Acciones */}
        {/* <div className="col-auto my-auto ms-auto">
        <i
          style={{ cursor: "pointer" }}
          className="fa fa-trash"
          aria-hidden="true"
          onClick={delEntry}
        ></i>
        <i
          style={{ cursor: "pointer", marginLeft: "10px" }}
          className="fa fa-edit"
          aria-hidden="true"
          onClick={editEntry}
        ></i>
      </div> */}

        {/* // Monto */}
        {/* <div className="col-auto my-auto text_amount">${record.monto}</div> */}
      </div>
    </>
  );

  return (
    <div className="row">
      {/* // Avatars */}
      <div className="col-auto my-auto d-flex flex-column align-items-end ">
        <div className="mainAvatar">{iniciales}</div>
        <div className="secondAvatar">{record.icon}</div>
      </div>

      {/* // Descripción */}
      <div className="col my-auto px-0">
        <p>{record.description ? `${record.description}` : record.categoria}</p>

        <p className="text_secondary">
          {record.description
            ? daysName[new Date(record.date).getDay()] +
              " " +
              new Date(record.date).getDate() +
              " | " +
              record.categoria
            : daysName[new Date(record.date).getDay()] +
              " " +
              new Date(record.date).getDate()}
        </p>
      </div>

      {/* // Acciones */}
      <div className="col-auto my-auto ms-auto">
        <i
          style={{ cursor: "pointer" }}
          className="fa fa-trash"
          aria-hidden="true"
          onClick={delEntry}
        ></i>
        <i
          style={{ cursor: "pointer", marginLeft: "10px" }}
          className="fa fa-edit"
          aria-hidden="true"
          onClick={editEntry}
        ></i>
      </div>

      {/* // Monto */}
      <div className="col-auto my-auto text_amount">${record.monto}</div>
    </div>
  );
};

export default Records;
