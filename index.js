import express from "express";
import cors from "cors";
import morgan from "morgan";
import jwt from "jsonwebtoken";
import colors from "colors";
import fetch from "node-fetch";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';
dotenv.config();

const app = express();
console.log(process.env.VIDEOSDK_API_KEY);
// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

const port = process.env.PORT || 5000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7le8ogp.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
	try {
    const usersCollection = client.db('remote-talks').collection('users');

		app.get("/", (req, res) => {
			res.send("Remote Talks is running on 🚀🚀🚀🚀");
		});

    app.post('/users', async (req, res) => {
      const body = req.body;
      const result = await usersCollection.insertOne(body);
      res.send(result);
  });











		/* Video SDK */
		app.get("/get-token", (req, res) => {
			const API_KEY = process.env.VIDEOSDK_API_KEY;
			const SECRET_KEY = process.env.VIDEOSDK_SECRET_KEY;

			const options = { expiresIn: "10m", algorithm: "HS256" };

			const payload = {
				apikey: API_KEY,
				permissions: ["allow_join", "allow_mod"], // also accepts "ask_join"
			};

			const token = jwt.sign(payload, SECRET_KEY, options);
			res.json({ token });
			console.log(token);
		});

		//
		app.post("/create-meeting", (req, res) => {
			const { token, region } = req.body;
			const url = `${process.env.VIDEOSDK_API_ENDPOINT}/api/meetings`;
			const options = {
				method: "POST",
				headers: { Authorization: token, "Content-Type": "application/json" },
				body: JSON.stringify({ region }),
			};

			fetch(url, options)
				.then((response) => response.json())
				.then((result) => res.json(result)) // result will contain meetingId
				.catch((error) => console.error("error", error));
		});

		//
		app.post("/validate-meeting/:meetingId", (req, res) => {
			const token = req.body.token;
			const meetingId = req.params.meetingId;

			const url = `${process.env.VIDEOSDK_API_ENDPOINT}/api/meetings/${meetingId}`;

			const options = {
				method: "POST",
				headers: { Authorization: token },
			};

			fetch(url, options)
				.then((response) => response.json())
				.then((result) => res.json(result)) // result will contain meetingId
				.catch((error) => console.error("error", error));
		});
	} finally {
	}
}
run().catch(console.log);

app.listen(port, () => {
	console.log(`Remote Talks is running on port: ${port}`.red.bold.underline);
});
