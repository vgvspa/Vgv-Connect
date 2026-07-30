import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MENU, canAccess } from "../../config/menu";
import { useAuth } from "../../hooks/useAuth";

export default function Sidebar() {
  const { user } = useAuth();
  const location = useLocation();
  const role = user?.role;

  // Solo los módulos permitidos para el rol actual
  const visibleMenu = MENU.filter((item) => canAccess(item, role));

  // Estado de menús abiertos: abre por defecto el que coincide con la ruta actual
  const [open, setOpen] = useState(() => {
    const initial = {};
    visibleMenu.forEach((item) => {
      initial[item.id] = item.children.some((c) =>
        location.pathname.startsWith(c.to)
      );
    });
    return initial;
  });

  const toggle = (id) => setOpen((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <aside style={styles.aside}>
      <h2 style={styles.brand}>VGV Connect</h2>

      <nav>
        <Link to="/home" style={styles.homeLink}>
          🏠 Inicio
        </Link>

        {visibleMenu.map((item) => (
          <div key={item.id} style={{ marginTop: "8px" }}>
            {/* Encabezado del módulo (desplegable) */}
            <button
              onClick={() => toggle(item.id)}
              style={styles.moduleButton}
            >
              <span>
                {item.icon} {item.label}
              </span>
              <span>{open[item.id] ? "▾" : "▸"}</span>
            </button>

            {/* Sub-opciones */}
            {open[item.id] && (
              <ul style={styles.subList}>
                {item.children.map((child) => {
                  const active = location.pathname === child.to;
                  return (
                    <li key={child.to}>
                      <Link
                        to={child.to}
                        style={{
                          ...styles.subLink,
                          ...(active ? styles.subLinkActive : {}),
                        }}
                      >
                        {child.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}

const styles = {
  aside: {
    width: "240px",
    background: "#2c3e50",
    color: "#ecf0f1",
    minHeight: "100vh",
    padding: "20px",
    position: "fixed",
    top: 0,
    left: 0,
    boxSizing: "border-box",
    overflowY: "auto",
  },
  brand: {
    marginBottom: "24px",
    fontSize: "22px",
  },
  homeLink: {
    display: "block",
    color: "#ecf0f1",
    textDecoration: "none",
    padding: "8px 0",
    marginBottom: "8px",
    fontWeight: "bold",
  },
  moduleButton: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "transparent",
    border: "none",
    color: "#ecf0f1",
    fontSize: "15px",
    fontWeight: "bold",
    padding: "10px 0",
    cursor: "pointer",
  },
  subList: {
    listStyle: "none",
    padding: "0 0 0 12px",
    margin: "4px 0 8px",
  },
  subLink: {
    display: "block",
    color: "#bdc3c7",
    textDecoration: "none",
    padding: "6px 8px",
    borderRadius: "6px",
    fontSize: "14px",
  },
  subLinkActive: {
    background: "#34495e",
    color: "#fff",
  },
};
