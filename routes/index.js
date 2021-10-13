var express = require("express");
var router = express.Router();

var userName = ["Suhail", "Muhammed"];
var password = ["123456", "123"];
var signOut = false;
var logsuccess = false;

/* GET home page. */
router.get("/", verifyLogin, function (req, res, next) {
  user = req.session.userid;
  res.render("homepage", { user, logsuccess });
  logsuccess = false;
});
function verifyLogin(req, res, next) {
  res.header(
    "Cache-Control",
    "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
  );
  if (req.session.loggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
}

/* post login page. */
router.post("/submit", formVarify, function (req, res, next) {
  logsuccess = true;
  console.log("token approved");
  res.redirect("/");
});
function formVarify(req, res, next) {
  for (i = 0; i < userName.length; i++) {
    if (req.body.UserName === userName[i] && req.body.pw === password[i]) {
      req.session.loggedIn = true;
    }
  }
  if (req.session.loggedIn) {
    req.session.userid = req.body.UserName;
    next();
  } else {
    console.log("token not approved");
    req.session.loginErr = true;
    res.redirect("login");
  }
}

/* Get login page. */
router.get("/login", function (req, res, next) {
  res.header(
    "Cache-Control",
    "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
  );

  if (!req.session.loggedIn) {
    res.render("loginpage", {
      LoginErr: req.session.loginErr,
      logout: signOut,
    });
    req.session.loginErr = false;
    signOut = false;
  } else {
    res.redirect("/");
  }
});

/* get logout page. */
router.get("/logout", function (req, res, next) {
  req.session.destroy();
  signOut = true;
  res.redirect("/login");
});

/* get list page. */
router.get("/list", verifyLogin, function (req, res, next) {
  const persons = {
    firstName: "John",
    lastName: "Doe",
    age: 50,
    eyeColor: "blue",
  };
  res.render("list", { persons, user });
});

/* get card page. */
router.get("/card", verifyLogin, function (req, res, next) {
  const personsarr = {
    person1: {
      img: "/images/batman.jpg",
      name: "Dark Knigth",
      sname: "Batman",
      year: 2008,
      color: "black",
    },
    person2: {
      img: "/images/inception.jpg",
      name: "Chris",
      sname: "Nolan",
      year: 2010,
      color: "red",
    },
    person3: {
      img: "/images/tenet.jpg",
      name: "Tenet",
      sname: "Doe",
      year: 2020,
      color: "blue",
    },
  };

  res.render("card", { personsarr, user });
});
/* get table page. */
router.get("/table", verifyLogin, function (req, res, next) {
  const personsarr = [
    {
      firstName: "Dark Knight",
      lastName: "Batman",
      age: 2008,
      eyeColor: "black",
    },
    { firstName: "Chris", lastName: "Nolan", age: 2010, eyeColor: "red" },
    { firstName: "Tenet", lastName: "Doe", age: 2020, eyeColor: "green" },
  ];

  res.render("table", { personsarr, user });
});

module.exports = router;

module.exports = router;
