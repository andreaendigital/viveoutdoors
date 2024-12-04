import { Routes, Route } from "react-router-dom";

import { Container, Row, Col } from "react-bootstrap"; // Importar componentes de Bootstrap
import SidebarAdmin from "../SidebarAdmin.jsx";
import MisPublicaciones from "./MisPublicaciones.jsx";
// import CrearPublicacion from "../components/CrearPublicacion.jsx"; 
import DatosPersonales from "../DatosPersonales.jsx";
import MisVentas from "./MisVentas.jsx";
import CerrarSesion from "./CerrarSesion.jsx";

// Componentes para el contenido de cada página
// const DatosPersonales = () => <h1>Datos Personales</h1>;
// const ConfigurarCuenta = () => <h1>Configurar mi Cuenta</h1>;
// const MisVentas = () => <h1>Mis Ventas</h1>;
// const CerrarSesion = () => <h1>Cerrar Sesión</h1>;


const AdminDashboard = () => {
  return (
    

    <Container fluid className="mt-5">
      <h2>Bienvenido Administrador</h2>
      <Row className="vh-100 m-5">
        {/* Sidebar en el lado izquierdo */}
        <Col md={3} lg={2} className="mb-2 pt-4 p-0">
          <SidebarAdmin />
        </Col>

        {/* Contenido dinámico en el lado derecho */}
        <Col xs={12} md={9} lg={10} className="p-4">
          <Routes>
            <Route path="datos-personales" element={<DatosPersonales />} />
            {/* <Route path="configurar-cuenta" element={<ConfigurarCuenta />} /> */}
            <Route path="mis-ventas" element={<MisVentas />} />
            <Route path="mis-publicaciones" element={<MisPublicaciones />} />
            {/* <Route path="crearpublicacion" element={<CrearPublicacion />} /> */}
            <Route path="cerrar-sesion" element={<CerrarSesion />} />
          </Routes>
        </Col>
      </Row>
    </Container>


  );
};

export default AdminDashboard;
