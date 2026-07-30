// Roles del sistema VGV Connect
export const ROLES = {
  ADMIN: "admin",
  GERENTE: "gerente",
  OPERACIONES: "operaciones",
  CHOFER: "chofer",
};

// Roles con acceso ilimitado a todos los módulos
export const FULL_ACCESS_ROLES = [ROLES.ADMIN, ROLES.GERENTE];
