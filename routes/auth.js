const bcrypt = require("bcrypt");
const express = require("express");
const router = new express.Router();
const userModel = require("../models/User");
const loginStatus = require("./../middlewares/exposeLoginStatus")


/********** SIGNIN ***********/

router.get("/signin", loginStatus,(req, res) => {
  res.render("signin");
});

router.post("/signin",(req, res, next) => {
  console.log("did i catch my user right?", req.body.email, req.body.pasword);
  const userInfos = req.body;
  if (!userInfos.email || !userInfos.password) {
    req.flash("warning", "email and password are required");
    res.redirect("/signin");
  }
  userModel
    .findOne({
      email: userInfos.email
    })
    .then(user => {
      console.log("does this email already exist?", user);
      if (!user) {
       req.flash("error", "incorrect provided details");
        res.redirect("/signin")
      }
      const checkPassword = bcrypt.compareSync(
        userInfos.password,
        user.password
      );
      if (checkPassword === false) {
        req.flash("error", "incorrect provided details");
        res.redirect("/signin");
      }
      const {
        _doc: clone
      } = {
        ...user
      };
      delete clone.password;
      req.session.currentUser = clone;
      res.redirect("/dashboard")
    })
    .catch(next);

});




/*SIGNUP inscription*/
router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/foo", (req, res, next) => {
  if (!req.body.name || !req.body.password || !req.body.email) {
    req.flash("warning", "Merci de remplir tous les champs requis.");
    res.redirect("/signup");
  } else {
  userModel
    .findOne({
      email: req.body.email
    })
    .then((dbRes) => {
      if (dbRes) {
        req.flash("warning", "Désolé, cet email n'est pas disponible.");
        res.redirect("/signup");
      }
    })
    .catch(next);

  const salt = bcrypt.genSaltSync(10);
  const hashed = bcrypt.hashSync(req.body.password, salt);
  req.body.password = hashed;

  userModel
    .create(req.body)
    .then((dbRes) => {
      res.redirect("/signin");
    })
    .catch(next)
  }
});

/*SIGNIN*/


router.post("/signin", (req, res, next) => {
  userModel
    .findOne({
      email: req.body.email
    })
    .then((user) => {
      const checkPassword = bcrypt.compareSync(
        req.body.password,
        user.password
      )
      //  if(checkPassword === false){
      //    console.log("error", "identifiant incorrect")
      // //    res.redirect("/signin");
      //  }
      const {
        _doc: clone
      } = {
        ...user
      };
      delete clone.password;
      req.session.currentUser = clone;
      res.redirect("/products_manage")
    })
    .catch(next);
});

// router.post("/signin", (req, res) =>{
//     res.render("products_add")
// })
router.post("/foo", (req, res) => {
  res.render("signin")
})

/*logout*/
router.get("/logout", (req, res) => {
  req.session.destroy(() => res.redirect("/signin"));
});

module.exports = router;