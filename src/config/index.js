const enviroment = require("dotenv").config().parsed;
const PORT =
  enviroment.PORT || "4000";
const MELI_API =
  enviroment.MELI_API || "https://api.mercadolibre.com";

const configuration = {
  PORT,
  MELI_API,
};

module.exports = configuration;
