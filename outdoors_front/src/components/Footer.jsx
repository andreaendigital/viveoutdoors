
import { Container, Row, Col } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5">
      <Container className="py-4">
        <Row>
          <Col md={3} className="text-start">
            <h5>
              <strong>Categorías</strong>
            </h5>
            <ul className="list-unstyled">
              <li>Carpas</li>
              <li>Mochilas</li>
              <li>Colchonetas & Sacos</li>
              <li>Accesorios</li>
            </ul>
          </Col>
          <Col md={3} className="text-start">
            <h5>
              <strong>Atención al Cliente</strong>
            </h5>
            <ul className="list-unstyled">
              <li>Sigue tu pedido</li>
              <li>Cambios y devoluciones</li>
              <li>Preguntas frecuentes</li>
              <li>Servicio Técnico</li>
              <li>Centro de Ayuda</li>
              <li>Términos y Condiciones</li>
            </ul>
          </Col>
          <Col md={3} className="text-start">
            <h5>
              <strong>Dirección de Showroom</strong>
            </h5>
            <ul className="list-unstyled">
              <li>
                La Luma 1283, Vitacura, <br /> Santiago, Chile
              </li>
              <li>
                <strong>Horario:</strong>
              </li>
              <li>Lunes a Viernes: 09:00 a 18:00 hrs</li>
            </ul>
          </Col>
          <Col md={3} className="text-start">
            <h5>
              <strong>Contáctanos</strong>
            </h5>
            <ul className="list-unstyled">
              <li>
                Cambios y devoluciones <br />
                online: <a href="#">click aquí</a>
              </li>
              <li>
                <strong>Email:</strong>
              </li>
              <li>hola@viveoutdoors.cl</li>
            </ul>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col className="text-center">
            <h5>
              <strong>Métodos de Pago</strong>
            </h5>
            <div className="d-flex justify-content-center">
              <a
                href="https://www.webpay.cl"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="./webpayplus.png" alt="WebPay" className="mx-2" height="110px" />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
