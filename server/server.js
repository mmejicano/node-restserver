const express = require('express')
require('./config/config')
const app = express()

app.use(express.json())
app.get('/usuario', (req, res) => {
    res.json('hola mundo')
})
app.post('/usuario', (req, res) => {
    let body = req.body

    if(body.nombre === undefined){
        res.status(400).json({
            ok: false,
            mensaje: 'nombre necesario'
        })
    }else {
        res.json({
            persona: body
        })
    }
    
})
app.put('/usuario/:id', (req, res) => {

    let data = req.params.id
    res.json({
        data
    })
})
app.delete('/usuario', (req, res) => {
    res.json('delete mundo')
})

app.listen(process.env.PORT, () => {
    console.log('escuchando puerto: ', process.env.PORT)
})