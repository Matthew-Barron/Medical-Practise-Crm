import React, { useState } from "react";

const PatientSearch = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  return (
    <div>
      <input
        type="text"
        placeholder="Search patients..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          onSearch(e.target.value);
        }}
        style={{ padding: 8, width: "100%" }}
      />
    </div>
  );
};

export default PatientSearch;