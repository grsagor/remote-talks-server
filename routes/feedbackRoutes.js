import express from "express";
import {
	createFeedBack,
	getFeedBack,
} from "../controllers/feedbackControllers.js";

const router = express.Router();
// /api/user/
router.route("/").post(createFeedBack).get(getFeedBack);

export default router;
