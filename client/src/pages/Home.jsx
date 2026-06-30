import Hero from "../components/Hero";

import { useEffect, useState } from "react";
import API from "../services/api";
import Categories from "../components/Categories";
import FeaturedProducts from "../components/FeaturedProducts";
import WhyChooseUs from "../components/WhyChooseUs";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);


  return (
    <div
      style={{
        background: "#0f172a",
        minHeight: "100vh",
        color: "white",
        padding: "25px",
      }}
    >
 
<Hero />

<Categories />
<FeaturedProducts products={products} />

<WhyChooseUs />
<Newsletter />
<Footer />




</div>
);
}

export default Home;