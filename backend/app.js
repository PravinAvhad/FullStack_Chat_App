const express = require("express");
const chatRoute = require("./routes/chatRoute");
const userRoute = require("./routes/userRoute");
const cookieParser = require("cookie-parser");
const bodyparser = require("body-parser");
const cors = require("cors");
const { notFound, errorHandler } = require("./middelware/errorMiddleware");
const fileupload = require("express-fileupload");

const app = express();
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(fileupload());

app.use("/api/v1", chatRoute);
app.use("/api/v2", userRoute);

app.get("/", (req, res) => {
    res.status(200).json({
        message: "API is Running"
    })
})

//Not Found
app.use(notFound);
//ErrorHandler
app.use(errorHandler);

module.exports = app;
