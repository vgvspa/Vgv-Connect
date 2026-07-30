import { createContext, useState } from "react";

// Crear el contexto
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

const STORAGE_KEY = "vgv_user";

// Crear el proveedor
export const AuthProvider = ({ children }) => {
  // Recupera la sesión guardada al iniciar (persistencia entre recargas)
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
