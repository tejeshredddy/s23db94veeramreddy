var express = require("express");
const dress_controllers = require("../controllers/dress");
var router = express.Router();
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