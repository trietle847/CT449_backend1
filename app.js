const express = require("express");
const cors =  require("cors");
const contactsRouter = require("./app/routes/contact.route");
const ApiError = require("./app/api-eror");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/contacts",contactsRouter);

app.get("/", (req,res) => {
    res.json({message: "Welcome to contact book application."});
});

app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
    res.status(err.statusCode || 5000).json({
        message: err.message || "Internall Server Error",
    });
});

module.exports = app;