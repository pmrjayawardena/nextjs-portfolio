const colors = require("colors");
const express = require("express");
const server = express();
const { connect } = require("./db/index");
const portfolioRoutes = require("./routes/portfolios");
const PORT = parseInt(process.env.PORT, 10) || 3001;
const bodyParser = require("body-parser");
async function runApp() {
  server.use(bodyParser.json());
  await connect();

  server.use("/api/v1", portfolioRoutes);

  server.listen(PORT, (error) => {
    if (error) {
      console.log(error);
    }
    console.log(
      colors.green.underline.bold(`server is up and running on port: ${PORT}`)
    );
  });
}

runApp();
