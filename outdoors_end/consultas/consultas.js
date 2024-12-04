// // IMPORTANDO EL MANEJADOR DE ERRORES
// const errors = require("../handleErrors/handleErrors.js");

// importando paquetes instalados necesarios
require("dotenv").config();

// importando lo que necesitas de conection.js, conexion a la BD
const { pool } = require("../conection/conection"); // Importar la conexión


//variables globales de index.js
let status = "";
let message = "";

//-------------------------------------------------------------------------------------------
// FUNCIÓN PARA OBTENER LAS PUBLICACIONES DE LA BBDD Y SUS CAMPOS RELACIONADOS CON TABLA PRODUCTO E IMAGENES

const leerPublicaciones = async () => {
  const consulta = `SELECT DISTINCT ON (p.id_producto)  pub.id_publicacion,  pub.fecha_creacion,  pub.fecha_actualizacion,  pub.estado,  p.id_producto,  p.nombre AS producto_nombre,  p.descripcion AS producto_descripcion,  p.stock,  p.precio,  img.url AS producto_imagen, cat.nombre AS categoria_nombre FROM publicaciones pub JOIN productos p ON pub.id_producto = p.id_producto LEFT JOIN imagenes_productos img ON p.id_producto = img.id_producto JOIN productos_categorias pc ON p.id_producto = pc.id_producto JOIN categorias cat ON pc.id_categoria = cat.id_categoria ORDER BY p.id_producto, img.id_imagen;`;

  // const consulta = `SELECT DISTINCT ON (p.id_producto) pub.id_publicacion, pub.fecha_creacion, pub.fecha_actualizacion, pub.estado, p.id_producto, p.nombre AS producto_nombre, p.descripcion AS producto_descripcion, p.stock, p.precio, img.url AS producto_imagen FROM publicaciones pub JOIN productos p ON pub.id_producto = p.id_producto LEFT JOIN imagenes_productos img ON p.id_producto = img.id_producto ORDER BY p.id_producto, img.id_imagen;`;
  try {
    const { rows } = await pool.query(consulta);
    console.log("Publicaciones: ", rows);
    return rows;
  } catch (error) {
    console.error("Error al leer publicaciones:", error);
    throw new Error("No se pudieron obtener las publicaciones");
  }
};

//-------------------------------------------------------------------------------------------
// FUNCIÓN PARA INSERTAR UN NUEVO PRODUCTO

const insertarProducto = async (nombre, descripcion, stock, precio) => {
  const consulta = `INSERT INTO productos (id_producto, nombre, descripcion, stock, precio) VALUES (DEFAULT, $1, $2, $3, $4) RETURNING *;`;
  const values = [nombre, descripcion, stock, precio];
  const result = await pool.query(consulta, values);
  return result.rows[0]; // Retorna el producto insertado con id generado
};

//-------------------------------------------------------------------------------------------
// FUNCIÓN PARA INSERTAR UNA NUEVA PUBLICACIÓN

const insertarPublicacion = async (id_producto, id_usuario) => {
  const consulta = `INSERT INTO publicaciones (id_publicacion, id_producto, id_usuario, estado, fecha_creacion, fecha_actualizacion) VALUES (DEFAULT, $1, $2, DEFAULT, DEFAULT, DEFAULT) RETURNING *;`;
  const values = [id_producto, id_usuario];
  const result = await pool.query(consulta, values);
  return result.rows[0]; // Retorna la publicación insertada
};

//-------------------------------------------------------------------------------------------
// FUNCIÓN PARA INSERTAR UNA NUEVA IMAGEN DE PRODUCTO

const insertarImagenProducto = async (id_producto, url, texto_alternativo) => {
  const consulta = `INSERT INTO imagenes_productos (id_imagen, id_producto, url, texto_alternativo) VALUES (DEFAULT, $1, $2, $3) RETURNING *;`;
  const values = [id_producto, url, texto_alternativo];
  const result = await pool.query(consulta, values);
  return result.rows[0]; // Retorna la imagen insertada
};

//-------------------------------------------------------------------------------------------
// FUNCIÓN PARA INSERTAR UN PRODUCTO CON SU CATEGORÍA

const insertarProductosCategorias = async (id_producto, id_categoria) => {
  const consulta = `INSERT INTO productos_categorias (id_producto, id_categoria) VALUES ($1, $2) RETURNING *;`;
  const values = [id_producto, id_categoria];
  const result = await pool.query(consulta, values);
  return result.rows[0]; // Retorna la imagen insertada
};

//-------------------------------------------------------------------------------------------
// FUNCIÓN PARA INSERTAR UN PRODUCTO A TABLA SALE

const insertarProductosSale = async (id_producto) => {
  const consulta = `INSERT INTO productos_sale (id_producto, descuento, estado) VALUES ($1, 0, DEFAULT) RETURNING *;`;
  const values = [id_producto];
  const result = await pool.query(consulta, values);
  return result.rows[0];
};

//-------------------------------------------------------------------------------------------
// FUNCIÓN PARA TRAER PRODUCTO
const getProductos = async () => {
  const { rows: productos } = await pool.query("SELECT * FROM productos");
  return productos;
};

//-------------------------------------------------------------------------------------------
// FUNCIÓN PARA TRAER PRODUCTO POR ID (Tengo dudas con esta función)
const getProductoById = async (id_producto) => {
  const { rows } = await pool.query(
    `SELECT p.id_producto, p.nombre, p.descripcion AS descripcion, p.precio,   i.url AS foto  FROM productos p        LEFT JOIN imagenes_productos i ON p.id_producto = i.id_producto        WHERE p.id_producto = $1 LIMIT 1`,
    [id_producto]
  );
  if (rows.length === 0) {
    throw { code: 404, message: "Producto no encontrado" };
  }
  return rows[0];
};

//-------------------------------------------------------------------------------------------
// FUNCIÓN PARA TRAER PRODUCTO POR CATEGORIAS
const getProductosCategorias = async () => {
  const { rows: productos_categorias } = await pool.query(
    "SELECT * FROM productos_categorias"
  );
  return productos_categorias;
};

//-------------------------------------------------------------------------------------------
// FUNCIÓN PARA TRAER PRODUCTO SALE
const getProductosSale = async () => {
  const { rows: productos_sale } = await pool.query(
    "SELECT * FROM productos_sale WHERE estado = 'activo';"
  );
  return productos_sale;
};

//-------------------------------------------------------------------------------------------
// FUNCIÓN PARA ACTUALIZAR ESTADO DE PUBLICACIÓN A INACTIVA
const publicacionInactiva = async (id_publicacion) => {
  const consulta =
    "UPDATE publicaciones SET estado = $1, fecha_actualizacion = NOW() WHERE id_publicacion = $2 RETURNING *;";
  const values = ["inactivo", id_publicacion];
  const result = await pool.query(consulta, values);
  return result.rows[0]; // Retorna la publicación actualizada
};

//-------------------------------------------------------------------------------------------
// FUNCIÓN PARA ACTUALIZAR ESTADO DE PUBLICACIÓN A ACTIVO
const publicacionActiva = async (id_publicacion) => {
  const consulta =
    "UPDATE publicaciones SET estado = $1, fecha_actualizacion = NOW() WHERE id_publicacion = $2 RETURNING *;";
  const values = ["activo", id_publicacion];
  const result = await pool.query(consulta, values);
  return result.rows[0]; // Retorna la publicación actualizada
};

//-------------------------------------------------------------------------------------------
// FUNCIÓN PARA OBTENER LAS CATEGORIAS
const obtenerCategorias = async () => {
  const { rows: categorias } = await pool.query("SELECT * FROM categorias");
  return categorias;
};

//-------------------------------------------------------------------------------------------
// FUNCIÓN PARA OBTENER DATOS DE USUARIO
const obtenerDatosPersonales = async (id_usuario) => {
  const consulta = "SELECT * FROM usuarios WHERE id_usuario = $1 ; ";
  const values = [id_usuario];
  const result = await pool.query(consulta, values);
  return result.rows[0]; // Retorna la publicación actualizada
};

//-------------------------------------------------------------------------------------------
// FUNCIÓN PARA MODIFICAR DATOS DE USUARIO
const cambiarDatosPersonales = async (datos) => {
  const { nombre, apellido, telefono, email, id_usuario } = datos;
  // console.log("información usuario mas id", id_usuario, nombre, apellido, telefono, email);
  const query = `    UPDATE usuarios     SET nombre = $1, apellido = $2, telefono = $3, email = $4    WHERE id_usuario = $5  RETURNING *;`;

  const values = [nombre, apellido, telefono, email, id_usuario];

  try {
    const { rows } = await pool.query(query, values);
    if (rows.length === 0) {
      throw new Error("Usuario no encontrado.");
    }
    return rows[0]; // Devuelve los datos actualizados
  } catch (error) {
    console.error("Error al actualizar datos personales:", error);
    throw error;
  }
};

//-------------------------------------------------------------------------------------------
// FUNCIÓN PARA OBTENER DATOS DEL PEDIDO / VENTA
const obtenerVentas = async () => {
  const consulta = `SELECT p.id_pedido AS n_pedido, u.nombre AS Nombre, u.apellido AS Apellido,    p.fecha_pedido AS Fecha_Pedido,    p.total AS Total,     u.telefono AS Teléfono,    u.email AS Email,    d.direccion AS Dirección,    d.ciudad AS Ciudad FROM pedidos p JOIN  usuarios u ON p.id_usuario = u.id_usuario LEFT JOIN ( SELECT DISTINCT ON (id_usuario) * FROM direcciones ORDER BY id_usuario, id_direccion) d ON u.id_usuario = d.id_usuario ORDER BY    p.id_pedido;`;

  try {
    const { rows } = await pool.query(consulta);
    console.log("Ventas / Pedidos ", rows);
    return rows;
  } catch (error) {
    console.error("Error al leer publicaciones:", error);
    throw new Error("No se pudieron obtener las publicaciones");
  }
};

//-------------------------------------------------------------------------------------------
// FUNCIÓN PARA OBTENER LOS PRODUCTOS EN LA TIENDA
const obtenerTienda = async () => {
  const consulta = `SELECT DISTINCT ON (p.id_producto)    p.id_producto,    p.nombre AS producto_nombre,    p.precio AS producto_precio,    img.url AS imagen_url,    cat.nombre AS categoria_nombre,    ps.estado AS sale FROM    productos p JOIN    productos_sale ps ON p.id_producto = ps.id_producto JOIN    productos_categorias pc ON p.id_producto = pc.id_producto JOIN    categorias cat ON pc.id_categoria = cat.id_categoria JOIN    publicaciones pub ON p.id_producto = pub.id_producto LEFT JOIN    (SELECT DISTINCT ON (id_producto) id_producto, url     FROM imagenes_productos     ORDER BY id_producto, id_imagen) img ON p.id_producto = img.id_producto WHERE    pub.estado = 'Activo' ORDER BY p.id_producto;`;

  try {
    const resultados = await pool.query(consulta);
    console.log("Productos para la tienda ", resultados.rows);
    return resultados.rows;
  } catch (error) {
    console.error("Error al leer productos de la tienda:", error);
    throw new Error("No se pudieron obtener los productos de la tienda");
  }
};

//-------------------------------------------------------------------------------------------
// FUNCIÓN PARA OBTENER UN PRODUCTO POR CATEGORIA EN LA SECCIÓN DEL HOME
const obtenerCategoriasHome = async () => {
  const consulta = `   SELECT     p.id_producto,    p.nombre AS producto_nombre,    p.precio,    img.url AS imagen_url,    cat.nombre AS categoria_nombre FROM     productos p JOIN     productos_categorias pc ON p.id_producto = pc.id_producto JOIN     categorias cat ON pc.id_categoria = cat.id_categoria LEFT JOIN     (SELECT DISTINCT ON (id_producto) id_producto, url     FROM imagenes_productos     ORDER BY id_producto, id_imagen) img ON p.id_producto = img.id_producto WHERE      p.id_producto IN (         SELECT MIN(p.id_producto)         FROM productos p         JOIN productos_categorias pc ON p.id_producto = pc.id_producto         GROUP BY pc.id_categoria  ) LIMIT 4; `;

  try {
    const resultados = await pool.query(consulta);
    console.log("4 productos uno por categoria: ", resultados.rows);
    return resultados.rows;
  } catch (error) {
    console.error("Error al obtener un prodcuto por categoria:", error);
    throw new Error("No se pudieron obtener los productos por categoria ");
  }
};

//-------------------------------------------------------------------------------------------
// FUNCIÓN PARA OBTENER 4 PRODUCTO SALE EN DESCUETO PARA LA SECCIÓN DEL HOME
const obtenerSalesHome = async () => {
  const consulta = ` SELECT    p.id_producto,    p.nombre AS producto_nombre,    p.precio,    img.url AS imagen_url,    ps.estado AS producto_estado,    cat.nombre AS categoria_nombre    FROM     productos p JOIN     productos_sale ps ON p.id_producto = ps.id_producto JOIN     productos_categorias pc ON p.id_producto = pc.id_producto JOIN      categorias cat ON pc.id_categoria = cat.id_categoria LEFT JOIN     (SELECT DISTINCT ON (id_producto) id_producto, url      FROM imagenes_productos      ORDER BY id_producto, id_imagen) img ON p.id_producto = img.id_producto WHERE      ps.estado = 'activo' LIMIT 4;`;

  try {
    const resultados = await pool.query(consulta);
    console.log("4 productos sale: ", resultados.rows);
    return resultados.rows;
  } catch (error) {
    console.error("Error al obtener productos sale para el home:", error);
    throw new Error("No se pudieron obtener los productos sale ");
  }
};

module.exports = {
    leerPublicaciones,
    insertarProducto,
    insertarPublicacion,
    insertarImagenProducto,
    getProductos,
    getProductoById,
    getProductosSale,
    getProductosCategorias,
    publicacionInactiva,
    publicacionActiva,
    insertarProductosCategorias,
    obtenerCategorias,
    obtenerDatosPersonales,
    obtenerVentas,
    obtenerTienda,
    cambiarDatosPersonales,
    obtenerCategoriasHome,
    obtenerSalesHome,
    insertarProductosSale,
  };
  
