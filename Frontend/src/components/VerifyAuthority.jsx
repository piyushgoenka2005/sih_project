import React, { useState } from "react";
import { Link } from "react-router-dom";

const IssuingAuthority = () => {
  // Placeholder data for pending documents
  const pendingDocuments = Array.from({ length: 5 }, (_, index) => ({
    id: index + 1,
    name: `Document ${index + 1}`,
    status: "Pending",
  }));

  const [showPopup, setShowPopup] = useState(false); // State to control pop-up visibility

  const togglePopup = () => {
    setShowPopup(!showPopup); // Toggle pop-up on button click
  };

  return (
    <div className="mt-10 mb-10 h-[550px] bg-white flex items-center justify-center">
      <div className="max-w-4xl w-full bg-blue-100 p-8 rounded-lg shadow-lg">
        {/* Heading Section */}
        <div className="w-full mb-8">
          <h1 className="text-3xl font-bold text-blue-700 mb-4">
            Verify Authority
          </h1>
          <p className="text-blue-800">
            Manage and verify documents. Review pending documents for
            verification.
          </p>
        </div>

        {/* Pending Documents Section */}
        {/* <div className="w-full mb-8">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">
            Pending Documents
          </h2>
          <ul>
            {pendingDocuments.map((doc) => (
              <li key={doc.id} className="mb-4">
                <Link
                  to={`/pending-verification/${doc.id}`}
                  className="block p-4 bg-white text-blue-700 shadow-md rounded-lg hover:bg-blue-50"
                >
                  {doc.name} - {doc.status}
                </Link>
              </li>
            ))}
          </ul>
        </div> */}

        {/* Button to trigger popup */}
        <button
          type="button"
          onClick={togglePopup}
          className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-400"
        >
          Upload Document for AI verification
        </button>
      </div>

      {/* Popup for document upload */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl mx-6">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">
              Upload Document for Verification
            </h2>
            <p className="mb-4 text-blue-700">
              Please upload the document you want to verify.
            </p>

            <input
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.png"
              className="w-full mb-4 px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
            />

            <div className="flex justify-end space-x-4">
              {/* Button to close the popup */}
              <button
                onClick={togglePopup}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>

              {/* Upload Button */}
              <button
                type="button"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IssuingAuthority;
