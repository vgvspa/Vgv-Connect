import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ROLES } from "../../utils/constants";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [identifier, setIdentifier] = useState(""); // email o celular
  const [password, setPassword] = useState("");     // password o PIN
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validación mínima
    if (!identifier.trim() || !password.trim()) {
      setError("Completa todos los campos");
      return;
    }

    // Detectar si es celular o correo
    const isPhone = /^[0-9]{8,12}$/.test(identifier);
    const isEmail = identifier.includes("@");

    // MVP: rol temporal sin backend (luego vendrá del servidor con el JWT)
    if (isPhone) {
      // Chofer
      login({ name: identifier, role: ROLES.CHOFER });
      navigate("/home");
      return;
    }

    if (isEmail) {
      // Gerencia / Admin (acceso ilimitado)
      login({ name: identifier, role: ROLES.ADMIN });
      navigate("/home");
      return;
    }

    setError("Formato inválido. Usa correo o número de celular.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">VGV Connect</h1>

        {error && (
          <p className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm">
            {error}
          </p>
        )}

        <label className="block mb-2 text-sm font-medium">Correo o celular</label>
        <input
          type="text"
          className="w-full p-2 border rounded mb-4"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />

        <label className="block mb-2 text-sm font-medium">Contraseña / PIN</label>
        <input
          type="password"
          className="w-full p-2 border rounded mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
}
