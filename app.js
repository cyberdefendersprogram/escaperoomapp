const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const entriesRoutes = require("./routes/entries");
const morgan = require("morgan");
const cors = require("cors");
const PORT = process.env.PORT || 5000;

app.use(cors);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use("/entries", entriesRoutes);

app.use(function(req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

if (app.get("env") === "development") {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err
    });
  });
}

app.listen(PORT, function() {
  console.log("Listening on ${PORT}!");
});

