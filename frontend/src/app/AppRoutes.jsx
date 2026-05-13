"use client";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import PatientListPage from "../pages/patients/PatientListPage";
import PatientProfilePage from "../pages/patients/PatientProfilePage";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Redirect the base URL to the Patient List automatically */}
        <Route path="/" element={<Navigate to="/patients" replace />} />

        {/* Patient Management */}
        <Route path="/patients" element={<PatientListPage />} />
        <Route path="/patients/:id" element={<PatientProfilePage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;