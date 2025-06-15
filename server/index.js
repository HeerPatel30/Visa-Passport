import express from "express";
import dotenv from "dotenv";
import ConnectDB from "./Database/connect.js";
import AdminRouter from "./Routes/Admin/admin.router.js";
import passportRouter from "./Routes/Passport/passport.router.js";
import cors from "cors";

dotenv.config();

const app = express();

// Enable CORS early, before routes
app.use(
  cors({
    origin:[ "http://localhost:5173" ,"https://visa-passport.vercel.app/" ], 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    exposedHeaders: ["token", "uid", "unqkey"],
  })
);

// Body parsers must be before routes too
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Now mount your routes
app.use("/", AdminRouter);
app.use("/", passportRouter);

// Connect to DB and start server
ConnectDB()
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to DB", error);
  });
