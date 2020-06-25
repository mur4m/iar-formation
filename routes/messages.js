var express = require('express');
var router = express.Router();
const msgModel = require("../models/Message");
const protectAdminRoute = require("../middlewares/protectAdminRoute")




/* GET dashboard page*/

router.get('/dashboard',protectAdminRoute, function(req,res,next){
  res.render('dashboard')
});

/* GET manage-messages page. */
router.get(['/sendmessage', "/manage-messages"], function(req, res, next) {
  msgModel
  .find()
  .then((dbRres) => {
  res.render('manage-messages', { messages: dbRres });
}) 
.catch(next);
});

/* POST du formulaire */

router.post("/sendmessage", (req,res,next) => {
  const message = {...req.body};
  msgModel.create(message)
  .then((dbRres) => {
    console.log("produit ajouté en bdd >>> ", dbRres);
    res.redirect("/sendmessage")
  })
  .catch(next);
});

/* delete */

router.get("/mess-delete/:id", protectAdminRoute,(req, res, next) => {
  msgModel
      .findByIdAndDelete(req.params.id)
      .then((dbRes) => res.redirect("/manage-messages"))
      .catch(next);
});


module.exports = router;
