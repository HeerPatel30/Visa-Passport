// This is a full single-component Visa form in React using Tailwind CSS
// for admin use (add/update/delete). The form is based on your MongoDB Visa schema.
// This version focuses only on the add part. Update/delete can be toggled similarly by ID.

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import pass from "../../assets/pass.jpg";

export default function VisaApplicationForm() {
  const steps = ["Personal Info", "Passport Details", "Visa Info", "Documents", "Review"];
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState({ message: "", type: "" });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      if (e.target.multiple) {
        setFormData({ ...formData, [name]: files });
      } else {
        setFormData({ ...formData, [name]: files[0] });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateStep = () => {
    let stepErrors = {};
    switch (step) {
      case 0:
        if (!formData.fullName) stepErrors.fullName = "Full name is required";
        if (!formData.gender) stepErrors.gender = "Gender is required";
        if (!formData.dateOfBirth) stepErrors.dateOfBirth = "Date of Birth is required";
        if (!formData.nationality) stepErrors.nationality = "Nationality is required";
        break;
      case 1:
        if (!formData.passportNumber) stepErrors.passportNumber = "Passport Number is required";
        if (!formData.passportIssueDate) stepErrors.passportIssueDate = "Issue Date required";
        if (!formData.passportExpiryDate) stepErrors.passportExpiryDate = "Expiry Date required";
        break;
      case 2:
        if (!formData.visaType) stepErrors.visaType = "Visa type required";
        if (!formData.destinationCountry) stepErrors.destinationCountry = "Destination required";
        break;
      case 3:
        if (!formData.photo) stepErrors.photo = "Photo is required";
        if (!formData.applicationForm) stepErrors.applicationForm = "Application form required";
        break;
    }
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) setStep((prev) => Math.min(prev + 1, steps.length - 1));
  };
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = async () => {
    if (!validateStep()) return;
    const form = new FormData();
    for (const key in formData) {
      const value = formData[key];
      if (value instanceof FileList || Array.isArray(value)) {
        for (const file of value) form.append(key, file);
      } else {
        form.append(key, value);
      }
    }

    try {
      const res = await fetch("https://visa-passport.onrender.com/visa/add", {
        method: "POST",
        body: form,
      });
      const result = await res.json();
      if (result.status === 200) {
        setNotification({ message: "Visa added successfully", type: "success" });
        setFormData({});
        setStep(0);
      } else {
        setNotification({ message: result.message || "Failed to submit", type: "error" });
      }
    } catch (err) {
      setNotification({ message: err.message || "Server error", type: "error" });
    }
  };

  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => setNotification({ message: "", type: "" }), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const renderStep = () => {
    const err = errors;
    switch (step) {
      case 0:
        return (
          <div className="grid gap-3">
            <input name="fullName" placeholder="Full Name" onChange={handleChange} className="input" />
            {err.fullName && <p className="text-red-500 text-sm">{err.fullName}</p>}

            <input type="date" name="dateOfBirth" onChange={handleChange} className="input" />
            <select name="gender" onChange={handleChange} className="input" defaultValue="">
              <option value="" disabled>Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>

            <input name="nationality" placeholder="Nationality" onChange={handleChange} className="input" />
            <input name="email" placeholder="Email" onChange={handleChange} className="input" />
            <input name="phone" placeholder="Phone" onChange={handleChange} className="input" />
            <input name="address" placeholder="Address" onChange={handleChange} className="input" />
          </div>
        );
      case 1:
        return (
          <div className="grid gap-3">
            <input name="passportNumber" placeholder="Passport Number" onChange={handleChange} className="input" />
            <label className="text-sm font-medium">Passport Issue Date:</label>
            <input type="date" name="passportIssueDate" onChange={handleChange} className="input" />
            <label className="text-sm font-medium">Passport Expiry Date:</label>
            <input type="date" name="passportExpiryDate" onChange={handleChange} className="input" />
          </div>
        );
      case 2:
        return (
          <div className="grid gap-3">
            <select name="visaType" onChange={handleChange} className="input" defaultValue="">
              <option value="" disabled>Select Visa Type</option>
              <option value="1">Tourist</option>
              <option value="2">Business</option>
              <option value="3">Student</option>
              <option value="4">Work</option>
              <option value="5">Travel</option>
            </select>
            <input name="travelPurpose" placeholder="Purpose of Travel" onChange={handleChange} className="input" />
            <label className="text-sm font-medium">travelFromDate:</label>
            <input type="date" name="travelFromDate" onChange={handleChange} className="input" />
           < label className="text-sm font-medium">travelToDate:</label>
            <input type="date" name="travelToDate" onChange={handleChange} className="input" />
            <input name="destinationCountry" placeholder="Destination Country" onChange={handleChange} className="input" />
          </div>
        );
      case 3:
        return (
          <div className="grid gap-3">
            <label>Passport Copy (Front & Both):</label>
            <input type="file" name="passportCopy" multiple onChange={handleChange} className="input" />

            <label>Photo:</label>
            <input type="file" name="photo" onChange={handleChange} className="input" />

            <label>Application Form:</label>
            <input type="file" name="applicationForm" onChange={handleChange} className="input" />

            <label>Flight Booking:</label>
            <input type="file" name="flightBooking" onChange={handleChange} className="input" />

            <label>Hotel Booking:</label>
            <input type="file" name="hotelBooking" onChange={handleChange} className="input" />

            <label>Travel Insurance:</label>
            <input type="file" name="travelInsurance" onChange={handleChange} className="input" />

            <label>Financial Proof:</label>
            <input type="file" name="financialProof" onChange={handleChange} className="input" />

            <label>Invitation Letter:</label>
            <input type="file" name="invitationLetter" onChange={handleChange} className="input" />

            <label>Employment Letter:</label>
            <input type="file" name="employmentLetter" onChange={handleChange} className="input" />

            <label>Student Letter:</label>
            <input type="file" name="studentLetter" onChange={handleChange} className="input" />

            <label>ID Proof:</label>
            <input type="file" name="idProof" onChange={handleChange} className="input" />

            <label>Cover Letter:</label>
            <input type="file" name="coverLetter" onChange={handleChange} className="input" />

            <label>Visa Fee Receipt:</label>
            <input type="file" name="visaFeeReceipt" onChange={handleChange} className="input" />

            <label>Previous Visa:</label>
            <input type="file" name="previousVisa" onChange={handleChange} className="input" />
          </div>
        );
      case 4:
        return (
          <div className="grid gap-2 text-sm">
            {Object.entries(formData).map(([key, value]) => (
              <div key={key} className="border-b py-1">
                <strong>{key}:</strong> {value instanceof File ? value.name : value?.toString()}
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4"
      style={{ backgroundImage: `url(${pass})` }}
    >
      {notification.message && (
        <div
          className={`fixed top-4 right-4 px-4 py-2 rounded shadow-md text-white z-50 ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {notification.message}
        </div>
      )}

      <div className="bg-white bg-opacity-80 backdrop-blur-sm p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-xl font-bold text-center mb-6">Visa Application</h2>
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.4 }}
        >
          {renderStep()}
        </motion.div>

        <div className="flex justify-between mt-6">
          <button
            onClick={prevStep}
            disabled={step === 0}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
          >
            Back
          </button>
          {step === steps.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
            >
              Submit
            </button>
          ) : (
            <button
              onClick={nextStep}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              {step === steps.length - 2 ? "Review" : "Next"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}