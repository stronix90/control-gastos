import { Button, Modal } from "react-bootstrap";
import { useGeneral } from "../context/generalContext";

export default function CustomModal() {
  const { delRecord, setEditingRecord, recordModal, closeModal } = useGeneral();
  const { record, show } = recordModal;

  const delEntry = async () => {
    const result = await delRecord("gastos", record.id);
    if (result) closeModal();
  };

  const editEntry = () => {
    setEditingRecord({ state: true, record });
    closeModal();
  };

  return (
    <Modal
      show={show}
      onHide={closeModal}
      backdrop="static"
      aria-labelledby="contained-modal-title-vcenter dark"
      centered
      data-bs-theme="dark"
    >
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <b>Usuario</b>
        <p style={{ fontSize: "14px" }}>{record.persona?.name}</p>
        <b>Categoria</b>
        <p style={{ fontSize: "14px" }}>
          {record.icon}
          {record.categoria}
        </p>
        <b>Descripción</b>
        <p style={{ fontSize: "14px" }}>{record.description}</p>
        <b>Monto</b>
        <p style={{ fontSize: "14px" }}>${record.monto}</p>
      </Modal.Body>

      <Modal.Footer>
        <div
          className="col-auto my-auto ms-auto d-flex"
          style={{ gap: "1.5rem" }}
        >
          <i
            style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
            className="fa fa-trash"
            aria-hidden="true"
            onClick={delEntry}
          ></i>
          <i
            style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
            className="fa fa-edit"
            aria-hidden="true"
            onClick={editEntry}
          ></i>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
