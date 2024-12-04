import {
    Container,
    Row,
    Col,
    Card,
    Button,
    ListGroup,
    Modal,
  } from "react-bootstrap";
  import { useState, useEffect } from "react";
  
  //logica: necesito que se muestren lso productos respectivos al carrito
  // Al cargar la página hay que recuperar los productos desde el localStorage y muéstralos.
  // El resumen debe recalcularse siempre que el estado del carrito cambie.
  
  const Carrito = () => {
    const [carrito, setCarrito] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [totalCompra, setTotalCompra] = useState(0);
    const [cantidadProductos, setCantidadProductos] = useState(0);
    const costoEnvio = 2000; // Valor fijo
  
    const manejarPago = () => setMostrarModal(true);
    const cerrarModal = () => setMostrarModal(false);
  
    useEffect(() => {
      const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
      const carritoConCantidad = carritoGuardado.map((producto) => ({
        ...producto,
        cantidad: producto.cantidad || 1,
      }));
      setCarrito(carritoConCantidad);
    }, []);
  
    useEffect(() => {
      const total = carrito.reduce(
        (acc, prod) => acc + prod.producto_precio * prod.cantidad,
        0
      );
      const cantidadTotal = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
  
      setTotalCompra(total + costoEnvio); // Incluye el envío
      setCantidadProductos(cantidadTotal); // Total de productos
    }, [carrito]);
  
    const eliminarDelCarrito = (index) => {
      const nuevoCarrito = carrito.filter((_, i) => i !== index);
      setCarrito(nuevoCarrito);
      localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
      console.log("Producto eliminado del carrito:", index);
    };
  
    const incrementarCantidad = (index) => {
      const nuevoCarrito = [...carrito];
      nuevoCarrito[index].cantidad += 1;
      setCarrito(nuevoCarrito);
      localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    };
  
    const decrementarCantidad = (index) => {
      const nuevoCarrito = [...carrito];
  
      if (nuevoCarrito[index].cantidad === 1) {
        if (window.confirm("¿Deseas eliminar este producto?")) {
          nuevoCarrito.splice(index, 1); // Elimina el producto
        }
      } else {
        nuevoCarrito[index].cantidad -= 1;
      }
  
      setCarrito(nuevoCarrito);
      localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    };
  
    return (
      <>
        <Container fluid>
          <h3> CARRITO DE COMPRAS</h3>
          <Row>
            <Col
              className="ps-3 pe-3 p-3"
              md={8}
            >
              
              {carrito.length > 0 ? (
                carrito.map((producto, index) => (
                  <Card key={index} className="mb-3">
                    <Row className="g-0">
                      <Col md={3}>
                        <Card.Img
                          variant="top"
                          src={producto.imagen_url}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                          }}
                        />
                      </Col>
  
                      <Col md={9}>
                        <Card.Body>
                          <Card.Title>{producto.producto_nombre}</Card.Title>
                          <Card.Text>
                            Precio: ${producto.producto_precio}
                          </Card.Text>
                          <Row className="g-0 d-flex justify-content-between">
                            <Col className=" justify-content-start">
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => eliminarDelCarrito(index)} // Función para eliminar
                              >
                                Eliminar Producto
                              </Button>
                            </Col>
  
                            <Col className="d-flex justify-content-end">
                              <Button
                                className="me-1"
                                variant="outline-secondary"
                                onClick={() => decrementarCantidad(index)}
                              >
                                - 1
                              </Button>
                              <Button
                                className="me-1"
                                variant="outline-success"
                                disabled
                              >
                                {producto.cantidad}
                              </Button>
                              <Button
                                className="me-1"
                                variant="outline-secondary"
                                onClick={() => incrementarCantidad(index)}
                              >
                                + 1
                              </Button>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Col>
                    </Row>
                  </Card>
                ))
              ) : (
                <p>No hay productos en el carrito.</p>
              )}
            </Col>
            <Col md={4}>
              <Card>
                <Card.Header>Resumen de Compra</Card.Header>
                <ListGroup variant="flush">
                  <ListGroup.Item className="d-flex justify-content-between align-items-center">
                    Productos ({cantidadProductos})
                    <span> ${totalCompra - costoEnvio} </span>
                  </ListGroup.Item>
  
                  <ListGroup.Item className="d-flex justify-content-between align-items-center">
                    Envíos <span>${costoEnvio}</span>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between align-items-center">
                    Descuentos <span>$0</span>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between align-items-center">
                    Total <span>${totalCompra}</span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button
                      variant="primary"
                      className="w-100"
                      onClick={manejarPago}
                    >
                      Pagar
                    </Button>
  
                    <Modal show={mostrarModal} onHide={cerrarModal}>
                      <Modal.Header closeButton>
                        <Modal.Title>Iniciar Sesión</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        Debe iniciar sesión para proceder al pago.
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={cerrarModal}>
                          Cerrar
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
  
              <Button
                variant="success"
                className="w-100 mt-3"
                onClick={() => (window.location.href = "/tienda")}
              >
                Seguir Comprando
              </Button>
            </Col>
          </Row>
       
        </Container>
      </>
    );
  };
  
  export default Carrito;
  