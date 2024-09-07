import React, { useState } from "react";

function IssuingAuthority() {
  // State to manage form inputs
  const [documentName, setDocumentName] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [pdfFile, setPdfFile] = useState(null);

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!documentName || !documentType || !pdfFile) {
      alert("Please fill out all fields and upload a PDF.");
      return;
    }

    // Placeholder for submitting the form data
    console.log("Document Name:", documentName);
    console.log("Document Type:", documentType);
    console.log("PDF File:", pdfFile);

    // Reset form fields
    setDocumentName("");
    setDocumentType("");
    setPdfFile(null);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-4xl w-full bg-blue-100 p-8 rounded-lg shadow-lg flex">
        {/* Heading Section */}
        <div className="w-1/4 p-4">
          <h1 className="text-3xl font-bold text-blue-700 mb-4">
            Issuing Authority
          </h1>
          <p className="text-blue-600">
            Issue documents by uploading the required files and filling out the
            necessary information.
          </p>
        </div>

        {/* Form Section */}
        <div className="w-3/4 p-4">
          <form onSubmit={handleSubmit}>
            {/* Document Name Input */}
            <div className="mb-4">
              <label className="block text-blue-700 font-semibold mb-2">
                Document Name
              </label>
              <input
                type="text"
                value={documentName}
                onChange={(e) => setDocumentName(e.target.value)}
                placeholder="Enter document name"
                className="w-full p-2 border border-blue-300 rounded"
              />
            </div>

            {/* Document Type Input */}
            <div className="mb-4">
              <label className="block text-blue-700 font-semibold mb-2">
                Document Type
              </label>
              <input
                type="text"
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
                placeholder="Enter document type"
                className="w-full p-2 border border-blue-300 rounded"
              />
            </div>

            {/* PDF Upload Input */}
            <div className="mb-4">
              <label className="block text-blue-700 font-semibold mb-2">
                Upload PDF
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setPdfFile(e.target.files[0])}
                className="w-full p-2 border border-blue-300 rounded"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            >
              Issue Document
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default IssuingAuthority;
