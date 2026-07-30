import http from "./http";

// Obtiene las rutas asignadas a un chofer
export const getRoutesByDriver = (driverId) =>
  http.get(`/routes/driver/${driverId}`);

// Solicita al backend la optimización de la ruta de un chofer
export const optimizeRoute = (driverId) =>
  http.post(`/routes/optimize`, { driverId });
