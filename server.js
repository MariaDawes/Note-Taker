const express = require("express");
const apiR = require("./routes/apiR");
const htmlR = require("./routes/htmlR");

//#2. Set up the "Express" app and PORT
const app = express();
const PORT = process.env.PORT || 3030;

//#3 app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use("/", htmlR);
app.use("/api", apiR);
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});

