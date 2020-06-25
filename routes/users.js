const express = require('express');
const router = express.Router();
const userModel = require("./../models/User");
const protectAdminRoute = require("../middlewares/protectAdminRoute")


router.get('/manage-users', function (req, res, next) {
    userModel
        .find()
        .then((dbRres) => {
            res.render('manage-users', {
                users: dbRres
            });
        })
        .catch(next);
});

// router.get('/form-formation-add', protectAdminRoute, function (req, res, next) {
//     res.render('form-formation-add', {
//         title: 'Formations'
//     });
// });



/************************************************/
/******       create formations          ********/
/************************************************/

/* GET manage-formation page */
// router.get(['/formation-add', '/manage-formations'], protectAdminRoute, function (req, res, next) {
//     console.log("inside 'req.body'", req.body)
//     formationModel
//         .find()
//         .then((dbRres) => {
//             res.render('manage-formations', {
//                 formations: dbRres
//             });
//         })
//         .catch(next);
// });

/* POST du formulaire */

// router.post("/formation-add", fileUploader.single("image"), (req, res, next) => {
//     console.log("is req.body going?", req.body)
//     const formation = {
//         ...req.body
//     };
//     console.log("inside formation?", formation)

//     if (req.file) {
//         formation.image = req.file.secure_url
//     } else console.log("no file");
//     formationModel.create(formation)
//         .then((dbRres) => {
//             console.log("produit ajouté en bdd >>> ", dbRres);
//             res.redirect("/manage-formations")
//         })
//         .catch(next);
// });


/************************************************/
/******         delete users             ********/
/************************************************/

router.get("/user-delete/:_id", (req, res, next) => {
    userModel
        .findByIdAndDelete(req.params.id)
        .then((dbRes) => res.redirect("/manage-users"))
        .catch(next);
});


/************************************************/
/******          edit users              ********/
/************************************************/

router.get("/user-edit/:id", (req, res, next) => {
    console.log("whats in req.params.id", req.params.id)
    userModel
        .findById(req.params.id)
        .then((dbRes) => res.render("form-user-edit", {
            user: dbRes
        }))
        .catch(next)
});

router.post("/user-edit/:id", (req, res, next) => {
    console.log("did i get in here")
    const user = {
        ...req.body
    };
    userModel
        .findByIdAndUpdate(req.params.id, user, {
            new: true
        })
        .then((dbRes) => res.redirect("/manage-users"))
        .catch(next)
});


module.exports = router;