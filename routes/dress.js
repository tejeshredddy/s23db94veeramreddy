var express = require("express");
const dress_controllers = require("../controllers/dress");
var router = express.Router();
// A little function to check if we have an authorized user and continue on
//or
// redirect to login.
const secured = (req, res, next) => {
if (req.user){
return next();
}
res.redirect("/login");
}
// GET dress
router.get("/", dress_controllers.dress_view_all_Page);
module.exports = router;
// GET request for one dress.
router.get('/dress/:id', dress_controllers.dress_detail);
//put request for one dress
router.put('/dress/:id', dress_controllers.dress_update_put);
//delete request for one dress
router.delete('/dress/:id', dress_controllers.dress_delete);
// GET detail dress page//
router.get('/detail', dress_controllers.dress_view_one_Page);
/* GET create dress page */
router.get('/create', secured, dress_controllers.dress_create_Page);
// GET create update page //
router.get('/update', secured, dress_controllers.dress_update_Page);
// GET delete costume page //
router.get('/delete', secured, dress_controllers.dress_delete_Page);


