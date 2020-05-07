require('./config/config')

const express = require('express')
const mongoose = require('mongoose')
const rutas = require('./routes') 

const app = express()
app.use(express.json())

app.use(rutas );

mongoose.connect(process.env.URLDB , {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
}, (err, res) => {
  if (err) throw err;
  console.log('MongoDB ONLINE!!')

});


app.listen(process.env.PORT, () => {
    console.log('Server running: http://localhost:',process.env.PORT)
})