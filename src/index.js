const express = require("express");
const cors = require('cors')
const morgan = require("morgan");
const compression = require('compression');
const configuration = require("./config");
const errorHandler = require("./handlers/error.handler")
 // App
const app = express();

// Cors
app.use(cors())

// settings
app.set("port", configuration.PORT);

// compression
app.use(compression());
// middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(errorHandler);

// routes
app.use(require("./routes"));
app.use("/api/items", require("./routes/items"));

// starting the server
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
