var express = require("express");
var router = express.Router();
const userModel = require("./users");
const postModel = require("./post");
const passport = require("passport");
const localStategy = require("passport-local");
const upload = require("./multer");

passport.use(new localStategy(userModel.authenticate()));

// Side Functions
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
};
const alreadyLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect("/profile");
};

/* GET home page. */
router.get("/", alreadyLoggedIn, function (req, res, next) {
  res.render("index");
});

router.get("/register", alreadyLoggedIn, function (req, res, next) {
  res.render("register");
});

router.get("/addpost", isLoggedIn, function (req, res, next) {
  res.render("addpost");
});

router.get("/profile", isLoggedIn,  async (req, res, next) => {
  const user = await userModel.findOne({username: req.user.username}).populate('posts');
  res.render("profile", user);
  
  // res.render("profile", {
  //   username: "username",
  //   fullName: "Full Name",
  // });
});
router.post(
  "/fileUpload",
  isLoggedIn,
  upload.single("avatar"),
  async function (req, res, next) {
    const user = await userModel.findOne({ username: req.user.username });
    user.profileImage = req.file.filename;
    await user.save();
    res.redirect("/profile");
  }
);

router.post(
  "/createpost",
  isLoggedIn,
  upload.single("postImage"),
  async function (req, res, next) {
    const user = await userModel.findOne({ username: req.user.username });
    const newPost = await postModel.create({
      user: user._id,
      postImage: req.file.filename,
      title: req.body.title,
      description: req.body.description,
    });

    user.posts.push(newPost._id);
    await user.save();
    res.redirect("/profile");
  }
);

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
  })
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