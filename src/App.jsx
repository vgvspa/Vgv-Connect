import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ModuloEnConstruccion from "./components/common/ModuloEnConstruccion";
import LoginPage from "./pages/Login/LoginPage";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import DeliveriesPage from "./pages/Deliveries/DeliveriesPage";
import RoutePlanner from "./pages/RoutePlanner/Routeplanner";
import RegistrarEntrega from "./pages/Drivers/entregas/RegistrarEntrega";
import ConfirmacionEntrega from "./pages/Drivers/entregas/ConfirmacionEntrega";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login sin layout */}
        <Route path="/" element={<LoginPage />} />

        {/* Rutas protegidas con layout + sidebar */}
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />

          {/* LOGÍSTICA */}
          <Route path="/logistica" element={<RoutePlanner />} />
          <Route
            path="/logistica/despachos"
            element={<ModuloEnConstruccion titulo="Despachos" />}
          />

          {/* RUTAS */}
          <Route
            path="/rutas"
            element={<ModuloEnConstruccion titulo="Rutas semanales" />}
          />
          <Route
            path="/rutas/guias"
            element={<ModuloEnConstruccion titulo="Guías por chofer" />}
          />

          {/* ENTREGAS */}
          <Route path="/entregas" element={<DeliveriesPage />} />
          <Route path="/entregas/registrar" element={<RegistrarEntrega />} />
          <Route path="/entregas/confirmacion" element={<ConfirmacionEntrega />} />

          {/* PANEL DE CONTROL */}
          <Route path="/panel" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
