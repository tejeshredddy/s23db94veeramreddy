var express = require('express');
var router = express.Router();
 
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('dress', { title: 'Search Results for dress' });
});
 
module.exports = router;