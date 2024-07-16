import React from "react";

const AboutSection = () => {
  return (
    <div className="sm:flex items-center justify-center max-w-screen-2xl">
      <div className="sm:w-1/2 p-10">
        <div className="image object-center text-center">
          <img src="https://i.imgur.com/WbQnbas.png" />
        </div>
      </div>
      <div className="sm:w-1/2 p-5">
        <div className="text">
          <span className="text-gray-500 border-b-2 border-teal-500 uppercase">
            About us
          </span>
          <h2 className="my-4 font-bold text-3xl  sm:text-4xl ">
            About <span className="text-teal-500">Quick Send</span>
          </h2>
          <p className="text-gray-700">
            We are dedicated to creating an environment where innovation,
            collaboration, and excellence are at the forefront of everything we
            do. Established with a vision to empower individuals and
            organizations, we strive to provide the highest quality services and
            solutions to meet the ever-evolving needs of our clients. Our team
            is composed of industry experts who bring a wealth of knowledge and
            experience to the table, ensuring that we deliver top-notch results
            in every project we undertake.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
