import mongoose from "mongoose";

const passportSchema = new mongoose.Schema(
  {
    //  code for passport application
    code: { type: String },
    // 1. Personal Information
    firstname: { type: String, required: true },
    middlename: { type: String },
    lastname: { type: String, required: true },
    gender: { type: String, required: true },
    dob: { type: String, required: true },
    placeofbirth: { type: String, required: true },
    nationality: { type: String, default: "Indian" },
    maritalstatus: {
      type: String,
    },

    // 2. Contact Information
    email: { type: String, required: true },
    phone: { type: String, required: true },
    alternatePhone: { type: String },

    // 3. Address Details
    presentAddress: {
      type: String,
    },
    permanentAddress: {
      type: String,
    },
    isSameAddress: { type: String, default: "false" },

    // 4. Family Information
    fatherName: { type: String },
    motherName: { type: String },
    spouseName: { type: String },

    // 5. Employment or Student Details
    occupation: {
      type: String,
    },
    organization: { type: String },
    designation: { type: String },

    // 6. Passport Information
    bookletType: {
      type: String,
      required: true,
    },
    // documents
    documents: {
      aadhaarCard: { type: String },
      dobProof: { type: String },
      addressProof: { type: String },
      photo: { type: String },
      signature: { type: String },
      others: [{ type: String }], // additional documents
    },

    issueDate: { type: Date },
    issuePlace: { type: String },

    // 8. Declaration
    declarationAgreed: { type: String, required: true },
    submissionDate: { type: Date, default: Date.now },

    // 9. Application Status
    status: {
      type: String, // e.g., "Pending", "Approved", "Rejected"
      default: "Pending",
    },

    photo: { type: String },
    signature: { type: String },
  },
  { timestamps: true }
);

const PassportApplication = mongoose.model(
  "PassportApplication",
  passportSchema
);

export default PassportApplication;
