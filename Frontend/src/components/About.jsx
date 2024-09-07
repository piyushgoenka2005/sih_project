import React from "react";

const AboutPage = () => {
  return (
    <div className="bg-white text-gray-800 min-h-screen flex flex-col items-center justify-center px-4 pt-10">
      {/* Main Container */}
      <div className="max-w-4xl w-full text-center">
        {/* Title Section */}
        <h1 className="text-3xl font-bold text-blue-800 mb-6">About Us</h1>

        {/* Project Description */}
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">
          Comprehensive Automated Document Verification System
        </h2>
        <p className="text-lg mb-8">
          We aim to revolutionize the way official documents are verified. Our
          platform is designed to make the verification process faster, more
          secure, and highly efficient using cutting-edge{" "}
          <span className="font-semibold">AI</span> and{" "}
          <span className="font-semibold">blockchain</span> technology.
        </p>

        {/* Mission Section */}
        <h3 className="text-xl font-bold text-blue-700 mb-4">Our Mission</h3>
        <p className="text-lg mb-8">
          To simplify the document verification process for individuals,
          authorities, and organizations by providing a secure, tamper-proof
          platform that ensures the authenticity and accessibility of important
          documents.
        </p>

        {/* Features Section */}
        <h3 className="text-xl font-bold text-blue-700 mb-4">What We Offer</h3>
        <ul className="text-lg mb-8 space-y-2">
          <li>
            <span className="font-semibold text-blue-600">
              AI-Powered Verification:
            </span>{" "}
            Our system uses advanced algorithms to quickly validate documents.
          </li>
          <li>
            <span className="font-semibold text-blue-600">
              Blockchain Security:
            </span>{" "}
            Immutability and integrity are guaranteed, ensuring that all records
            are protected against tampering.
          </li>
          <li>
            <span className="font-semibold text-blue-600">
              Seamless Access:
            </span>{" "}
            Individuals, issuing authorities, and verifying organizations can
            access and manage documents anytime, anywhere.
          </li>
        </ul>

        {/* Why Choose Us Section */}
        <h3 className="text-xl font-bold text-blue-700 mb-4">Why Choose Us?</h3>
        <ul className="text-lg mb-8 space-y-2">
          <li>
            <span className="font-semibold text-blue-600">
              Speed & Efficiency:
            </span>{" "}
            Reduce time and resources spent on manual document verification.
          </li>
          <li>
            <span className="font-semibold text-blue-600">
              Enhanced Security:
            </span>{" "}
            Blockchain ensures that all documents are securely stored and cannot
            be altered.
          </li>
          <li>
            <span className="font-semibold text-blue-600">
              User-Friendly Interface:
            </span>{" "}
            A simple and intuitive design that allows users to navigate and
            manage their documents effortlessly.
          </li>
        </ul>

        {/* Call to Action */}
        <p className="text-lg font-bold text-blue-800 mb-8">
          Join Us in Making Document Verification Smarter and Safer!
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
