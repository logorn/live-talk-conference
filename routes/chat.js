
/*
 * GET users listing.
 */

exports.index = function(req, res){
    res.render('chat', { title: 'Express' });
};
