const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv"); // Load environment variables from .env file

dotenv.config();

const port = process.env.PORT || 5000;

// Connect to MongoDB using the URI from the .env file
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Your other server setup (middleware, routes, etc.)
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
