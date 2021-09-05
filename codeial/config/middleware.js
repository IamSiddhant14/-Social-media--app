module.exports.setFlash = function(req,res,next){
//we would be setting up the flash message in the Locals which could be excced in the views/template
    res.locals.flash = {
        'success' : req.flash('success'),
        'error' : req.flash('error')
    }

    next();  


}