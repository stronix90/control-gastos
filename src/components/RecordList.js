'use client'

/* eslint-disable @next/next/no-img-element */
import Records from "./Records";
import { useGeneral } from "../context/generalContext";
import JSONToCSVConvertor from "../auxiliar/convJSONtoCSV";
import { Button } from "react-bootstrap";

const RecordList = () => {
  const { records, loadingRecords, resume, postRecords } = useGeneral();

  const handleDownloadExcel = () => {
    records.map((record) => {
      // Timestamp = record.date.toLocaleDateString();
      record.persona = record.persona.name;
    });

    JSONToCSVConvertor(records, "Control Gastos", true);
  };

  return (
    <>
      <div className="card records m-2">
        {loadingRecords ? (
          <p>Cargando</p>
        ) : (
          <>
            {records.map((record, index) => (
              <Records key={index} record={record} />
            ))}
            <Button variant="warning" onClick={handleDownloadExcel}>
              <img
                width={28}
                src="https://upload.wikimedia.org/wikipedia/commons/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg"
                alt=""
              />
              Descargar
            </Button>
          </>
        )}
      </div>
    </>
  );
};

export default RecordList;
