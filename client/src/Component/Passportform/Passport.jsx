import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import pass from "../../assets/pass.jpg";
import { useNavigate } from "react-router-dom";

export default function PassportForm() {
  const navigate = useNavigate();

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
  const [notification, setNotification] = useState({ message: "", type: "" });

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    if (type === "file") {
      if (e.target.multiple) setFormData({ ...formData, [name]: files });
      else setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateStep = () => {
    let stepErrors = {};
    switch (step) {
      case 0:
        if (!formData.firstname) stepErrors.firstname = "First name is required";
        if (!formData.lastname) stepErrors.lastname = "Last name is required";
        if (!formData.gender) stepErrors.gender = "Gender is required";
        if (!formData.dob) stepErrors.dob = "Date of birth is required";
        if (!formData.placeofbirth) stepErrors.placeofbirth = "Place of birth is required";
        break;

      case 1:
        if (!formData.email) stepErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email))
          stepErrors.email = "Email is invalid";
        if (!formData.phone) stepErrors.phone = "Phone number is required";
        else if (!/^\d{10}$/.test(formData.phone))
          stepErrors.phone = "Phone number must be 10 digits";
        break;

      case 2:
        if (!formData.presentAddress)
          stepErrors.presentAddress = "Present address is required";
        if (!formData.permanentAddress)
          stepErrors.permanentAddress = "Permanent address is required";
        if (!formData.city) stepErrors.city = "City is required";
        if (!formData.state) stepErrors.state = "State is required";
        if (!formData.country) stepErrors.country = "Country is required";
        break;

      case 3:
        if (!formData.fatherName)
          stepErrors.fatherName = "Father's name is required";
        if (!formData.motherName)
          stepErrors.motherName = "Mother's name is required";
        break;

      case 4:
        if (!formData.occupation)
          stepErrors.occupation = "Occupation is required";
        break;

      case 5:
        if (!formData.bookletType)
          stepErrors.bookletType = "Booklet type is required";
        if (!formData.aadhaarCard)
          stepErrors.aadhaarCard = "Aadhaar card is required";
        if (!formData.dobProof)
          stepErrors.dobProof = "DOB proof is required";
        if (!formData.addressProof)
          stepErrors.addressProof = "Address proof is required";
        if (!formData.photo) stepErrors.photo = "Photo is required";
        if (!formData.signature)
          stepErrors.signature = "Signature is required";
        break;

      case 6:
        if (!formData.declarationAgreed || formData.declarationAgreed !== "Yes")
          stepErrors.declarationAgreed = "You must agree to the declaration";
        break;

      default:
        break;
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const nextStep = () =>
    validateStep() && setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = async () => {
    if (!validateStep()) return;

    const form = new FormData();
    for (const key in formData) {
      const value = formData[key];
      if (!(value instanceof File) && !Array.isArray(value))
        form.append(key, value);
    }

    ["aadhaarCard", "dobProof", "addressProof", "photo", "signature"].forEach(
      (f) => {
        if (formData[f]) form.append(f, formData[f]);
      }
    );

    if (formData.others && formData.others.length > 0) {
      Array.from(formData.others).forEach((file) =>
        form.append("others", file)
      );
    }

    try {
      const response = await fetch("https://visa-passport.onrender.com/passport/add", {
        method: "POST",
        body: form,
        credentials: "include",
      });

      const result = await response.json();
      if (result.status === 200) {
        setNotification({
          message: result.message || "Application Submitted!",
          type: "success",
        });
        setFormData({});
        setStep(0);

        setTimeout(() => navigate("/"), 1200);
      } else {
        setNotification({
          message: result.message || "Failed to submit.",
          type: "error",
        });
      }
    } catch {
      setNotification({
        message: "Something went wrong!",
        type: "error",
      });
    }
  };

  useEffect(() => {
    if (notification.message) {
      const t = setTimeout(
        () => setNotification({ message: "", type: "" }),
        3000
      );
      return () => clearTimeout(t);
    }
  }, [notification]);

  const input =
    "w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500";

  const controlled = (name) => formData[name] || "";

  const e = errors;

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="grid gap-4">
            <input name="firstname" value={controlled("firstname")} placeholder="First Name" className={input} onChange={handleChange} />
            {e.firstname && <p className="text-red-500 text-sm">{e.firstname}</p>}

            <input name="middlename" value={controlled("middlename")} placeholder="Middle Name" className={input} onChange={handleChange} />

            <input name="lastname" value={controlled("lastname")} placeholder="Last Name" className={input} onChange={handleChange} />
            {e.lastname && <p className="text-red-500 text-sm">{e.lastname}</p>}

            <select name="gender" value={controlled("gender")} className={input} onChange={handleChange}>
              <option value="" disabled>Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            {e.gender && <p className="text-red-500 text-sm">{e.gender}</p>}

            <input type="date" name="dob" value={controlled("dob")} className={input} onChange={handleChange} />
            {e.dob && <p className="text-red-500 text-sm">{e.dob}</p>}

            <input name="placeofbirth" value={controlled("placeofbirth")} placeholder="Place of Birth" className={input} onChange={handleChange} />
            {e.placeofbirth && <p className="text-red-500 text-sm">{e.placeofbirth}</p>}
          </div>
        );

      case 1:
        return (
          <div className="grid gap-4">
            <input name="email" value={controlled("email")} placeholder="Email" className={input} onChange={handleChange} />
            {e.email && <p className="text-red-500 text-sm">{e.email}</p>}

            <input name="phone" value={controlled("phone")} placeholder="Phone Number" className={input} onChange={handleChange} />
            {e.phone && <p className="text-red-500 text-sm">{e.phone}</p>}

            <input name="alternatePhone" value={controlled("alternatePhone")} placeholder="Alternate Phone" className={input} onChange={handleChange} />
          </div>
        );

      case 2:
        return (
          <div className="grid gap-4">
            <input name="presentAddress" value={controlled("presentAddress")} placeholder="Present Address" className={input} onChange={handleChange} />
            {e.presentAddress && <p className="text-red-500 text-sm">{e.presentAddress}</p>}

            <input name="permanentAddress" value={controlled("permanentAddress")} placeholder="Permanent Address" className={input} onChange={handleChange} />
            {e.permanentAddress && <p className="text-red-500 text-sm">{e.permanentAddress}</p>}

            <input name="city" value={controlled("city")} placeholder="City" className={input} onChange={handleChange} />
            {e.city && <p className="text-red-500 text-sm">{e.city}</p>}

            <input name="state" value={controlled("state")} placeholder="State" className={input} onChange={handleChange} />
            {e.state && <p className="text-red-500 text-sm">{e.state}</p>}

            <input name="country" value={controlled("country")} placeholder="Country" className={input} onChange={handleChange} />
            {e.country && <p className="text-red-500 text-sm">{e.country}</p>}
          </div>
        );

      case 3:
        return (
          <div className="grid gap-4">
            <input name="fatherName" value={controlled("fatherName")} placeholder="Father's Name" className={input} onChange={handleChange} />
            {e.fatherName && <p className="text-red-500 text-sm">{e.fatherName}</p>}

            <input name="motherName" value={controlled("motherName")} placeholder="Mother's Name" className={input} onChange={handleChange} />
            {e.motherName && <p className="text-red-500 text-sm">{e.motherName}</p>}

            <input name="spouseName" value={controlled("spouseName")} placeholder="Spouse Name (optional)" className={input} onChange={handleChange} />
          </div>
        );

      case 4:
        return (
          <div className="grid gap-4">
            <input name="occupation" value={controlled("occupation")} placeholder="Occupation" className={input} onChange={handleChange} />
            {e.occupation && <p className="text-red-500 text-sm">{e.occupation}</p>}

            <input name="organization" value={controlled("organization")} placeholder="Organization" className={input} onChange={handleChange} />
            <input name="designation" value={controlled("designation")} placeholder="Designation" className={input} onChange={handleChange} />
          </div>
        );

      case 5:
        return (
          <div className="grid gap-4">
            <label>Booklet Type</label>
            <select name="bookletType" value={controlled("bookletType")} className={input} onChange={handleChange}>
              <option value="" disabled>Select Booklet Type</option>
              <option value="36 Pages">36 Pages</option>
              <option value="60 Pages">60 Pages</option>
            </select>
            {e.bookletType && <p className="text-red-500 text-sm">{e.bookletType}</p>}

            <label>Aadhaar Card:</label>
            <input type="file" name="aadhaarCard" className={input} onChange={handleChange} />
            {e.aadhaarCard && <p className="text-red-500 text-sm">{e.aadhaarCard}</p>}

            <label>DOB Proof:</label>
            <input type="file" name="dobProof" className={input} onChange={handleChange} />
            {e.dobProof && <p className="text-red-500 text-sm">{e.dobProof}</p>}

            <label>Address Proof:</label>
            <input type="file" name="addressProof" className={input} onChange={handleChange} />
            {e.addressProof && <p className="text-red-500 text-sm">{e.addressProof}</p>}

            <label>Photo:</label>
            <input type="file" name="photo" className={input} onChange={handleChange} />
            {e.photo && <p className="text-red-500 text-sm">{e.photo}</p>}

            <label>Signature:</label>
            <input type="file" name="signature" className={input} onChange={handleChange} />
            {e.signature && <p className="text-red-500 text-sm">{e.signature}</p>}

            <label>Other Documents:</label>
            <input type="file" name="others" multiple className={input} onChange={handleChange} />
          </div>
        );

      case 6:
        return (
          <div className="grid gap-4">
            <label>Do you agree to the declaration?</label>
            <select name="declarationAgreed" value={controlled("declarationAgreed")} className={input} onChange={handleChange}>
              <option value="" disabled>Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {e.declarationAgreed && <p className="text-red-500 text-sm">{e.declarationAgreed}</p>}
          </div>
        );

      case 7:
        return (
          <div className="grid gap-2 text-sm max-h-[60vh] overflow-auto">
            {Object.entries(formData).map(([k, v]) => (
              <div key={k} className="border-b py-1">
                <strong>{k}: </strong>
                {v instanceof File
                  ? v.name
                  : Array.isArray(v)
                  ? [...v].map((f) => f.name).join(", ")
                  : v?.toString()}
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
          className={`fixed top-20 right-6 px-5 py-3 rounded-lg shadow-xl text-white cursor-pointer z-[60]
          ${notification.type === "success" ? "bg-green-500" : "bg-red-500"}`}
        >
          {notification.message}
        </div>
      )}

      <div className="relative z-10 w-full max-w-4xl bg-white/95 rounded-2xl shadow-2xl border p-10">
        <h1 className="text-3xl font-bold text-center">Passport Application</h1>
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

        <div key={step} className="mt-6 max-h-[55vh] overflow-y-auto pr-2">
          {renderStep()}
        </div>

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
