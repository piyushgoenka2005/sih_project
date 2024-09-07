import React, { useState } from "react";

const RequestDocument = () => {
  // State for user input
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    documentType: "",
    dobProof: null,
    addressProof: null,
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file change for proofs
  const handleFileChange = (e) => {
    const { name } = e.target;
    setFormData({ ...formData, [name]: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Add submission logic here
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center py-10">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Apply for a Document
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* User Information Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-blue-500">
              Your Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Input */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-blue-100 focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-blue-100 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Document Request Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-blue-500">
              Document Request
            </h2>

            <div>
              <label
                htmlFor="documentType"
                className="block text-sm font-medium text-gray-700"
              >
                Select Document Type
              </label>
              <select
                id="documentType"
                name="documentType"
                value={formData.documentType}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-blue-100 focus:outline-none"
              >
                <option value="" className="bg-white">
                  Select a document
                </option>
                <option value="Passport" className="bg-white">
                  Passport
                </option>
                <option value="Driving License" className="bg-white">
                  Driving License
                </option>
                <option value="ID Card" className="bg-white">
                  ID Card
                </option>
              </select>
            </div>
          </div>

          {/* Upload Proofs Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-blue-500">
              Upload Proofs
            </h2>

            {/* Proof of Date of Birth */}
            <div>
              <label
                htmlFor="dobProof"
                className="block text-sm font-medium text-gray-700"
              >
                Proof of Date of Birth (PDF only)
              </label>
              <input
                type="file"
                id="dobProof"
                name="dobProof"
                accept=".pdf"
                onChange={handleFileChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* Proof of Address */}
            <div>
              <label
                htmlFor="addressProof"
                className="block text-sm font-medium text-gray-700"
              >
                Proof of Address (PDF only)
              </label>
              <input
                type="file"
                id="addressProof"
                name="addressProof"
                accept=".pdf"
                onChange={handleFileChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600"
          >
            Apply for Document
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestDocument;
