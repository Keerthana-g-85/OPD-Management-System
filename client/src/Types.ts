export interface Users {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  address: string;
  image: string;
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
