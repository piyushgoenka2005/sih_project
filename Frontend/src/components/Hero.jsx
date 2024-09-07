import { Link } from "react-router-dom";
import illustrationIntro from "../assets/illustration-intro.svg";

const Hero = () => {
  const user = true;
  return (
    <section id="hero">
      {/* Flex Container */}
      <div className="container flex flex-col-reverse items-center px-6 mx-auto mt-10 space-y-0 md:space-y-0 md:flex-row">
        {/* Left Item */}
        <div className="flex flex-col mb-32 space-y-8 md:w-1/2 pt-32 pl-10">
          <h1 className="max-w-md text-4xl font-bold text-center md:text-4xl md:text-left">
            Welcome to Your Secure Document Vault
          </h1>
          <p className="max-w-sm text-center text-darkGrayishBlue md:text-left">
            Access and manage all your official documents with ease, backed by
            AI and blockchain for ultimate authenticity and security.
          </p>
          <div className="flex justify-center md:justify-start">
            {user ? (
              <Link
                to="/request"
                className="p-3 px-6 pt-2 text-white bg-orange-600 hover:bg-orange-400 rounded-full baseline hover:bg-brightRedLight"
              >
                Get Started
              </Link>
            ) : (
              <Link
                to="/login"
                className="p-3 px-6 pt-2 text-white bg-orange-600 hover:bg-orange-400 rounded-full baseline hover:bg-brightRedLight"
              >
                Get Started
              </Link>
            )}
          </div>
        </div>
        {/* Image */}
        <div className="md:w-1/2">
          <img src={illustrationIntro} alt="" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
