const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const routes = require("./routes/api/books");

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here
app.use("/api/books", routes);


//Connect Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/readingRailroad", {useNewUrlParser: true})
  .then(() => console.log("What even is Mongo, bro?"))
  .catch(err => console.log(err))


// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});

// API KEY GOOGLE
// AIzaSyBuGNAny4T2kL5cAJWFJCjfoW31BKPoLSI
