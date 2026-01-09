import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

import cloudinary from "../../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "gadgets",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage });

// const upload = multer({ dest: "uploads/" });
// we can also give our local disk storage in multer....

export default upload;
