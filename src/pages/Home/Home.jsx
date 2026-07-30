import { useNavigate } from "react-router-dom";
import { MENU, canAccess } from "../../config/menu";
import { useAuth } from "../../hooks/useAuth";

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Módulos visibles según el rol del usuario
  const modules = MENU.filter((item) => canAccess(item, user?.role));

  return (
    <div>
      <h1>Bienvenido{user?.name ? `, ${user.name}` : ""}</h1>
      <p style={{ color: "#666" }}>Selecciona un módulo para comenzar.</p>

      <div style={styles.grid}>
        {modules.map((item) => (
          <div
            key={item.id}
            style={styles.card}
            onClick={() => navigate(item.children[0].to)}
          >
            <div style={styles.icon}>{item.icon}</div>
            <h3 style={{ margin: "8px 0 4px" }}>{item.label}</h3>
            <ul style={styles.list}>
              {item.children.map((child) => (
                <li key={child.to}>{child.label}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "16px",
    marginTop: "20px",
  },
  card: {
    background: "#fff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
    cursor: "pointer",
    transition: "transform 0.1s",
  },
  icon: {
    fontSize: "32px",
  },
  list: {
    margin: "8px 0 0",
    paddingLeft: "18px",
    color: "#666",
    fontSize: "14px",
    textAlign: "left",
  },
};
