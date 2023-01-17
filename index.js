const express = require("express");
const cors = require("cors");
const colors = require("colors");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const port = 5000 || process.env.PORT;
const app = express();

console.log(process.env.PORT);
// middleware
app.use(cors());
app.use(express.json());
app.use("/api/user/", userRoutes);

app.get("/", async (req, res) => {
	res.send(`server is running on port ${port}`);
});

app.listen(port, () => {
	console.log(`Remote Talks is running on port: ${port}`.red.bold.underline);
});
