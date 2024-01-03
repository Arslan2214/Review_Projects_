var express = require("express");
var router = express.Router();
const userModel = require("./users");
const passport = require("passport");
const localStategy = require("passport-local");

passport.use(new localStategy(userModel.authenticate()));

// Side Functions
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
};

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

router.get("/register", function (req, res, next) {
  res.render("register");
});

router.get("/profile", isLoggedIn, function (req, res, next) {
  res.render("profile");
});

router.post("/register", function (req, res, next) {
  const { fullName, username, email, password } = req.body;

  const newUser = new userModel({ fullName, username, email });
  userModel.register(newUser, password).then(() => {
    passport.authenticate("local")(req, res, () => {
      res.redirect("/profile");
    });
  });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/",
  }),
  function (req, res, next) {}
);

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
