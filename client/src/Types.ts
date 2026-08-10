import Pharmacist from "./components/Pharmacist";

export interface Users {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  address: string;
  image: string;
  status: boolean;
}
export interface Department {
  id: string;
  name: string;
}
export interface Doctors {
  id: string;
  users: Users;
  department: Department;
  qualification: string;
  experience: string;
  charges: string;
}

export interface Patient {
  id: string;
  users: Users;
  height: string;
  weight: string;
  occupation: string;
  allergies: string;
  marital_status: string;
}

export interface Pharmacist {
  id: string;
  users: Users;
  qualification: string;
  experience: string;
}

export interface Department {
  id: string;
  name: string;
  status?: boolean;
}

export interface Slot {
  id: string;
  slot: string;
}

export interface PrescriptionInput {
  index: number;
  field: "name" | "dosage" | "frequency" | "duration";
  value: string;
}

export interface WeekAppointment {
  day: string;
  count: number;
}

export interface Prescription {
  id: string;
  name: string;
  dosage: string;
  frequency: number;
  duration: number;
}
