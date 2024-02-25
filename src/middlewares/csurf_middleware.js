exports.checkCsrfError = (err, req, res, next) => {
    if(err && err.code === 'EBADCSRFTOKEN'){
        return res.send('Erro na autenticação')
    }

    next()
}

exports.csrfToken = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken()
    next()
}