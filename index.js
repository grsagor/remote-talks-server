const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { default: fetch } = require("node-fetch");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");
const port = 5000 || process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

async function run(){
    try{
        app.get('/', (req,res) => {
            res.send('Remote Talks is running');
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
    }
    finally{

    }

}
run().catch(console.log);


app.listen(port, () => {
    console.log(`Remote Talks is running on port: ${port}`);
})