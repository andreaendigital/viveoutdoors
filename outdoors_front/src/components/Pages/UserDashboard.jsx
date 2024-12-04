import { Routes, Route } from "react-router-dom";
// import { Container, Row, Col } from "react-bootstrap"; // Importar componentes de Bootstrap
import SidebarCliente from "../SidebarCliente.jsx";
import DatosPersonales from "../DatosPersonales.jsx";
import CerrarSesion from "./CerrarSesion.jsx";

// Componentes para el contenido de cada página
// const DatosPersonales = () => <h1>Datos Personales</h1>;

// const MisCompras = () => <h1>Mis Compras</h1>;
// const CerrarSesion = () => <h1>Cerrar Sesión</h1>;

const UserDashboard = () => {
  return (
    <div>
      <h2>¡Bienvenido!</h2>
      <div className="container-fluid">
        <div className="row vh-100 m-5">
          {/* Sidebar en el lado izquierdo */}
          <div className=" col-md-3 col-lg-2 mb-2 pt-4 p-0 ">
            <SidebarCliente />
          </div>

          {/* Contenido dinámico en el lado derecho */}
          <div className="col-12 col-md-9 col-lg-10 p-4">
            <Routes>
              <Route path="datos-personales" element={<DatosPersonales />} />
 
              {/* <Route path="mis-compras" element={<MisCompras />} /> */}
              {/* <Route path="carrito-pendiente" element={<CarritoPendiente />} /> */}
              <Route path="cerrar-sesion" element={<CerrarSesion />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
