var express = require("express");
const userModel = require("../model/userModel");
const passport = require("passport");
var router = express.Router();

const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect("/");
};

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

router.get("/login",function (req, res, next) {
  res.render("login");
});

router.get("/profile", isLoggedIn, function (req, res, next) {
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
    failureRedirect: "/",
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
