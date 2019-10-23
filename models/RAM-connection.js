'use strict'
var firebase = require('firebase-admin'),
    serviceAccount = require("./ramdb-9ae8d-firebase-adminsdk-9gii2-393ba3be57.json")

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: 'https://ramdb-9ae8d.firebaseio.com/'
})

const db = firebase.database()


module.exports = db


// let mysql = require('mysql'),
//     conf = require('./db-conf'),
//     dbOptions = {
//         host: conf.mysql.host,
//         port: conf.mysql.port,
//         user: conf.mysql.user,
//         password: conf.mysql.pass,
//         database: conf.mysql.db
//     },
//     myConn = mysql.createConnection(dbOptions)

// myConn.connect((err) => {
//     return (err) ? console.log(`Error al Conectarse a MySQL: ${err.stack}`) : console.log(`Conexión establecida con MySQL N°: ${myConn.threadId}`)
// })

// //console.log(conf.mysql.db)

// module.exports = myConn