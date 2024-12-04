import { Carousel } from "react-bootstrap";


const Carrusel = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./imag_bann_1.png"
          alt="Primera imagen"
        />
        <Carousel.Caption>
          <h3>Primera Imagen</h3>
          <p>Descripción de la primera imagen.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./imag_bann_2.png"
          alt="Segunda imagen"
        />
        <Carousel.Caption>
          <h3>Segunda Imagen</h3>
          <p>Descripción de la segunda imagen.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./imag_bann_3.png"
          alt="Tercera imagen"
        />
        <Carousel.Caption>
          <h3>Tercera Imagen</h3>
          <p>Descripción de la tercera imagen.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Carrusel;
