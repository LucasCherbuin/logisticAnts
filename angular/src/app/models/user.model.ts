export interface User {
  id: number;
  pseudo: string;
  email: string;
  password: string;
  role: string | { id: number; label: string };
}