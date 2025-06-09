import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import pass from "../../assets/pass.jpg";

export default function PassportForm() {
  const steps = [
    "Personal Info",
    "Contact Info",
    "Address",
    "Family",
    "Work/Study",
    "Passport",
    "Declaration",
    "Review",
  ];

  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState({ message: "", type: "" }); // notification state

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
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
      case 0: // Personal Info
        if (!formData.firstname) stepErrors.firstname = "First name is required";
        if (!formData.lastname) stepErrors.lastname = "Last name is required";
        if (!formData.gender) stepErrors.gender = "Gender is required";
        if (!formData.dob) stepErrors.dob = "Date of birth is required";
        if (!formData.placeofbirth) stepErrors.placeofbirth = "Place of birth is required";
        break;

      case 1: // Contact Info
        if (!formData.email) stepErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email))
          stepErrors.email = "Email is invalid";
        if (!formData.phone) stepErrors.phone = "Phone number is required";
        else if (!/^\d{10}$/.test(formData.phone))
          stepErrors.phone = "Phone number must be 10 digits";
        break;

      case 2: // Address
        if (!formData.presentAddress) stepErrors.presentAddress = "Present address is required";
        if (!formData.permanentAddress) stepErrors.permanentAddress = "Permanent address is required";
        if (!formData.city) stepErrors.city = "City is required";
        if (!formData.state) stepErrors.state = "State is required";
        if (!formData.country) stepErrors.country = "Country is required";
        break;

      case 3: // Family
        if (!formData.fatherName) stepErrors.fatherName = "Father's name is required";
        if (!formData.motherName) stepErrors.motherName = "Mother's name is required";
        break;

      case 4: // Work/Study
        if (!formData.occupation) stepErrors.occupation = "Occupation is required";
        break;

      case 5: // Passport docs
        if (!formData.bookletType) stepErrors.bookletType = "Booklet type is required";
        if (!formData.aadhaarCard) stepErrors.aadhaarCard = "Aadhaar card is required";
        if (!formData.dobProof) stepErrors.dobProof = "DOB proof is required";
        if (!formData.addressProof) stepErrors.addressProof = "Address proof is required";
        if (!formData.photo) stepErrors.photo = "Photo is required";
        if (!formData.signature) stepErrors.signature = "Signature is required";
        break;

      case 6: // Declaration
        if (!formData.declarationAgreed || formData.declarationAgreed !== "Yes") {
          stepErrors.declarationAgreed = "You must agree to the declaration";
        }
        break;

      default:
        break;
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = async () => {
    if (!validateStep()) return;

    const form = new FormData();

    for (const key in formData) {
      const value = formData[key];
      if (!(value instanceof File) && !Array.isArray(value)) {
        form.append(key, value);
      }
    }

    const fileFields = ["aadhaarCard", "dobProof", "addressProof", "photo", "signature"];
    fileFields.forEach((field) => {
      if (formData[field]) {
        form.append(field, formData[field]);
      }
    });

    if (formData.others && formData.others.length > 0) {
      Array.from(formData.others).forEach((file) => {
        form.append("others", file);
      });
    }

    try {
      const response = await fetch("http://localhost:3031/passport/add", {
        method: "POST",
        body: form,
        credentials: "include",
      });

      const result = await response.json();

      if (result.status === "success") {
        setNotification({ message: result.message || "Passport application submitted successfully!", type: "success" });
        setFormData({});
        setStep(0);
      } else {
        setNotification({ message: result.message || "Failed to submit application.", type: "error" });
        console.error(result);
      }
    } catch (error) {
      console.error("Submission error:", error);
      setNotification({ message: "Something went wrong!", type: "error" });
    }
  };

  // Auto-dismiss notification after 3 seconds
  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        setNotification({ message: "", type: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const renderStep = () => {
    const error = errors;
    switch (step) {
      case 0:
        return (
          <div className="grid gap-4">
            <input
              name="firstname"
              placeholder="First Name"
              onChange={handleChange}
              className="input"
            />
            {error.firstname && <p className="text-red-500 text-sm">{error.firstname}</p>}

            <input
              name="middlename"
              placeholder="Middle Name"
              onChange={handleChange}
              className="input"
            />

            <input
              name="lastname"
              placeholder="Last Name"
              onChange={handleChange}
              className="input"
            />
            {error.lastname && <p className="text-red-500 text-sm">{error.lastname}</p>}

            <select
              name="gender"
              onChange={handleChange}
              className="input"
              defaultValue=""
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {error.gender && <p className="text-red-500 text-sm">{error.gender}</p>}

            <input name="dob" type="date" onChange={handleChange} className="input" />
            {error.dob && <p className="text-red-500 text-sm">{error.dob}</p>}

            <input
              name="placeofbirth"
              placeholder="Place of Birth"
              onChange={handleChange}
              className="input"
            />
            {error.placeofbirth && (
              <p className="text-red-500 text-sm">{error.placeofbirth}</p>
            )}
          </div>
        );

      case 1:
        return (
          <div className="grid gap-4">
            <input name="email" placeholder="Email" onChange={handleChange} className="input" />
            {error.email && <p className="text-red-500 text-sm">{error.email}</p>}

            <input name="phone" placeholder="Phone Number" onChange={handleChange} className="input" />
            {error.phone && <p className="text-red-500 text-sm">{error.phone}</p>}

            <input
              name="alternatePhone"
              placeholder="Alternate Phone"
              onChange={handleChange}
              className="input"
            />
          </div>
        );

      case 2:
        return (
          <div className="grid gap-4">
            <input
              name="presentAddress"
              placeholder="Present Address"
              onChange={handleChange}
              className="input"
            />
            {error.presentAddress && (
              <p className="text-red-500 text-sm">{error.presentAddress}</p>
            )}

            <input
              name="permanentAddress"
              placeholder="Permanent Address"
              onChange={handleChange}
              className="input"
            />
            {error.permanentAddress && (
              <p className="text-red-500 text-sm">{error.permanentAddress}</p>
            )}

            <input name="city" placeholder="City" onChange={handleChange} className="input" />
            {error.city && <p className="text-red-500 text-sm">{error.city}</p>}

            <input name="state" placeholder="State" onChange={handleChange} className="input" />
            {error.state && <p className="text-red-500 text-sm">{error.state}</p>}

            <input name="country" placeholder="Country" onChange={handleChange} className="input" />
            {error.country && <p className="text-red-500 text-sm">{error.country}</p>}
          </div>
        );

      case 3:
        return (
          <div className="grid gap-4">
            <input
              name="fatherName"
              placeholder="Father's Name"
              onChange={handleChange}
              className="input"
            />
            {error.fatherName && <p className="text-red-500 text-sm">{error.fatherName}</p>}

            <input
              name="motherName"
              placeholder="Mother's Name"
              onChange={handleChange}
              className="input"
            />
            {error.motherName && <p className="text-red-500 text-sm">{error.motherName}</p>}

            <input
              name="spouseName"
              placeholder="Spouse Name (if any)"
              onChange={handleChange}
              className="input"
            />
          </div>
        );

      case 4:
        return (
          <div className="grid gap-4">
            <input
              name="occupation"
              placeholder="Occupation"
              onChange={handleChange}
              className="input"
            />
            {error.occupation && <p className="text-red-500 text-sm">{error.occupation}</p>}

            <input
              name="organization"
              placeholder="Organization"
              onChange={handleChange}
              className="input"
            />
            <input
              name="designation"
              placeholder="Designation"
              onChange={handleChange}
              className="input"
            />
          </div>
        );

      case 5:
        return (
          <div className="grid gap-4">
            <input
              name="bookletType"
              placeholder="Booklet Type"
              onChange={handleChange}
              className="input"
            />
            {error.bookletType && <p className="text-red-500 text-sm">{error.bookletType}</p>}

            <label>Aadhaar Card:</label>
            <input type="file" name="aadhaarCard" onChange={handleChange} className="input" />
            {error.aadhaarCard && <p className="text-red-500 text-sm">{error.aadhaarCard}</p>}

            <label>DOB Proof:</label>
            <input type="file" name="dobProof" onChange={handleChange} className="input" />
            {error.dobProof && <p className="text-red-500 text-sm">{error.dobProof}</p>}

            <label>Address Proof:</label>
            <input type="file" name="addressProof" onChange={handleChange} className="input" />
            {error.addressProof && <p className="text-red-500 text-sm">{error.addressProof}</p>}

            <label>Photo:</label>
            <input type="file" name="photo" onChange={handleChange} className="input" />
            {error.photo && <p className="text-red-500 text-sm">{error.photo}</p>}

            <label>Signature:</label>
            <input type="file" name="signature" onChange={handleChange} className="input" />
            {error.signature && <p className="text-red-500 text-sm">{error.signature}</p>}

            <label>Other Documents:</label>
            <input type="file" name="others" multiple onChange={handleChange} className="input" />
          </div>
        );

      case 6:
        return (
          <div className="grid gap-4">
            <label>Do you agree to the declaration?</label>
            <select
              name="declarationAgreed"
              onChange={handleChange}
              className="input"
              defaultValue=""
            >
              <option value="" disabled>
                Select
              </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {error.declarationAgreed && (
              <p className="text-red-500 text-sm">{error.declarationAgreed}</p>
            )}
          </div>
        );

      case 7:
        return (
          <div className="grid gap-2 text-sm max-h-[60vh] overflow-auto">
            {Object.entries(formData).map(([key, value]) => (
              <div key={key} className="border-b py-1">
                <strong>{key}: </strong>
                {value instanceof File
                  ? value.name
                  : Array.isArray(value)
                  ? [...value].map((file) => file.name).join(", ")
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
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${pass})` }}
    >
      {/* Notification */}
      {notification.message && (
        <div
          className={`fixed top-4 right-4 px-4 py-3 rounded shadow-md text-white cursor-pointer z-50 ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
          role="alert"
          onClick={() => setNotification({ message: "", type: "" })}
        >
          {notification.message}
        </div>
      )}

      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Passport Application</h2>

        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
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
