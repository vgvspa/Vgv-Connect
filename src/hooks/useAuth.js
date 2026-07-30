import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// Hook para consumir el contexto de autenticación
export function useAuth() {
  return useContext(AuthContext);
}
