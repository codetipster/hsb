const mongoose = require("mongoose"); //for interaction with the database
const { app } = require("./app");
require("dotenv").config();

// Setting the mongoose options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const PORT = process.env.PORT || 3000;

const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGODB_REMOTE_URL;
mongoose.set('strictQuery', true); // ensures only valid properties for a models schema are used in queries
mongoose
  .connect(MONGODB_URI, options)
  .then(() => {
    console.warn("Connected successfully");
  })
  .catch((err) => {
    throw "Error occured : " + err;
  });



app.listen(PORT, () => {
  console.log(`Server ready on http://localhost:${PORT}`);
});
