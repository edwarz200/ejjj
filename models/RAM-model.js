'use strict'

var conn = require('./RAM-connection'),
    Cexec = require('./conexec'),
    db = require('./db.js'),
    ACModel = () => {}

ACModel.close_reset = (id, cb) => Cexec.conexec(id, cb)

ACModel.getAll = (cb) => conn.ref('RAM/').orderByChild('fecha').once('value', cb)

ACModel.getOne = (id, cb) => conn.ref('RAM/' + id).once('value', cb)

ACModel.push = async (id,data, cb) => {

    // console.log(data.nro_acuerdo)

    const newAc = new db(data)
    await newAc.save(cb);
    // conn.ref(`RAM/${id}`).once("value", snapshot => {
    //     if (snapshot.exists()) {
    //         var updates = {}
    //         updates['/RAM/' + id] = data
    //         conn.ref().update(updates, cb)
    //     } else {

    //         conn.ref('RAM').child(id).set(data, cb)
    //         db.saveDatabase()
    //     }
    // })
}

ACModel.delete = (id, cb) => {
    conn.ref('RAM/').child(id).remove(cb)
}

module.exports = ACModel