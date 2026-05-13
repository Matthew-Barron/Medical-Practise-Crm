"use client";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPatients, deletePatient, addPatient, updatePatient } from "../../services/patientService";
import PatientSearch from "../../components/patients/PatientSearch";
import { UserPlus, Edit2, Trash2, X, Check } from "lucide-react"; // Nice icons

const PatientListPage = () => {
  const [patients, setPatients] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [formData, setFormData] = useState({ name: "", age: "", condition: "" });
  const navigate = useNavigate();

  const loadData = () => {
    getPatients().then(data => {
      setPatients(data);
      setFiltered(data);
    });
  };

  useEffect(() => { loadData(); }, []);

  const handleSearch = (query) => {
    const result = patients.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(result);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await updatePatient(isEditing, formData);
      setIsEditing(null);
    } else {
      await addPatient(formData);
    }
    setFormData({ name: "", age: "", condition: "" });
    loadData();
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this patient record?")) {
      await deletePatient(id);
      loadData();
    }
  };

  const startEdit = (e, patient) => {
    e.stopPropagation();
    setIsEditing(patient.id);
    setFormData({ name: patient.name, age: patient.age, condition: patient.condition });
  };

  return (
    <div className="p-8 max-w-6xl mx-auto bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800">Patient Management</h2>
        <span className="text-sm text-slate-500">{filtered.length} Patients Total</span>
      </div>

      {/* ACTION CARD: ADD/EDIT FORM */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8 transition-all">
        <div className="flex items-center gap-2 mb-4 text-slate-700 font-semibold">
          <UserPlus size={20} />
          {isEditing ? "Edit Patient Record" : "Register New Patient"}
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input 
            className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Full Name" 
            value={formData.name} 
            onChange={e => setFormData({...formData, name: e.target.value})} 
            required 
          />
          <input 
            className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Age" 
            type="number"
            value={formData.age} 
            onChange={e => setFormData({...formData, age: e.target.value})} 
          />
          <input 
            className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Medical Condition" 
            value={formData.condition} 
            onChange={e => setFormData({...formData, condition: e.target.value})} 
          />
          <div className="flex gap-2">
            <button type="submit" className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-white font-medium transition ${isEditing ? 'bg-amber-500 hover:bg-amber-600' : 'bg-blue-600 hover:bg-blue-700'}`}>
              {isEditing ? <><Check size={18}/> Update</> : <><UserPlus size={18}/> Add</>}
            </button>
            {isEditing && (
              <button onClick={() => setIsEditing(null)} className="p-2 bg-slate-200 rounded-lg hover:bg-slate-300 transition">
                <X size={20} className="text-slate-600" />
              </button>
            )}
          </div>
        </form>
      </div>

      {/* SEARCH BAR */}
      <div className="mb-6">
        <PatientSearch onSearch={handleSearch} />
      </div>

      {/* TABLE DATA */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-200 text-slate-600 uppercase text-xs font-bold">
              <th className="px-6 py-4">Patient Name</th>
              <th className="px-6 py-4">Age</th>
              <th className="px-6 py-4">Condition</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {filtered.map(patient => (
              <tr 
                key={patient.id} 
                onClick={() => navigate(`/patients/${patient.id}`)} 
                className="hover:bg-blue-50/50 cursor-pointer transition-colors group"
              >
                <td className="px-6 py-4 font-medium text-blue-900">{patient.name}</td>
                <td className="px-6 py-4">{patient.age}</td>
                <td className="px-6 py-4 italic text-slate-500">{patient.condition}</td>
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={(e) => startEdit(e, patient)} 
                      className="p-2 text-amber-600 hover:bg-amber-50 rounded-full transition"
                      title="Edit Profile"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={(e) => handleDelete(e, patient.id)} 
                      className="p-2 text-red-600 hover:bg-red-50 rounded-full transition"
                      title="Delete Record"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientListPage;