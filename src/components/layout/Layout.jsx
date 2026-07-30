import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout() {
  const { user } = useAuth();

  // Sin sesión => volver al login
  if (!user) return <Navigate to="/" replace />;

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div
        style={{
          flex: 1,
          marginLeft: "240px",
          background: "#f5f6fa",
          minHeight: "100vh",
        }}
      >
        <Navbar />

        <div style={{ padding: "20px" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
