const config = require("../config/dev");
const mongoose = require("mongoose");
const fakeDB = require("./FakeDB");
const colors = require("colors");
mongoose.connect(
  config.DB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  async (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(colors.red("> Starting populating DB..."));
      await fakeDB.populate();
      await mongoose.connection.close();
      console.log(colors.red.underline("> DB has been populated..."));
    }
  }
);
