import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Usuarios from "../pages/Usuarios/Usuarios";
import Clientes from "../pages/Clientes/Clientes";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/users" element={<Usuarios />} />
      <Route path="/clientes" element={<Clientes />} />
    </Routes>
  );
};

export default AppRoutes;
