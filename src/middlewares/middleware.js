exports.globalMiddleware = (req, res, next) => {
    res.locals.errors = req.flash('errors')
    res.locals.sucess = req.flash('sucess')
    next()
}

exports.checksForError = (req, res, next) => {
    if(err){
        return res.render('404')
    }
}