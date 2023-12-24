var express = require("express");
const userModel = require("../model/userModel");
const passport = require("passport");
var router = express.Router();

const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
};
const alreadyLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) return next();
  res.redirect("/profile");
};

/* GET home page. */
router.get("/", alreadyLoggedIn, function (req, res, next) {
  res.render("index");
});

router.get("/login", alreadyLoggedIn,function (req, res, next) {
  res.render("login");
});

router.get("/profile", isLoggedIn, function (req, res, next) {
  res.render("profile");
});

router.get("/feed", function (req, res, next) {
  res.render("feed");
});

router.post("/register", (req, res) => {
  const { username, fullName, email } = req.body;
  const newUser = new userModel({ username, fullName, email });

  userModel.register(newUser, req.body.password).then(() => {
    passport.authenticate("local")(req, res, () => res.redirect("/profile"));
  });
}); 

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
  }),
  (req, res) => {}
);

router.get(
  "/logout",
  function (req, res, next) {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  },
  (req, res) => {}
);

module.exports = router;
