
require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/db");

const custome_routes = require("./routes/router");

// parse JSON bodies
app.use(express.json());

// mangoDB connection
connectDB();


// using routes
app.use("/budget/backend/v1", custome_routes);




const port = process.env.PORT;
const host = process.env.HOST;

app.listen(port,host, () => {
  console.log(`Server is running on port ${port}  ${host}`);
});
