exports.checkCsrfError = (err, req, res, next) => {
    if(err && err.code === 'EBADCSRFTOKEN'){
        return res.send('Deu pau')
    }

    next()
}

exports.csrfToken = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken()
    next()
}