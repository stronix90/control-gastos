'use client'

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { useUserAuth } from "../context/userAuthContext";
import { useGeneral } from "../context/generalContext";
import { db } from "../conexion";
import Categorias from "./Categorias";
import { Button } from "react-bootstrap";
import { $ } from "../auxiliar/general";

export default function Form() {
  const { user } = useUserAuth();
  const { setEditingRecord, editingRecord, editRecord } = useGeneral();

  if (editingRecord.state) {
    $("monto").value = editingRecord.record.monto;
    $("descripcion").value = editingRecord.record.description;
    $("categoria").value = editingRecord.record.categoria;
    $("recordDate").value = editingRecord.record.date
      .toISOString()
      .split("T")[0];
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if is logged
    if (!user) return toast.error("Debe iniciar sesión", { theme: "dark" });

    // Get data
    const { monto, categoria, descripcion, recordDate } = Object.fromEntries(
      new FormData(e.target)
    );
    const newRecordDate = new Date(recordDate);

    if (!monto) {
      return toast.error("Ingrese un monto valido", { theme: "dark" });
    }
    try {
      // Editar registro
      if (editingRecord.state) {
        const updatedRecord = {
          monto: monto,
          description: descripcion,
          categoria: categoria,
          date: newRecordDate,
        };
        await editRecord("gastos", editingRecord.record.id, updatedRecord);
        setEditingRecord({ state: false, record: {} });
      }
      // Nuevo registro
      else {
        const newRecord = {
          persona: {
            name: user.displayName,
            email: user.email,
            usuario: user.uid
          },
          monto: monto,
          description: descripcion,
          categoria: categoria,
          date: serverTimestamp(),
          grupo: "PPk07q43McWa8svDhGYc"
        };
        console.log(newRecord)
        await addDoc(collection(db, "gastos"), newRecord);
      }
      toast.success("Registro guardado con exito", { theme: "dark" });
      e.target.reset();
    } catch (error) {
      toast.error(error, { theme: "dark" });
    }
  };

  const cancelEdit = () => {
    setEditingRecord({ state: false, record: {} });
  };

  return (
    <div className="card bg-dark">
      <div className="card-header">
        {editingRecord.state ? <h5>Editar gasto</h5> : <h5>Cargar gastos</h5>}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor="monto">Monto</label>
            <input
              autoFocus
              id="monto"
              name="monto"
              type="number"
              placeholder="0,00"
              className="amountField"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="descripcion">Descripción</label>
            <input
              id="descripcion"
              name="descripcion"
              type="text"
              placeholder="Ingrese una descripción (Opcional)"
              className="w-100"
              style={{ padding: ".375rem 2.25rem .375rem .75rem" }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="categoria">Categoria</label>
            <select id="categoria" name="categoria" className="form-select">
              <Categorias />
            </select>
          </div>

          <div
            className="mb-3"
            style={{ display: editingRecord.state ? "block" : "none" }}
          >
            <label htmlFor="recordDate">Fecha de gasto</label>
            <input
              id="recordDate"
              name="recordDate"
              type="date"
              placeholder="Ingrese la fecha del gasto"
              className="w-100"
              style={{ padding: ".375rem 2.25rem .375rem .75rem" }}
            />
          </div>
        </div>

        <div className="card-footer text-muted d-flex gap-4">
          <Button
            type="submit"
            variant={`warning ${editingRecord.state ? "w-50" : "w-100"}`}
          >
            {editingRecord.state ? "EDITAR" : "GUARDAR"}
          </Button>

          <Button
            type="reset"
            onClick={cancelEdit}
            variant="danger w-50"
            style={{ display: editingRecord.state ? "inline" : "none" }}
          >
            CANCELAR
          </Button>
        </div>
      </form>
    </div>
  );
}
