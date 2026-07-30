import { ROLES, FULL_ACCESS_ROLES } from "../utils/constants";

/**
 * Configuración central del menú de navegación.
 * Cada módulo define:
 *  - roles: qué roles pueden verlo. Si se omite, es público.
 *           Un array vacío => solo roles con acceso ilimitado (admin/gerente).
 *  - children: sub-opciones desplegables.
 *
 * admin y gerente siempre ven todo (ver canAccess).
 */
export const MENU = [
  {
    id: "logistica",
    label: "Logística",
    icon: "🚚",
    roles: [ROLES.OPERACIONES],
    children: [
      { label: "Programación de rutas", to: "/logistica" },
      { label: "Despachos", to: "/logistica/despachos" },
    ],
  },
  {
    id: "rutas",
    label: "Rutas",
    icon: "🛣️",
    roles: [ROLES.CHOFER, ROLES.OPERACIONES],
    children: [
      { label: "Rutas semanales", to: "/rutas" },
      { label: "Guías por chofer", to: "/rutas/guias" },
    ],
  },
  {
    id: "entregas",
    label: "Entregas",
    icon: "📦",
    roles: [ROLES.CHOFER, ROLES.OPERACIONES],
    children: [
      { label: "Listado de entregas", to: "/entregas" },
      { label: "Registrar entrega", to: "/entregas/registrar" },
    ],
  },
  {
    id: "panel",
    label: "Panel de Control",
    icon: "📊",
    roles: [], // solo admin / gerente
    children: [{ label: "Dashboard", to: "/panel" }],
  },
];

/**
 * Determina si un rol puede acceder a un ítem del menú.
 */
export function canAccess(item, role) {
  if (FULL_ACCESS_ROLES.includes(role)) return true; // acceso ilimitado
  if (!item.roles) return true; // sin restricción explícita
  return item.roles.includes(role);
}
