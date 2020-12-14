const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const config = require("../config/dev");
//Authentication middleware
//check access token in authorization headers

//verify access token again auth0 json web key set
exports.checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 10,
    jwksUri: "https://dev-x1m45sxr.us.auth0.com/.well-known/jwks.json",
  }),

  audience: "https://dev-x1m45sxr.us.auth0.com/api/v2/",
  issuer: "https://dev-x1m45sxr.us.auth0.com/",
  algorithms: ["RS256"],
});

exports.checkRole = (role) => (req, res, next) => {
  const user = req.user;
  if (user && user[config.AUTH0_NAMESPACE + "/roles"].includes(role)) {
    next();
  } else {
    return status(401).send("You are not authorized to access the resource");
  }
};
