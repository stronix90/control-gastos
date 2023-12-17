import { useGeneral } from "../context/generalContext";

export default function Resume() {
  const { resume } = useGeneral();

  const porcentajes = {
    "Brian Luna": 60,
    "Noelia Torres": 40,
  };

  const convertToMoney = (value) => {
    const options = {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    };
    if (!value) return 0;

    return value.toLocaleString("es-ES", options);
  };

  return (
    <div className="card bg-dark mt-5">
      <div className="card-header">
        <h5>Resumen</h5>
      </div>

      <div className="card-body">
        <p>
          <b>Gasto total: ${convertToMoney(resume.total)}</b>
        </p>

        <table class="table-dark w-100">
          <thead>
            <tr>
              <th scope="col">Usuario</th>
              <th scope="col">Gastó</th>
              <th scope="col">Porcentaje</th>
              <th scope="col">Corresponde</th>
              <th scope="col">Diferencia</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(resume.totalPerUser).map((persona) => {
              const gasto = resume.totalPerUser[persona];
              const porcentaje = porcentajes[persona];
              const corresponde = (resume.total * porcentajes[persona]) / 100;
              const diferencia = corresponde - gasto;

              return (
                <tr key={persona}>
                  <td>{persona}</td>
                  <td>${convertToMoney(gasto)}</td>
                  <td>{porcentaje}</td>
                  <td>${convertToMoney(corresponde)}</td>
                  <td>${convertToMoney(diferencia)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
