import React from "react";
import AboutSection from "../../Components/AboutSection";
import Banner from "../../Components/Banner";
import ContactSection from "../../Components/ContactSection";
import Map from "../../Components/Map";
import Services from "../../Components/Services";
import Textimonials from "../../Components/Textimonials";
const GuestHome = () => {
  return (
    <div>
      <div className="my-4 space-y-6 container">
        <Banner></Banner>
        <AboutSection></AboutSection>
        <Services></Services>
        <Textimonials></Textimonials>
        <ContactSection></ContactSection>
        <Map></Map>
      </div>
    </div>
  );
};

export default GuestHome;
