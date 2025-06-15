import React, { useEffect, useState } from "react";

export default function PassportList() {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [status, setStatus] = useState("");
  const [bookletType, setBookletType] = useState("");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [notification, setNotification] = useState(null);
  const limit = 2;

  const showNotification = (msg, type = "info") => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:3031/admin/passportlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
          uid: localStorage.getItem("uid"),
          unqkey: localStorage.getItem("unqkey"),
        },
        body: JSON.stringify({
          search,
          page,
          limit,
          filter: search
            ? {}
            : {
                ...(fromDate && { fromDate }),
                ...(toDate && { toDate }),
                ...(status && { status }),
                ...(bookletType && { bookletType }),
              },
        }),
      });

      const result = await res.json();

      if (result.status === 200) {
        const nested = result?.data?.[0];
        setApplications(Array.isArray(nested?.data) ? nested.data : []);
        setTotalCount(nested?.totalCount?.[0]?.count || 0);
      } else {
        showNotification(result.message || "Failed to fetch applications", "error");
        setApplications([]);
        setTotalCount(0);
      }
    } catch (err) {
      console.error("Failed to fetch applications", err);
      showNotification("Failed to fetch applications", "error");
      setApplications([]);
      setTotalCount(0);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchData();
    showNotification("Filters applied", "info");
  };

  const handleResetFilters = () => {
    setSearch("");
    setFromDate("");
    setToDate("");
    setStatus("");
    setBookletType("");
    setPage(1);
    fetchData();
    showNotification("Filters reset", "info");
  };

  const handleStatusChange = async (_id, newStatus) => {
    try {
      const res = await fetch("http://localhost:3031/admin/passportupdate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
          uid: localStorage.getItem("uid"),
          unqkey: localStorage.getItem("unqkey"),
        },
        body: JSON.stringify({ _id, status: newStatus }),
      });

      const result = await res.json();

      if (result.status === 200) {
        showNotification(result.message || "Status updated successfully", "success");
        setPage(1);
        fetchData();
      } else {
        showNotification(result.message || "Failed to update status", "error");
      }
    } catch (err) {
      console.error(err);
      showNotification("Error updating status", "error");
    }
  };

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="p-4 relative">
      {notification && (
        <div
          className={`fixed top-2 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2 rounded shadow text-white ${
            notification.type === "success"
              ? "bg-green-500"
              : notification.type === "error"
              ? "bg-red-500"
              : "bg-blue-500"
          }`}
        >
          {notification.msg}
        </div>
      )}

      <h2 className="text-xl font-semibold mb-4 text-center">Passport Applications</h2>

      {/* Filters */}
      <form
        onSubmit={handleFilterSubmit}
        className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4 text-sm items-end"
      >
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-2 py-1"
        />
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="border rounded px-2 py-1"
        />
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="border rounded px-2 py-1"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
        <select
          value={bookletType}
          onChange={(e) => setBookletType(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="">All Booklet Types</option>
          <option value="30 pages">30 pages</option>
          <option value="60 pages">60 pages</option>
        </select>

        <div className="col-span-2 md:col-span-1 flex gap-2">
          <button
            type="submit"
            className="bg-blue-500 text-white rounded px-4 py-1 hover:bg-blue-600 w-full"
          >
            Apply Filters
          </button>
          <button
            type="button"
            onClick={handleResetFilters}
            className="bg-gray-400 text-white rounded px-4 py-1 hover:bg-gray-500 w-full"
          >
            Reset
          </button>
        </div>
      </form>

      {/* Table */}
      <div className="overflow-x-auto rounded shadow">
        <table className="min-w-full bg-white text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-2 px-3">Name</th>
              <th className="py-2 px-3">Gender</th>
              <th className="py-2 px-3">Booklet</th>
              <th className="py-2 px-3 text-center">Documents</th>
              <th className="py-2 px-3">Phone</th>
              <th className="py-2 px-3">Status</th>
              <th className="py-2 px-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-2 px-3">
                  {item.firstname} {item.middlename} {item.lastname}
                </td>
                <td className="py-2 px-3">{item.gender || "N/A"}</td>
                <td className="py-2 px-3">{item.bookletType || "N/A"}</td>
                <td className="py-2 px-3 text-center">
                  {item.documents?.aadhaarCard ? (
                    <span className="text-green-600">✅</span>
                  ) : (
                    <span className="text-red-500">❌</span>
                  )}
                </td>
                <td className="py-2 px-3">{item.phone || "N/A"}</td>
                <td className="py-2 px-3 space-x-1">
                  {["Pending", "Approved", "Rejected"].map((statusOption) => {
                    const isActive = item.status === statusOption;
                    const colorClasses = {
                      Pending: "bg-yellow-100 text-yellow-700 border-yellow-400",
                      Approved: "bg-green-100 text-green-700 border-green-400",
                      Rejected: "bg-red-100 text-red-700 border-red-400",
                    };

                    return (
                      <button
                        key={statusOption}
                        onClick={() =>
                          !isActive && handleStatusChange(item._id, statusOption)
                        }
                        className={`px-2 py-1 border rounded text-xs font-semibold ${
                          colorClasses[statusOption]
                        } ${isActive ? "opacity-100" : "opacity-50 hover:opacity-80"}`}
                      >
                        {statusOption}
                      </button>
                    );
                  })}
                </td>
                <td className="py-2 px-3 space-x-2">
                  <button
                    onClick={() => setSelectedApplication(item)}
                    className="bg-green-500 text-white text-xs px-2 py-1 rounded"
                  >
                    View
                  </button>
                  <button
                    className="bg-red-500 text-white text-xs px-2 py-1 rounded"
                    onClick={() => alert("Delete logic here")}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {applications.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No Applications Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-4">
        <button
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          disabled={page === 1}
          className="px-4 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-4 py-1">Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage((prev) => (prev < totalPages ? prev + 1 : prev))}
          disabled={page >= totalPages}
          className="px-4 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* View Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-auto">
          <div className="bg-white rounded-lg shadow p-6 w-[95%] max-w-3xl relative">
            <button
              onClick={() => setSelectedApplication(null)}
              className="absolute top-2 right-2 text-gray-500"
            >
              ✖
            </button>
            <h3 className="text-lg font-semibold mb-4">Application Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              {Object.entries({
                Name: `${selectedApplication.firstname} ${selectedApplication.middlename} ${selectedApplication.lastname}`,
                Gender: selectedApplication.gender,
                DOB: selectedApplication.dob,
                Nationality: selectedApplication.nationality,
                MaritalStatus: selectedApplication.maritalstatus,
                Email: selectedApplication.email,
                Phone: selectedApplication.phone,
                AlternatePhone: selectedApplication.alternatePhone,
                PresentAddress: selectedApplication.presentAddress,
                PermanentAddress: selectedApplication.permanentAddress,
                Father: selectedApplication.fatherName,
                Mother: selectedApplication.motherName,
                Spouse: selectedApplication.spouseName,
                Occupation: selectedApplication.occupation,
                Organization: selectedApplication.organization,
                Designation: selectedApplication.designation,
                BookletType: selectedApplication.bookletType,
                Status: selectedApplication.status,
                SubmissionDate: new Date(
                  selectedApplication.submissionDate
                ).toLocaleString(),
              }).map(([label, value]) => (
                <p key={label}>
                  <strong>{label}:</strong> {value || "N/A"}
                </p>
              ))}
            </div>

            <div className="mt-4">
              <h4 className="font-semibold mb-2">Documents</h4>
              <ul className="list-disc list-inside text-sm space-y-1">
                {Object.entries(selectedApplication.documents || {}).map(
                  ([key, value]) =>
                    key === "others" ? (
                      value.map((url, i) => (
                        <li key={i}>
                          Other Document {i + 1}:{" "}
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                          >
                            View
                          </a>
                        </li>
                      ))
                    ) : (
                      <li key={key}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}:{" "}
                        {value ? (
                          <a
                            href={value}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                          >
                            View
                          </a>
                        ) : (
                          "Not Uploaded"
                        )}
                      </li>
                    )
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
