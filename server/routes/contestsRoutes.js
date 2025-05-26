import express from "express"
import { submitEntry, voteOnEntry } from "../controllers/contestsControllers.js";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

router.post('/submit',upload.single('image'), submitEntry);
router.post('/vote', voteOnEntry);

export default router;

