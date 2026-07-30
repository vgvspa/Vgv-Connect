import { useState, useEffect } from "react";
import RouteList from "../../components/deliveries/RouteList";
import MapView from "../../components/maps/Mapview";
import DeliveryDetail from "../../components/deliveries/DeliveryDetail";
import { getRoutesByDriver, optimizeRoute } from "../../api/routes.api";

export default function Routeplanner() {
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    // Traer rutas del backend (ejemplo con driverId=123)
    getRoutesByDriver(123)
      .then(({ data }) => setRoutes(data))
      .catch((err) => console.error("Error cargando rutas:", err));
  }, []);

  const handleOptimize = async () => {
    const { data } = await optimizeRoute(123);
    setRoutes(data.routes);
    setCoordinates(data.coordinates);
  };

  return (
    <div className="route-planner-page">
      <h1>📍 Route Planner</h1>
      <RouteList
        routes={routes}
        onOptimize={handleOptimize}
        onSelect={(r) => setSelectedRoute(r)}
      />
      <MapView coordinates={coordinates} />
      {selectedRoute && (
        <DeliveryDetail
          delivery={selectedRoute}
          onConfirm={() => setSelectedRoute(null)}
        />
      )}
    </div>
  );
}
