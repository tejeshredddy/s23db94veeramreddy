var dress = require('../models/dress');
// List of all dress
exports.dress_list = async function (req, res) {
    try {
        thedress = await dress.find();
        res.send(thedress);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};
// VIEWS
// Handle a show all view
exports.dress_view_all_Page = async function (req, res) {
    try {
        thedress = await dress.find();
        res.render('dress', { title: 'dress Search Results', results: thedress });
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};
// Handle a show one view with id specified by query
exports.dress_view_one_Page = async function (req, res) {
    console.log("single view for id " + req.query.id)
    try {
        result = await dress.findById( req.query.id)
        res.render('dressdetail',
            { title: 'dress Detail', toShow: result });
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};
// for a specific dress.
// for a specific dress.
exports.dress_detail = async function (req, res) {
    console.log("detail" + req.params.id)
    try {
        result = await dress.findById(req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500)
        res.send(`{"error": document for id ${req.params.id} not found`);
    }
};
// Handle derss create on POST.
// Handle derss create on POST.
exports.dress_create_post = async function (req, res) {
    console.log(req.body)
    let document = new dress();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"dress_type":"goat", "cost":12, "size":"large"}
    document.dress_type = req.body.dress_type;
    document.cost = req.body.cost;
    document.size = req.body.size;
    try {
        let result = await document.save();
        res.send(result);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};
// Handle building the view for creating a dress.
// No body, no in path parameter, no query.
// Does not need to be async
exports.dress_create_Page = function(req, res) {
    console.log("create view")
    try{
    res.render('dresscreate', { title: 'dress Create'});
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
   };

// Handle building the view for updating a dress.
// query provides the id
exports.dress_update_Page = async function(req, res) {
    console.log("update view for item "+req.query.id)
    try{
    let result = await dress.findById(req.query.id)
    res.render('dressupdate', { title: 'dress Update', toShow: result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
    };

// Handle dress delete form on DELETE.
// Handle dress delete on DELETE.
exports.dress_delete = async function (req, res) {
    console.log("delete " + req.params.id)
    try {
        result = await dress.findByIdAndDelete(req.params.id)
        console.log("Removed " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": Error deleting ${err}}`);
    }
};

// Handle a delete one view with id from query
exports.dress_delete_Page = async function(req, res) {
    console.log("Delete view for id " + req.query.id)
    try{
    result = await dress.findById(req.query.id)
    res.render('dressdelete', { title: 'dress Delete', toShow:
   result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
   };


// Handle dress update form on PUT.
exports.dress_update_put = function (req, res) {
    res.send('NOT IMPLEMENTED: dress update PUT' + req.params.id);
};
//Handle dress update form on PUT.
exports.dress_update_put = async function (req, res) {
    console.log(`update on id ${req.params.id} with body
${JSON.stringify(req.body)}`)
    try {
        let toUpdate = await dress.findById(req.params.id)
        // Do updates of properties
        if (req.body.dress_type)
            toUpdate.dress_type = req.body.dress_type;
        if (req.body.cost) toUpdate.cost = req.body.cost;
        if (req.body.size) toUpdate.size = req.body.size;
        let result = await toUpdate.save();
        console.log("Sucess " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": ${err}: Update for id ${req.params.id}
failed`);
    }
};