
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require('cors');
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger"); // <-- swagger config file
const connectDB = require("./config/db");

const custome_routes = require("./routes/router");


const corsOptions = {
    origin: 'http://localhost:5174',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Use an array
    allowedHeaders: ['Content-Type', 'Authorization']
};


//  Use CORS middleware with specified options
app.use(cors(corsOptions));

// parse JSON bodies
app.use(express.json());

// mangoDB connection
connectDB();

// using routes
app.use("/budget/backend/v1", custome_routes);
app.use("/budget/backend/v1/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));






const port = process.env.PORT;
const host = process.env.HOST;


app.listen(port,host, () => {
  console.log(`Server is running on port ${port}  ${host}`);
});
