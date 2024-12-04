import { Nav } from "react-bootstrap"; // Importar Nav para manejar la navegación
// import { LinkContainer } from "react-router-bootstrap"; // Para integrar react-router con Bootstrap Nav
import '../App.css'; // Importar el archivo CSS

import { Link } from "react-router-dom";

const SidebarAdmin = () => {
  return (
    <div className="bg-white text-dark vh-100">
      <h4 className="text-center mb-4">Menú</h4> 
      <Nav className="flex-column"> 
       
      <Link to="/admin/datos-personales" className="btn btn-outline-warning mb-2 btn-sidebar">
          Datos Personales
        </Link>

       
        <Link to="/admin/mis-ventas" className="btn btn-outline-warning mb-2 btn-sidebar">
         Mis Ventas
        </Link>
        <Link to="/admin/mis-publicaciones" className="btn btn-outline-warning mb-2 btn-sidebar">
          Mis Publicaciones
        </Link>
        <Link to="/cerrarsesion" className="btn btn-outline-warning mb-2 btn-sidebar">
          Cerrar Sesión
        </Link>
      </Nav>
    </div>
  );
};

export default SidebarAdmin;



// const SidebarAdmin = () => {
//   return (
//     <nav>
//       <ul>
//         <li>
//           <Link to="/datos-personales ">Datos Personales</Link>
//         </li>
//         <li>
//           <Link to="/mis-ventas">Mis Ventas</Link>
//         </li>
//         <li>
//           <Link to="/mis-publicaciones">Mis Publicaciones</Link>
//         </li>
//         <li>
//           <Link to="/cerrar-sesion">Cerrar Sesión</Link>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default SidebarAdmin;
