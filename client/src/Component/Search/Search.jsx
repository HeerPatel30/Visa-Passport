import React, { useState } from "react";

const PassportSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedPassport, setSelectedPassport] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await fetch("https://visa-passport.onrender.com/passport/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ search: query }),
      });

      const data = await response.json();
      setResults(data.data || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "text-green-600";
      case "rejected":
        return "text-red-500";
      case "pending":
      default:
        return "text-orange-500";
    }
  };

  return (
    <div className="p-6">
      {/* Search Input */}
      <div className="flex flex-col items-center gap-4 mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">Search for Passport</h1>
        <div className="flex items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by Passport Number..."
            className="w-80 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="ml-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Search
          </button>
        </div>
      </div>

      {/* Results Table */}
      {results.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead className="bg-gray-100">
              <tr>
                {["Full Name", "Email", "Phone", "Status", "Submitted At", "Action"].map((heading) => (
                  <th key={heading} className="py-3 px-4 text-left text-gray-700 font-medium border-b">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 align-top">
                  <td className="py-3 px-4">
                    {`${item.firstname?.trim() || ""} ${item.middlename?.trim() || ""} ${item.lastname?.trim() || ""}`}
                  </td>
                  <td className="py-3 px-4">{item.email}</td>
                  <td className="py-3 px-4">{item.phone}</td>
                  <td className={`py-3 px-4 font-semibold ${getStatusColor(item.status)}`}>
                    {item.status || "Pending"}
                  </td>
                  <td className="py-3 px-4">
                    {item.submissionDate
                      ? new Date(item.submissionDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => setSelectedPassport(item)}
                      className="text-blue-600 underline hover:text-blue-800"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* No Result Message */}
      {results.length === 0 && query && (
        <p className="text-center text-gray-500 mt-6">No results found.</p>
      )}

      {/* Details Modal */}
      {selectedPassport && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-6 overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Passport Application Details</h2>
              <button
                className="text-gray-600 hover:text-red-500 text-lg font-bold"
                onClick={() => setSelectedPassport(null)}
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><strong>Full Name:</strong> {selectedPassport.firstname} {selectedPassport.middlename} {selectedPassport.lastname}</div>
              <div><strong>Gender:</strong> {selectedPassport.gender}</div>
              <div><strong>DOB:</strong> {selectedPassport.dob}</div>
              <div><strong>Place of Birth:</strong> {selectedPassport.placeofbirth}</div>
              <div><strong>Email:</strong> {selectedPassport.email}</div>
              <div><strong>Phone:</strong> {selectedPassport.phone}</div>
              <div><strong>Alternate Phone:</strong> {selectedPassport.alternatePhone}</div>
              <div><strong>Occupation:</strong> {selectedPassport.occupation}</div>
              <div><strong>Organization:</strong> {selectedPassport.organization}</div>
              <div><strong>Designation:</strong> {selectedPassport.designation}</div>
              <div><strong>Present Address:</strong> {selectedPassport.presentAddress}</div>
              <div><strong>Permanent Address:</strong> {selectedPassport.permanentAddress}</div>
              <div><strong>Status:</strong> <span className={getStatusColor(selectedPassport.status)}>{selectedPassport.status}</span></div>
              <div><strong>Submission Date:</strong> {new Date(selectedPassport.submissionDate).toLocaleDateString()}</div>
            </div>

            {/* Documents Section */}
            <div className="mt-6">
              <h3 className="font-semibold text-lg mb-2">Uploaded Documents</h3>
              <ul className="list-disc pl-5 space-y-2">
                {selectedPassport.documents?.aadhaarCard && (
                  <li>
                    Aadhaar Card:{" "}
                    <a
                      href={selectedPassport.documents.aadhaarCard}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      View
                    </a>
                  </li>
                )}
                {Array.isArray(selectedPassport.documents?.others) &&
                  selectedPassport.documents.others.map((url, i) => (
                    <li key={i}>
                      Other Doc {i + 1}:{" "}
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        View
                      </a>
                    </li>
                  ))}
                {!selectedPassport.documents?.aadhaarCard &&
                  (!Array.isArray(selectedPassport.documents?.others) ||
                    selectedPassport.documents.others.length === 0) && (
                    <li className="text-red-500">No documents uploaded</li>
                  )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PassportSearch;
