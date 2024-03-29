exports.globalMiddleware = (req, res, next) => {
    res.locals.errors = req.flash('errors')
    res.locals.sucess = req.flash('sucess')
    res.locals.user = req.session.user
    next()
}

exports.checksForError = (req, res, next) => {
    if(err){
        return res.render('404')
    }
}

exports.loginRequired = (req, res, next) => {
    if(!req.session.user){
        req.session.save(() => res.redirect('/login'))
    }else{
        next()
    }
}