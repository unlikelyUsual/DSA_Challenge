const express = require("express");
const logger = require("./middleware/log");
const rateLimit = require("./middleware/rateLimit");
const urlRoute = require("./routes/url.route");

const app = express();

app.use(logger);
app.use(rateLimit);
app.use(express.json({}));

app.use(urlRoute);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log("Server is running"));
