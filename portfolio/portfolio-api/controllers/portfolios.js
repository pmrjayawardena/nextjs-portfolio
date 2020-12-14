const mongoose = require("mongoose");
const { use } = require("../routes/portfolios");
const Portfolio = mongoose.model("Portfolio");

exports.getPortfolios = async (req, res) => {
  const portfolios = await Portfolio.find({});

  return res.json(portfolios);
};

exports.getPortfoliosById = async (req, res) => {
  try {
    const id = req.params.id;
    const portfolio = await Portfolio.findById(id);

    return res.json(portfolio);
  } catch (error) {
    return res.status(422).json({ message: "Something went wrong" });
  }
};

exports.createPortfolio = async (req, res) => {
  const PortfolioData = req.body;
  const userId = req.user.sub;
  const portfolio = await new Portfolio(PortfolioData);
  portfolio.userId = userId;
  try {
    const newPortfolio = await portfolio.save();
    return res.json(newPortfolio);
  } catch (error) {
    return res.status(422).json({ message: "Something went wrong" });
  }
};
exports.updatePortfolio = async (req, res) => {
  const PortfolioData = req.body;
  const id = req.params.id;

  try {
    const updatedPortfolio = await Portfolio.findOneAndUpdate(
      { _id: id },
      PortfolioData,
      {
        new: true,
        runValidators: true,
      }
    );
    return res.json(updatedPortfolio);
  } catch (error) {
    return res.status(422).json({ message: "Something went wrong" });
  }
};
exports.deletePortfolio = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedPortfolio = await Portfolio.findOneAndRemove({ _id: id });
    return res.json(deletedPortfolio);
  } catch (error) {
    return res
      .status(422)
      .json({ message: "Something went wrong while deleting the post" });
  }
};
