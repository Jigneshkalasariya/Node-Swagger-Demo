const express = require("express");
const cors = require("cors");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const config = require('./src/config');

require("./src/db/mongoose");

const app = express();
const port = config.PORT || 3000;

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.1',
    info: {
      title: "HackerNews Custom API",
      version: "1.0.0",
      description: "Prototype made with Hackernews API",

      servers: ["http://localhost:3000"],
    },
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization' 
        }
      }
    },
  },
  apis: ["./src/routes/*.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api/hackernews", require("./src/routes/hackerNews.route"));
app.use("/api/auth", require("./src/routes/auth.route"));

app.listen(port, () => {
  console.log("Server running on port " + port);
});
