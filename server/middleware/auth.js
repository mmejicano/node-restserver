const jwt = require('jsonwebtoken')
// Verificar token

const verificarToken = (req, res, next) => {
    let {token} = req.headers
    
    
    jwt.verify( token, process.env.SEED, (err, decoded) => {
        if(err){
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido'
                }
            })
        }

        req.usuario = decoded.usuario
        
        next()
    })
    
}

const verificaRole = (req, res, next) => {
    let usuario = req.usuario

    if(usuario.role !== 'ADMIN_ROLE'){
        return res.status(401).json({
            ok: false,
            err: {
                message: 'Acceso denegado'
            }
        })
    }
    next()
}
module.exports = {verificarToken, verificaRole}