import { Outlet } from "react-router-dom";
import Header from "./SharedComponents/Header";
import Footer from "./SharedComponents/Footer";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

function App() {
  useEffect(() => {
    Aos.init({
      duration: 500,
      offset: 50,
      easing: "ease",
      once: true,
    });
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
