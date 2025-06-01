import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  "Personal Info",
  "Passport Details",
  "Documents & Emergency",
  "Review",
];

export default function PassportApplicationForm() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;
    const val = type === "file" ? files[0] : type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: val });
  };

  const simulateLoad = (callback) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      callback();
    }, 400);
  };

  const next = () => simulateLoad(() => setStep((prev) => Math.min(prev + 1, steps.length - 1)));
  const back = () => simulateLoad(() => setStep((prev) => Math.max(prev - 1, 0)));

  const progress = ((step + 1) / steps.length) * 100;

  const fieldStyle = "w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400";

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <motion.div key={step} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <input name="fullName" onChange={handleChange} placeholder="Full Name" className={fieldStyle} />
            <input name="dob" type="date" onChange={handleChange} className={fieldStyle} />
            <input name="email" placeholder="Email Address" onChange={handleChange} className={fieldStyle} />
            <input name="mobile" placeholder="Mobile Number" onChange={handleChange} className={fieldStyle} />
            <input name="fatherName" placeholder="Father's Name" onChange={handleChange} className={fieldStyle} />
            <input name="motherName" placeholder="Mother's Name" onChange={handleChange} className={fieldStyle} />
            <input name="presentAddress" placeholder="Present Address" onChange={handleChange} className={fieldStyle} />
            <input name="city" placeholder="City" onChange={handleChange} className={fieldStyle} />
          </motion.div>
        );
      case 1:
        return (
          <motion.div key={step} initial={{ x: 300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -300, opacity: 0 }} className="space-y-4">
            <select name="passportType" onChange={handleChange} className={fieldStyle}>
              <option value="">Passport Type</option>
              <option value="fresh">Fresh</option>
              <option value="reissue">Reissue</option>
            </select>
            <select name="bookletType" onChange={handleChange} className={fieldStyle}>
              <option value="">Booklet Type</option>
              <option value="36">36 Pages</option>
              <option value="60">60 Pages</option>
            </select>
          </motion.div>
        );
      case 2:
        return (
          <motion.div key={step} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="space-y-4">
            <input type="file" name="identityProof" onChange={handleChange} className={fieldStyle} />
            <input type="file" name="addressProof" onChange={handleChange} className={fieldStyle} />
            <input name="emergencyName" placeholder="Emergency Contact Name" onChange={handleChange} className={fieldStyle} />
            <input name="emergencyPhone" placeholder="Emergency Phone" onChange={handleChange} className={fieldStyle} />
            <label className="flex items-center space-x-2">
              <input type="checkbox" name="declaration" onChange={handleChange} className="accent-blue-500" />
              <span>I declare that all information is correct.</span>
            </label>
          </motion.div>
        );
      case 3:
        return (
          <motion.div key={step} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-sm max-h-[400px] overflow-auto">
            <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded-xl">
              {JSON.stringify(formData, null, 2)}
            </pre>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 flex items-center justify-center px-4 py-10">
      <div className="relative max-w-5xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row items-center md:items-start">
        <div className="hidden md:block w-1/2 bg-blue-100 p-10">
          <img src="https://cdni.iconscout.com/illustration/premium/thumb/passport-application-7146042-5803749.png" alt="3D sticker" className="w-full h-auto" />
          <h2 className="text-3xl font-bold text-center mt-6 text-gray-700">Apply for Passport</h2>
        </div>

        <div className="w-full md:w-1/2 p-6 md:p-10">
          <div className="mb-6">
            <p className="text-gray-600 font-medium text-sm mb-1">Step {step + 1} of {steps.length}: {steps[step]}</p>
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div className="h-2 bg-blue-600 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
            </div>
          </div>

          <AnimatePresence mode="wait">{loading ? (
            <div className="flex justify-center py-10">
              <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            renderStep()
          )}</AnimatePresence>

          {!loading && (
            <div className="mt-6 flex justify-between">
              {step > 0 && (
                <button onClick={back} className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-6 rounded-xl transition">
                  Back
                </button>
              )}
              {step < steps.length - 1 ? (
                <button onClick={next} className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-xl transition">
                  Next
                </button>
              ) : (
                <button onClick={() => alert("Form submitted!")} className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-xl transition">
                  Submit
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
