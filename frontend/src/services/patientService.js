// Example local state service
let patients = [
  { id: 1, name: "John Doe", age: 45, condition: "Hypertension" },
  { id: 2, name: "Jane Smith", age: 30, condition: "Diabetes" }
];

export const getPatients = async () => [...patients];

export const addPatient = async (data) => {
  const newPatient = { ...data, id: Date.now() };
  patients.push(newPatient);
  return newPatient;
};

export const updatePatient = async (id, data) => {
  patients = patients.map(p => p.id === id ? { ...p, ...data } : p);
  return true;
};

export const deletePatient = async (id) => {
  patients = patients.filter(p => p.id !== id);
  return true;
};