
import { Routes, Route } from "react-router-dom";
import BlackNavbar from "./components/BlackNavbar";
import Footer from "./components/Footer";
import Home from "./components/Pages/Home";
import Account from "./components/Pages/Account";
import AdminDashboard from "./components/Pages/AdminDashboard";
import UserDashboard from "./components/Pages/UserDashboard";
import Tienda from "./components/Pages/Tienda";
import Carrito from "./components/Pages/Carrito";
import CerrarSesion from "./components/Pages/CerrarSesion";
import './App.css'; // Importar el CSS global



function App() {

  return (
    <><div id="root">
      <BlackNavbar />
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
          {/* <Route path="/admin/*" element={<AdminDashboard />} /> {/* Notar el "/*"  en la ruta permite que React Router maneje subrutas dentro de AdminDashboard.*/ } 
          <Route path="/user/*" element={<UserDashboard />} />
          <Route path="/account" element={<Account />} />
          <Route path="/tienda" element={<Tienda/>}/>
          <Route path="/cart" element={<Carrito/>}/>
          <Route path="/cerrarsesion" element={<CerrarSesion/>}/>
        </Routes>
      </main>
      <Footer />    </div>
    </>
  );
}

export default App
