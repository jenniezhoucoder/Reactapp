const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //signup
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    controller.signup
  );

  //signin
  app.post("/api/auth/signin", controller.signin);

  //update password
  app.post("/api/auth/updatepassword", controller.updatePassword);
};
