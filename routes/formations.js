const express = require('express');
const router = express.Router();
const formationModel = require("./../models/Formation");
const fileUploader = require("../config/cloudinary");
const protectAdminRoute = require("../middlewares/protectAdminRoute")
const loginStatus = require("./../middlewares/exposeLoginStatus")

// const protectAdminRoute = require("./../middlewares/exposeLoginStatus")

// const multer = require('multer');
// const cloudinary = require('cloudinary').v2;
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//         folder: 'sneaker-pictures',
//         format: async (req, file) => 'png', // supports promises as well
//         public_id: (req, file) => 'computed-filename-using-request',
//     },
// });
// const parser = multer({ storage: storage });




  router.get('/form-formation-add', loginStatus,function(req, res, next) {
    res.render('form-formation-add', { title: 'Formations' });
  });



/************************************************/
/******       create formations          ********/
/************************************************/

/* GET manage-formation page */
router.get(['/formation-add','/manage-formations'], loginStatus, function(req, res, next) {
    console.log("inside 'req.body'", req.body)
    formationModel
    .find()
    .then((dbRres) => {
    res.render('manage-formations', { formations: dbRres });
  })
  .catch(next);
  });
  
  /* POST du formulaire */
  
  router.post("/formation-add", fileUploader.single("image"),(req,res,next) => {
      console.log("is req.body going?",req.body)
      const formation = { ...req.body };
      console.log("inside formation?", formation)

    if (req.file) {
        formation.image = req.file.secure_url
    }else console.log("no file");
    formationModel.create(formation)
    .then((dbRres) => {
      console.log("produit ajouté en bdd >>> ", dbRres);
      res.redirect("/manage-formations")
    })
    .catch(next);
  });

  /*Add*/

// router.get("/prod-add",  (req, res, next) => {
//     tagModel 
//          .find()
//          .then((dbRes) => {
//            res.render("products_add",  { tags : dbRes }
//            ); 
//          })
//          .catch(next);
//      });
   
  
//   router.post("/prod-add", uploader.single("image"), (req, res,next) => {
//       const sneaker = {...req.body};
//       if (req.file) {
//           sneaker.image = req.file.secure_url};
//       sneakerModel.create(sneaker)
//         .then((dbRes) => {
//           console.log("produit ajouté en bdd >>> ", dbRes);
//           res.redirect("/prod-add");})
//         .catch(next);
//       });

/************************************************/
/******       delete formations          ********/
/************************************************/

router.get("/form-delete/:id",loginStatus, (req, res, next) => {
    formationModel
        .findByIdAndDelete(req.params.id)
        .then((dbRes) => res.redirect("/manage-formations"))
        .catch(next);
});


/************************************************/
/******       edit formations            ********/
/************************************************/

router.get("/form-edit/:id", loginStatus,(req, res, next) => {
    console.log("whats in req.params.id", req.params.id)
    formationModel
        .findById(req.params.id)
        .then((dbRes) => res.render("form-formation-edit", {
            formations: dbRes
        }))
        .catch(next)
});

router.post("/form-edit/:id", fileUploader.single("image"), (req, res, next) => {
    console.log("did i get in here")
    const formation = {
        ...req.body
    };
    if (req.file) {
        formation.image = req.file.secure_url
    };
    formationModel
        .findByIdAndUpdate(req.params.id, formation, {new: true})
        .then((dbRes) => res.redirect("/manage-formations"))
        .catch(next)
});


/*one formation*/

router.get("/one-formation/:id", fileUploader.single("image"), (req, res) => {
    const formation = {
      ...req.body
    };
    if (req.file) {
      formation.image = req.file.secure_url
    };
    formationModel
      .findById(req.params.id)
      .then((dbRes) => {
        res.render("one-formation", {
          formations: dbRes
        });
      })
      .catch(dbErr => console.error(dbErr));
  });
  

module.exports = router;
