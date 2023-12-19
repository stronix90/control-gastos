import { useRef } from "react";
import { useGeneral } from "../context/generalContext";
import { Button, Modal } from "react-bootstrap";
import { convertToMoney } from "../auxiliar/general";

const Records = ({ record, openModal }) => {
  let startX;
  let startY;

  const { setRecordModal } = useGeneral();

  const daysName = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];

  const iniciales = record.persona.name
    .split(" ")
    .map((palabra) => {
      return palabra[0];
    })
    .join("");

  const handleTouchStart = (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const currentX = e.changedTouches[0].clientX;
    const currentY = e.changedTouches[0].clientY;
    const deltaX = Math.abs(currentX - startX);
    const deltaY = Math.abs(currentY - startY);

    if (deltaX > 150 && deltaY < 100 && deltaX > deltaY) {
      setRecordModal({
        show: true,
        record,
      });
    }
  };

  return (
    <div
      className="row record"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
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
          <p className="text_amount">{convertToMoney(record.monto)}</p>
        </div>
      </div>
    </div>
  );
};

export default Records;
