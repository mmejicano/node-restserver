//===========================
//PUERTO
//==========================
process.env.PORT = process.env.PORT || 3500

// Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

//Base de datos
let urlDB;

if(process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://localhost:27017/cafe'
}else {
    urlDB = process.env.MONGO_URL 

}

process.env.URLDB = urlDB


// vencimiento del token
process.env.CADUCIDAD_TOKEN = 60*60*24

// seed de autenticacion
process.env.SEED = process.env.SEED || 'este-es-el-secrete'

