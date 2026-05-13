import React from "react";

const PatientNotes = ({ notes }) => {
  return (
    <div style={{ marginTop: 20 }}>
      <h3>Notes</h3>
      <ul>
        {notes.map((note, index) => (
          <li key={index}>{note}</li>
        ))}
      </ul>
    </div>
  );
};

export default PatientNotes;