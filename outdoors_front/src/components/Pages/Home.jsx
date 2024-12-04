
// import CarouselComponent from "../components/CarouselComponent";
// import CategoryCards from "../components/CategoryCards";
// import FeaturedProducts from "../components/FeaturedProducts";
// import BrandBanner from "../components/BrandBanner";
import Carrusel from "../Home/Carrusel";
import FeaturedProducts from "../Home/FeaturedProducts";
import CategoryCards from "../Home/CategoryCards";

const Home = () => {
  return (
    <div>
      {/* <h1>Bienvenido a nuestro Marketplace</h1> */}
      <Carrusel />
      <CategoryCards />
      <FeaturedProducts />
      {/* <BrandBanner /> */}
    </div>
  );
};

export default Home;

