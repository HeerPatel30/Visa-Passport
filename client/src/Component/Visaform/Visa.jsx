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
      if (e.target.multiple) setFormData({ ...formData, [name]: files });
      else setFormData({ ...formData, [name]: files[0] });
    } else setFormData({ ...formData, [name]: value });

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
        if (!formData.passportNumber) stepErrors.passportNumber = "Passport Number required";
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

      default:
        break;
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const nextStep = () => validateStep() && setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = async () => {
    if (!validateStep()) return;

    const form = new FormData();
    for (const key in formData) {
      const value = formData[key];
      if (value instanceof FileList || Array.isArray(value)) {
        for (const f of value) form.append(key, f);
      } else form.append(key, value);
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

  const input =
    "w-full px-4 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500";

  const renderStep = () => {
    const e = errors;
    switch (step) {
      case 0:
        return (
          <div className="grid gap-4">
            <input name="fullName" placeholder="Full Name" className={input} onChange={handleChange} />
            {e.fullName && <p className="text-red-500 text-sm">{e.fullName}</p>}

            <input type="date" name="dateOfBirth" className={input} onChange={handleChange} />

            <select name="gender" defaultValue="" className={input} onChange={handleChange}>
              <option value="" disabled>Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>

            <input name="nationality" placeholder="Nationality" className={input} onChange={handleChange} />
            <input name="email" placeholder="Email" className={input} onChange={handleChange} />
            <input name="phone" placeholder="Phone" className={input} onChange={handleChange} />
            <input name="address" placeholder="Address" className={input} onChange={handleChange} />
          </div>
        );

      case 1:
        return (
          <div className="grid gap-4">
            <input name="passportNumber" placeholder="Passport Number" className={input} onChange={handleChange} />
            <label className="text-sm font-medium">Passport Issue Date:</label>
            <input type="date" name="passportIssueDate" className={input} onChange={handleChange} />
            <label className="text-sm font-medium">Passport Expiry Date:</label>
            <input type="date" name="passportExpiryDate" className={input} onChange={handleChange} />
          </div>
        );

      case 2:
        return (
          <div className="grid gap-4">
            <select name="visaType" defaultValue="" className={input} onChange={handleChange}>
              <option value="" disabled>Select Visa Type</option>
              <option value="1">Tourist</option>
              <option value="2">Business</option>
              <option value="3">Student</option>
              <option value="4">Work</option>
              <option value="5">Travel</option>
            </select>

            <input name="travelPurpose" placeholder="Purpose of Travel" className={input} onChange={handleChange} />

            <label className="text-sm font-medium">Travel From Date:</label>
            <input type="date" name="travelFromDate" className={input} onChange={handleChange} />

            <label className="text-sm font-medium">Travel To Date:</label>
            <input type="date" name="travelToDate" className={input} onChange={handleChange} />

            <input
              name="destinationCountry"
              placeholder="Destination Country"
              className={input}
              onChange={handleChange}
            />
          </div>
        );

      case 3:
        return (
          <div className="grid gap-4">
            <label>Passport Copy (Front & Both):</label>
            <input type="file" name="passportCopy" multiple className={input} onChange={handleChange} />

            <label>Photo:</label>
            <input type="file" name="photo" className={input} onChange={handleChange} />

            <label>Application Form:</label>
            <input type="file" name="applicationForm" className={input} onChange={handleChange} />

            <label>Flight Booking:</label>
            <input type="file" name="flightBooking" className={input} onChange={handleChange} />

            <label>Hotel Booking:</label>
            <input type="file" name="hotelBooking" className={input} onChange={handleChange} />

            <label>Travel Insurance:</label>
            <input type="file" name="travelInsurance" className={input} onChange={handleChange} />

            <label>Financial Proof:</label>
            <input type="file" name="financialProof" className={input} onChange={handleChange} />

            <label>Invitation Letter:</label>
            <input type="file" name="invitationLetter" className={input} onChange={handleChange} />

            <label>Employment Letter:</label>
            <input type="file" name="employmentLetter" className={input} onChange={handleChange} />

            <label>Student Letter:</label>
            <input type="file" name="studentLetter" className={input} onChange={handleChange} />

            <label>ID Proof:</label>
            <input type="file" name="idProof" className={input} onChange={handleChange} />

            <label>Cover Letter:</label>
            <input type="file" name="coverLetter" className={input} onChange={handleChange} />

            <label>Visa Fee Receipt:</label>
            <input type="file" name="visaFeeReceipt" className={input} onChange={handleChange} />

            <label>Previous Visa:</label>
            <input type="file" name="previousVisa" className={input} onChange={handleChange} />
          </div>
        );

      case 4:
        return (
          <div className="grid gap-2 text-sm max-h-[60vh] overflow-y-auto">
            {Object.entries(formData).map(([key, value]) => (
              <div key={key} className="border-b py-1">
                <strong>{key}: </strong>
                {value instanceof File
                  ? value.name
                  : Array.isArray(value)
                  ? [...value].map((f) => f.name).join(", ")
                  : value?.toString()}
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center relative"
      style={{ backgroundImage: `url(${pass})` }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {notification.message && (
        <div
          className={`fixed top-6 right-6 px-5 py-3 rounded-lg shadow-xl text-white cursor-pointer z-50
        ${notification.type === "success" ? "bg-green-500" : "bg-red-500"}`}
        >
          {notification.message}
        </div>
      )}

      <div className="relative z-10 w-full max-w-4xl bg-white/95 rounded-2xl shadow-2xl border p-10">
        <h1 className="text-3xl font-bold text-center">Visa Application</h1>
        <p className="text-center text-gray-600">Fill details carefully and proceed</p>

        <div className="mt-6">
          <div className="flex justify-between text-xs font-semibold">
            {steps.map((s, i) => (
              <span key={i} className={`${i === step ? "text-blue-600" : "text-gray-500"}`}>
                {s}
              </span>
            ))}
          </div>

          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
              className="h-full bg-blue-600"
            />
          </div>
        </div>

        <motion.div
          key={step}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -25 }}
          transition={{ duration: 0.4 }}
          className="mt-8 max-h-[55vh] overflow-y-auto pr-2"
        >
          {renderStep()}
        </motion.div>

        <div className="flex justify-between mt-8">
          <button
            onClick={prevStep}
            disabled={step === 0}
            className={`px-6 py-2 rounded-lg ${
              step === 0 ? "bg-gray-300" : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Back
          </button>

          {step === steps.length - 1 ? (
            <button onClick={handleSubmit} className="px-6 py-2 rounded-lg bg-green-500 text-white">
              Submit
            </button>
          ) : (
            <button onClick={nextStep} className="px-6 py-2 rounded-lg bg-blue-600 text-white">
              {step === steps.length - 2 ? "Review" : "Next"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
