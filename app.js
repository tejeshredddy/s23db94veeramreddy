var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const mongoose = require("mongoose");
var resourceRouter = require('./routes/resource');
var dressRouter = require('./routes/dress');
require('dotenv').config();
const connectionString = process.env.MONGO_CON
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error Connecting to MongoDB: ", err));
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function () { console.log("Connection to DB succeeded") })
passport.use(new LocalStrategy(
  function(username, password, done) {
  Account.findOne({ username: username })
  .then(function (user){
  if (err) { return done(err); }
  if (!user) {
  return done(null, false, { message: 'Incorrect username.' });
  }
  if (!user.validPassword(password)) {
  return done(null, false, { message: 'Incorrect password.' });
  }
  return done(null, user);
  })
  .catch(function(err){
  return done(err)
  })
  })
  )
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var dressRouter = require('./routes/dress');
var boardRouter = require('./routes/board');
var chooseRouter = require("./routes/choose");
var dress = require("./models/dress");
async function recreateDB() {
  // Delete everything
  await dress.deleteMany();
  let instance1 = new dress(
    {
      dress_type: "shirt",
      size: 'medium',
      cost: 10
    });
  let instance2 = new dress(
    {
      dress_type: "tshirt",
      size: 'Small',
      cost: 5
    });
  let instance3 = new dress(
    {
      dress_type: "suit",
      size: 'Medium',
      cost: 50
    });
  instance1.save()
    .then(doc => { console.log("First object saved") })
    .catch(err => { console.error(err) })
  instance2.save()
    .then(doc => { console.log("Second object saved") })
    .catch(err => { console.error(err) })
  instance3.save()
    .then(doc => { console.log("Third object saved") })
    .catch(err => { console.error(err) })
}
let reseed = true;
if (reseed) { recreateDB(); }
var app = express();
// view engine setup
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use('/dress', dressRouter);
app.use('/board', boardRouter);
app.use("/choose", chooseRouter);
app.use("/resource", resourceRouter);
app.use('/dress', dressRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
module.exports = app;
