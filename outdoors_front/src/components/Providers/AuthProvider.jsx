// Archivo para autenticación y autorización, controlando el login, logout, 
// y permisos de acceso según roles (cliente o administrador).

// src/context/AuthProvider.jsx
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // const [user, setUser] = useState(null); // Estado para almacenar los datos del usuario autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado para verificar autenticación, si el usuario ha iniciado sesión.
  const [token, setToken] = useState(null); // Estado para almacenar el token de autenticación 
  const [rol, setRol] = useState(null);// Almacena el rol del usuario ("admin" o "client")
  // const [id_usuario, setId_usuario] = useState(null);// Almacena el id_usuario
  const [id_usuario, setId_usuario] = useState(localStorage.getItem("id_usuario") || null);
const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

  const navigate = useNavigate();



  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
  
    if (storedUser && storedToken) {
      setUser(storedUser); // Asegura que el estado global se actualice
      setToken(storedToken);
      setIsAuthenticated(true);
      setRol(storedUser.rol);
      setId_usuario(storedUser.id_usuario); // Actualiza id_usuario explícitamente
    } else {
      console.warn("Datos incompletos en localStorage.");
      setUser(null);
      setToken(null);
      setIsAuthenticated(false);
      setRol(null);
      setId_usuario(null);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post("/login", { email, password }); 
      const { user, token } = response.data;

      setUser(user); 
      setToken(token); 
      setIsAuthenticated(true); 
      setRol(user.rol);
      setId_usuario(user.id_usuario);

    localStorage.setItem("user", JSON.stringify(user)); 
    localStorage.setItem("token",token);
    return true;
    } catch (error) {
      console.error("Error al iniciar sesión:", error); 
      alert("Credenciales incorrectas, intente de nuevo"); 
      return false;
    }
  };
  

  const logout = () => { 
    setUser(null); 
    setToken(null); 
    setIsAuthenticated(false); 
    setRol(null); 
    setId_usuario(null);
    localStorage.removeItem("user"); 
    localStorage.removeItem("token"); 
    navigate("/login"); 
  };

  const register = async (newUser) => {
try{
  const response = await axios.post("/registro", newUser); 
  const { user, token } = response.data; 
  setUser(user); 
  setToken(token); 
  setIsAuthenticated(true); 
  setRol(user.rol); 
setId_usuario(user.id_usuario);

  localStorage.setItem("user", JSON.stringify(user)); 
  localStorage.setItem("token", token); 

  return true;
} catch (error) {
  console.error("Error al registrar usuario: ", error);
  return false;
}
};

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        token,
        rol, // Exponemos el rol para usarlo en otros componentes
        id_usuario,
        login,
        logout,
        register,
        setToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

