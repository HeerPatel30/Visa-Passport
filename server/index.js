import express from "express";
import dotenv from "dotenv";
import ConnectDB from "./Database/connect.js";
import AdminRouter from "./Routes/Admin/admin.router.js";
import passportRouter from "./Routes/Passport/passport.router.js";

dotenv.config();

const app = express();

// Middleware to parse JSON body
app.use(express.json());

// Mount admin routes under /admin
app.use("/", AdminRouter);
app.use("/", passportRouter);

// Connect to database and then start the server
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
