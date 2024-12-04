import { Nav } from "react-bootstrap"; // Importar Nav para manejar la navegación
// import { LinkContainer } from "react-router-bootstrap"; // Para integrar react-router con Bootstrap Nav
import '../App.css'; // Importar el archivo CSS
import { Link } from "react-router-dom";

const SidebarCliente = () => {
  return (
    <div className="bg-white text-dark vh-100">
      <h4 className="text-center mb-4">Menú</h4> 
      <Nav className="flex-column"> 

        <Link to="/user/datos-personales" className="btn btn-outline-warning mb-2 btn-sidebar">
       Datos Personales
       </Link>       

        <Link to="/cerrarsesion" className="btn btn-outline-warning mb-2 btn-sidebar">
        Cerrar Sesión
        </Link>
      </Nav>
    </div>
  );
};

export default SidebarCliente;
