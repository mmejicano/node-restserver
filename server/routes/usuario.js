const express = require('express')
const app = express()
const Usuario = require('../models/usuario')
const bcrypt = require('bcrypt')
const _ = require('underscore');
const {verificarToken, verificaRole} = require('../middleware/auth')


app.get('/usuario', verificarToken, (req, res) => {
    let desde = req.query.desde || 0;
    desde = Number(desde)

    let limite = req.query.limite || 5;
    limite = Number(limite)

    Usuario.find({estado: true}, 'nombre email role google img estado')
    .skip(desde)
    .limit(limite)
    .exec( (err, usuarios) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }

        Usuario.countDocuments({estado: true}, (err, conteo) => {
            
            res.json({
                ok: true,
                total: conteo,
                usuarios
            })
        })
    })
})

app.post('/usuario', [verificarToken, verificaRole],(req, res) => {
    

    const {nombre, email, password, role} = req.body

    let usuario = new Usuario({
        nombre,
        email,
        password: bcrypt.hashSync(password, 10),
        role
    })
    usuario.save( (err, usuarioDB) => {
        if(err) {
            return res.status(400).json({
                ok:false,
                err
            })
        }
        usuarioDB.password = undefined;
        res.json({
            ok: true,
            usuario: usuarioDB
        })
    } )
    
})

app.put('/usuario/:id', [verificarToken, verificaRole],(req, res) => {

    let id = req.params.id
    let body= _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, {new: true, runValidators: true} , (err, usuarioDB) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })
})

app.delete('/usuario/:id', [verificarToken, verificaRole],(req, res) => {

    let id = req.params.id

    // Usuario.findByIdAndRemove(id, (err, usuarioDEL) => {
    //     if(err){
    //         return res.status(400).json({
    //             ok: false,
    //             err
    //         })
    //     }

    //     if(!usuarioDEL){
    //         return res.status(400).json({
    //             ok: false,
    //             err: {
    //                 message: 'Usuario no encontrado'
    //             }
    //         })
    //     }
    //     res.json({
    //         ok: true,
    //         usuario: usuarioDEL
    //     })
    // })
    let cambiaEstado = {
        estado: false
    }

    Usuario.findByIdAndUpdate(id, cambiaEstado, {new: true} , (err, usuarioDB) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })
})

module.exports = app;