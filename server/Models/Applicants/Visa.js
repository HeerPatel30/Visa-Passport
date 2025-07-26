import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema({
  url: { type: String,  },
  uploadedAt: { type: Date, default: Date.now }
});

const VisaApplicationSchema = new mongoose.Schema({
  visano: { type: String },
  // Personal Info
  fullName: { type: String },
  dateOfBirth: { type: Date },
  gender: { type: String },
  nationality: { type: String },
  email: { type: String },
  phone: { type: String },
  address: { type: String },

  // Passport Details
  passportNumber: { type: String },
  passportIssueDate: { type: Date },
  passportExpiryDate: { type: Date },

  // Visa Info
  visaType: {
    type: Number, // 1 for Tourist, 2 for Business, 3 for Student, 4 for work  , 5 for travel
  },
  travelPurpose: { type: String },
  travelFromDate: { type: Date },
  travelToDate: { type: Date },
  destinationCountry: { type: String },

  // Uploaded Documents
  passportCopy: [{ type: DocumentSchema }],
  photo: { type: DocumentSchema },
  applicationForm: { type: DocumentSchema },

  flightBooking: DocumentSchema,
  hotelBooking: DocumentSchema,
  travelInsurance: DocumentSchema,
  financialProof: DocumentSchema,
  invitationLetter: DocumentSchema,
  employmentLetter: DocumentSchema,
  studentLetter: DocumentSchema,
  idProof: DocumentSchema,
  coverLetter: DocumentSchema,
  visaFeeReceipt: DocumentSchema,
  previousVisa: DocumentSchema,

  // Application Meta
  status: {
    type: Number,
    default: 0, // 0 for pending, 1 for approved, 2 for rejected 3 for under review
  },
  submittedAt: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now },
});

export default mongoose.model("VisaApplication", VisaApplicationSchema);
