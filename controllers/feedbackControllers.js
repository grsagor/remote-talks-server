import { client } from "../config/db.js";
const feedbackCollection = client.db("remoteTalks").collection("feedbacks");

// @desc Registered User
// @route POST /api/feedback
// @access Public

export const createFeedBack = async (req, res) => {
	const feedback = req.body;
	const result = await feedbackCollection.insertOne({
		...feedback,
		createdAt: Date.now(),
	});
	res.send(result);
};

export const getFeedBack = async (req, res) => {
	const cursor = feedbackCollection.find(
		{},
		{
			sort: { createdAt: -1 },
		}
	);
	const data = await cursor.toArray();
	res.send(data);
};
