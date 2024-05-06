import React, { useEffect, useState } from "react";
import Embeds from "./components/embeds";
import Hero from "./components/hero";
import Creatives from "./components/community";
import Faqs from "./components/qa";
import Close from "./components/close";
import Events from "./components/events";
import Example2 from "./example";
import AOS from "aos";
import "aos/dist/aos.css"; // This imports the default AOS styles
import Vide from "./vide";
import Navbar from "../../components/navbar/navbar";

function Example() {
  require("./tailwind.css");
  let [tabOrientation, setTabOrientation] = useState("horizontal");

  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 600,
      easing: "ease-out-sine",
    });
  });

  return (
    <div>
      <Hero />
      <Embeds />
      <Creatives />
      <Events />
      <Faqs />
      <Close />
    </div>
  );
}

export default Example;
