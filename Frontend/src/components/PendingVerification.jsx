import React from "react";
import { useParams } from "react-router-dom";

const PendingVerification = () => {
  const { id } = useParams();

  // Placeholder data for the details of the pending document
  const documentDetails = {
    id,
    name: `Document ${id}`,
    type: "Passport",
    submittedBy: "John Doe",
    email: "john.doe@example.com",
    submissionDate: "2024-09-01",
    status: "Pending Verification",
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center py-10">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">
          Document Details - {documentDetails.name}
        </h1>

        {/* Table displaying document details */}
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="border px-4 py-2 text-left text-blue-600">
                Field
              </th>
              <th className="border px-4 py-2 text-left text-blue-600">
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">Document Name</td>
              <td className="border px-4 py-2">{documentDetails.name}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Document Type</td>
              <td className="border px-4 py-2">{documentDetails.type}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Submitted By</td>
              <td className="border px-4 py-2">
                {documentDetails.submittedBy}
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Email</td>
              <td className="border px-4 py-2">{documentDetails.email}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Submission Date</td>
              <td className="border px-4 py-2">
                {documentDetails.submissionDate}
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Status</td>
              <td className="border px-4 py-2">{documentDetails.status}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingVerification;
