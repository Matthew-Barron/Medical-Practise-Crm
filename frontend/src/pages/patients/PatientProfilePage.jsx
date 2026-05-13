import React, { useEffect, useState } from "react";
import { getPatientById } from "../../services/patientService";
import PatientNotes from "../../components/patients/PatientNotes";

const PatientProfilePage = ({ patientId }) => {
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    getPatientById(patientId).then(data => setPatient(data));
  }, [patientId]);

  if (!patient) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>{patient.name}</h2>

      <p><strong>Age:</strong> {patient.age}</p>
      <p><strong>Condition:</strong> {patient.condition}</p>

      <PatientNotes notes={patient.notes} />
    </div>
  );
};

export default PatientProfilePage;