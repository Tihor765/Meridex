import { useEffect, useState } from "react";
import API from "../services/api";

import Loader from "../components/Loader";
import FadeIn from "../components/FadeIn";

import Hero from "../components/Hero";
import Categories from "../components/Categories";
import FeaturedProducts from "../components/FeaturedProducts";
import WhyChooseUs from "../components/WhyChooseUs";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div
      style={{
        background: "#0f172a",
        minHeight: "100vh",
        color: "white",
        padding: "25px",
      }}
    >
      <FadeIn>
        <Hero />
      </FadeIn>

      <FadeIn delay={0.1}>
        <Categories />
      </FadeIn>

      <FadeIn delay={0.2}>
        <FeaturedProducts products={products} />
      </FadeIn>

      <FadeIn delay={0.3}>
        <WhyChooseUs />
      </FadeIn>

      <FadeIn delay={0.4}>
        <Newsletter />
      </FadeIn>

      <FadeIn delay={0.5}>
        <Footer />
      </FadeIn>
    </div>
  );
}

export default Home;