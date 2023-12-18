/* eslint-disable @next/next/no-img-element */
import { Card } from "react-bootstrap";
import { useGeneral } from "../context/generalContext";
import { convertToMoney } from "../auxiliar/general";

export default function Resume() {
  const { resume } = useGeneral();

  const porcentajes = {
    "Brian Luna": 60,
    "Noelia Torres": 40,
  };

  return (
    <div className="card bg-dark mt-5">
      <div className="card-header">
        <h5>Resumen</h5>
      </div>

      <div className="card-body">
        <div
          style={{
            display: "flex",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            whiteSpace: "nowrap",
            gap: "1rem",
            justifyContent: "space-between",
          }}
        >
          <Card
            className="bg-dark text-white"
            style={{
              flex: "0 0 300px",
              boxSizing: "border-box",
              scrollSnapAlign: "center",
              minHeight: "200px",
            }}
          >
            <Card.Body>
              <Card.Title>Gasto total</Card.Title>
              <Card.Text>{convertToMoney(resume.total)}</Card.Text>
            </Card.Body>
          </Card>

          {Object.keys(resume.totalPerUser).map((persona) => {
            const gasto = resume.totalPerUser[persona];
            const porcentaje = porcentajes[persona];
            const corresponde = (resume.total * porcentajes[persona]) / 100;
            const diferencia = corresponde - gasto;

            return (
              <Card
                key={persona}
                className="bg-dark text-white"
                style={{
                  flex: "0 0 300px",
                  boxSizing: "border-box",
                  scrollSnapAlign: "center",
                  minHeight: "200px",
                }}
              >
                <Card.Body>
                  <Card.Title>{persona}</Card.Title>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      gap: "1rem",
                    }}
                  >
                    <p style={{ margin: 0 }}>Gastó: {convertToMoney(gasto)}</p>
                    <p style={{ margin: 0 }}>
                      {porcentaje} del total: {convertToMoney(corresponde)}
                    </p>
                    <p style={{ margin: 0 }}>
                      Diferencia: {convertToMoney(diferencia)}
                    </p>
                  </div>
                </Card.Body>
              </Card>
            );
          })}
        </div>

        {/* <table class="table-dark w-100">
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
        </table> */}
      </div>
    </div>
  );
}
