require("dotenv").config();

//test3
// const multer = require('multer');
// const cloudinary = require('cloudinary').v2;
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const storage = new CloudinaryStorage({
  //   cloudinary: cloudinary,
  //   params: {
    //     folder: 'sneaker-pictures',
    //     format: async (req, file) => 'png', // supports promises as well
    //     public_id: (req, file) => 'computed-filename-using-request',
    //   },
    // });
    
    // const parser = multer({ storage: storage });
    //dependencies
    const createError = require('http-errors');
    const express = require('express');
    const path = require('path');
    const cookieParser = require('cookie-parser');
    const flash = require("connect-flash");
    const logger = require('morgan');
    const hbs = require("hbs");
    const mongoose = require("mongoose");
    const session = require("express-session");
    const MongoStore = require("connect-mongo")(session);
    const app = express();
    const dev_mode = false;

    
    require("./config/mongodb"); // database initial setup
    require("./helpers/hbs"); // utils for hbs templates
//test2
// app.post('/upload', parser.single('image'), function (req, res) {
//   res.json(req.file);
// });

//test

// import 'bootstrap/dist/css/bootstrap.css';
// import './index.css';
// import 'bootstrap/dist/js/popper.min.js';
//  const jquery = require('jquery');
//  const boots = require('bootstrap');


// app.use(function(req, res, next) {
//   if (req.headers['content-type'] === 'application/json;') {
//     req.headers['content-type'] = 'application/json';
//   }
//   next();
// });


// config logger (pour debug)
app.use(logger("dev"));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

//initial config
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
hbs.registerPartials(__dirname + "/views/partials");

//SESSION SETUP
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 60000 }, // in millisec
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60, // 1 day
    }),
    saveUninitialized: true,
    resave: true,
  })
);

// below, site_url is used in partials/shop_head.hbs to perform ajax request (var instead of hardcoded)
app.locals.site_url = process.env.SITE_URL;

app.use(flash());

// CUSTOM MIDDLEWARES

if (dev_mode === true) {
  app.use(require("./middlewares/devMode")); // active le mode dev pour éviter les deconnexions
  app.use(require("./middlewares/debugSessionInfos")); // affiche le contenu de la session
}
app.use(require("./middlewares/exposeLoginStatus")); // expose le status de connexion aux templates
app.use(require("./middlewares/exposeFlashMessage")); // affiche les messages dans le template



//router
app.use(require("./routes/messages"));
app.use(require("./routes/formations"));
app.use(require("./routes/auth"));
app.use(require("./routes/users"));
app.use(require("./routes/index"));




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
