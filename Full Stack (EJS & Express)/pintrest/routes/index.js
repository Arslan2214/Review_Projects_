var express = require("express");
const userModel = require("../model/userModel");
const passport = require("passport");
const localStrategy = require("passport-local");
const upload = require("./multer.js");
const postModel = require("../model/postModel.js");

var router = express.Router();
passport.use(new localStrategy(userModel.authenticate()));

// ReCheck Functions
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
};
const alreadyLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) return next();
  res.redirect("/profile");
};

/* Main Routings */
router.get("/", alreadyLoggedIn, function (req, res, next) {
  res.render("index");
});

router.get("/login", alreadyLoggedIn, function (req, res, next) {
  res.render("login", { error: req.flash("error") });
});

router.get("/profile", alreadyLoggedIn, async function (req, res) {
  const { username, fullName, email, discription, posts } =
    await userModel.findById(req.session.passport.user._id).populate("posts");
    
    console.log('Posts =>', posts)
    res.render("profile", { username, fullName, email, discription});
});
// Profile Edit
router.get("/editProfile", isLoggedIn, async function (req, res, next) {
  const { username, fullName, email, discription } = await userModel.findById(
    req.user._id
  );
  res.render("editProfile", { username, fullName, email, discription });
});

// TODO: Profile is Not Updated                  |-> Data in DB is not updated <-|
// Updated Profile
router.post("/saveProfile", async function (req, res, next) {
  const newUser = await userModel.findOneAndUpdate(req.session.passport.user._id, {
    ...req.user,
    ...req.body,
  });
  console.log(newUser);
  res.redirect("/profile");
});

router.get("/feed", function (req, res, next) {
  res.render("feed");
});

// File upload route
router.post(
  "/upload",
  isLoggedIn,
  upload.single("file"),
  async function (req, res, next) {
    if (!req.file) {
      return res.status(404).send("No file uploaded");
    }
    const user = await userModel.findOne({
      username: req.session.passport.user,
    });
    const newPost = await postModel.create({
      image: req.file.filename,
      postText: req.body.postText,
      author: user._id,
    });

    user.posts.push(newPost._id);
    await user.save();
    res.redirect("/profile");
  }
);

// Important Functions ------------------ 👇👇👇
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
    failureFlash: true,
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
