const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Budget Planner API",
    version: "1.0.0",
    description: "API documentation for the Budget Planner App",
  },
  servers: [
    {
      url: "http://localhost:3000", // update if different
      description: "Local server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"], // update path if routes are elsewhere
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
