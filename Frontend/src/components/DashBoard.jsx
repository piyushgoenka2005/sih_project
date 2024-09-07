import React, { useState } from "react";
import upload from "../assets/upload.png";

const UploadDocument = () => {
  const [file, setFile] = useState(null);
  const [showPopover, setShowPopover] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUploadClick = () => {
    if (file) {
      setShowPopover(true);
    }
  };

  const handleDownloadBlankPDF = () => {
    // Create a blank PDF blob
    const blankPDF = new Blob([" "], { type: "application/pdf" });
    const url = URL.createObjectURL(blankPDF);

    // Create a link element, set its href to the blob URL, and click it to trigger download
    const link = document.createElement("a");
    link.href = url;
    link.download = "blank.pdf";
    link.click();

    // Clean up the URL object after download
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-blue-100 min-h-screen flex items-center justify-center py-10">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl p-6 relative">
        <div className="flex flex-col lg:flex-row">
          {/* File Upload Section */}
          <div className="flex-1 flex flex-col items-center justify-center p-6 border-b lg:border-r lg:border-b-0 border-gray-300">
            <img
              src={upload}
              alt="Upload"
              className="w-24 h-24 rounded-full mb-4"
            />
            <p className="text-lg font-semibold mb-4 text-blue-600">
              Select a document to upload
            </p>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="mb-4 text-blue-600"
            />
            <button
              onClick={handleUploadClick}
              className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600 disabled:opacity-50"
              disabled={!file}
            >
              Upload
            </button>
          </div>

          {/* Form Section */}
          <div className="flex-1 p-6">
            <form>
              <div className="mb-4">
                <label
                  htmlFor="documentName"
                  className="block text-sm font-medium text-blue-700"
                >
                  Document Name
                </label>
                <input
                  type="text"
                  id="documentName"
                  placeholder="Document Name"
                  className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm bg-blue-100 focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="individualName"
                  className="block text-sm font-medium text-blue-700"
                >
                  Individual Name
                </label>
                <input
                  type="text"
                  id="individualName"
                  placeholder="Individual Name"
                  className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm bg-blue-100 focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-blue-700"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="name@example.com"
                  className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm bg-blue-100 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600"
              >
                Issue Document
              </button>
            </form>
          </div>
        </div>

        {/* Popover Message */}
        {showPopover && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-lg font-semibold mb-4">
                Document uploaded successfully!
              </p>
              <button
                onClick={handleDownloadBlankPDF}
                className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600"
              >
                Download PDF
              </button>
              <button
                onClick={() => setShowPopover(false)}
                className="ml-4 bg-gray-200 text-gray-700 py-2 px-4 rounded-full hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadDocument;
