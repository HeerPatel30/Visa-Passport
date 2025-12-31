
import { v2 as cloudinary} from 'cloudinary';
import brevo from "@getbrevo/brevo"
import dotenv from 'dotenv';
dotenv.config();
export default class Config {
  constructor() {
    this.apiInstance = new brevo.TransactionalEmailsApi();
    this.apiInstance.setApiKey(
      brevo.TransactionalEmailsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY
    );
  }

  Generatekey(length) {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let key = "";
    for (let i = 0; i < length; i++) {
      key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return key;
  }

  cloudinaryConfig() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    return cloudinary;
  }

 generatePassportNumber() {
  const letters = "ABCDEFGHJKLMNOPRSTUVWXYZ";
  const letter = letters[Math.floor(Math.random() * letters.length)];
  const digits = Math.floor(1000000 + Math.random() * 9000000);
  return `${letter}${digits}`;
}

  async sendemail(to, subject, text) {
    try {
      let sendSmtpEmail = new brevo.SendSmtpEmail();
      sendSmtpEmail = {
        to: [{ email: to }],
        sender: { email: "heerpatel879@gmail.com" },
        subject: subject,
        textContent: text,
      };
      const data = await this.apiInstance.sendTransacEmail(sendSmtpEmail);

      return { success: true, messageId: data.messageId };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  generate_random_applicationno(firstname) {
    const timestamp = Date.now();
    const randomNumber = Math.floor(Math.random() * 10000); // Random number between 0 and 9999
    const applicationNo = `${firstname}-${timestamp}-${randomNumber}`;
    return applicationNo;
  }

  async deleteCloudinaryFile(url) {
    try {
      // Split the URL to get the part after `/upload/`
      console.log(url);
      const urlParts = url.split("/upload/");
      if (urlParts.length < 2) {
        console.error("Invalid Cloudinary URL format:", url);
        return;
      }

      // Remove version and file extension
      const pathWithVersion = urlParts[1]; // e.g., "v12345678/folder/file-name.jpg"
      const pathWithoutVersion = pathWithVersion
        .split("/")
        .filter((part) => !part.startsWith("v")) // remove version like v12345678
        .join("/");

      const publicId = pathWithoutVersion.split(".")[0]; // remove extension
      console.log("Public ID for deletion:", publicId);

      await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
      console.log("✅ Successfully deleted from Cloudinary:", publicId);
    } catch (err) {
      console.error("Cloudinary delete error:", err.message);
    }
  }
}