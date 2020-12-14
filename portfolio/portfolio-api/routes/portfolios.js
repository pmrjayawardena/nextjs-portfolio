const express = require("express");
const router = express.Router();

const { checkJwt, checkRole } = require("../controllers/auth");
const {
  getPortfolios,
  getPortfoliosById,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
} = require("../controllers/portfolios");

router.get("/portfolios", getPortfolios);
router.get("/portfolios/:id", getPortfoliosById);

//create middleware to check for admin rights
router.post("/portfolios", checkJwt, createPortfolio);
router.patch("/portfolios/:id", checkJwt, updatePortfolio);
router.delete("/portfolios/:id", checkJwt, checkRole("admin"), deletePortfolio);

module.exports = router;
