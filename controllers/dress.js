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
// for a specific dress.
exports.dress_detail = function (req, res) {
    res.send('NOT IMPLEMENTED: dress detail: ' + req.params.id);
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
// Handle dress delete form on DELETE.
exports.dress_delete = function (req, res) {
    res.send('NOT IMPLEMENTED: dress delete DELETE ' + req.params.id);
};
// Handle dress update form on PUT.
exports.dress_update_put = function (req, res) {
    res.send('NOT IMPLEMENTED: dress update PUT' + req.params.id);
};