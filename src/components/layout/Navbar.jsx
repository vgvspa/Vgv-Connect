import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div style={styles.bar}>
      <div style={styles.user}>
        <span style={{ fontWeight: "bold" }}>{user?.name || "Usuario"}</span>
        {user?.role && <span style={styles.role}>{user.role}</span>}
      </div>
      <button onClick={handleLogout} style={styles.logout}>
        Cerrar sesión
      </button>
    </div>
  );
}

const styles = {
  bar: {
    width: "100%",
    height: "60px",
    background: "#fff",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: "16px",
    padding: "0 20px",
    position: "sticky",
    top: 0,
    zIndex: 10,
    boxSizing: "border-box",
  },
  user: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    lineHeight: 1.2,
  },
  role: {
    fontSize: "12px",
    color: "#888",
    textTransform: "capitalize",
  },
  logout: {
    background: "#e74c3c",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "8px 14px",
    cursor: "pointer",
    fontSize: "14px",
  },
};
