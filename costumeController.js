var Costume = require('../models/costume');
// List of all Costumes
exports.costume_list = function(req, res) {
res.send('NOT IMPLEMENTED: Costume list');
};
// for a specific Costume.
exports.costume_detail = function(req, res) {
res.send('NOT IMPLEMENTED: Costume detail: ' + req.params.id);
};
// Handle Costume create on POST.
exports.costume_create_post = function(req, res) {
res.send('NOT IMPLEMENTED: Costume create POST');
};
// Handle Costume delete form on DELETE.
exports.costume_delete = function(req, res) {
res.send('NOT IMPLEMENTED: Costume delete DELETE ' + req.params.id);
};
// Handle Costume update form on PUT.
exports.costume_update_put = function(req, res) {
res.send('NOT IMPLEMENTED: Costume update PUT' + req.params.id);
};