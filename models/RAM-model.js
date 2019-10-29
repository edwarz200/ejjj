'use strict'

var conn = require('./RAM-connection'),
    Cexec = require('./conexec'),
    db = require('./db.js'),
    ACModel = () => {}

ACModel.close_reset = (id, cb) => Cexec.conexec(id, cb)

ACModel.getAll = (cb) => conn.ref('RAM/').orderByChild('fecha').once('value', cb)

ACModel.getOne = (id, cb) => conn.ref('RAM/' + id).once('value', cb)

ACModel.push = (id, data, cb) => {
    
    var RAM = db.addCollection ('RAM');
    RAM.insert(id, data)
    conn.ref(`RAM/${id}`).once("value", snapshot => {
        if (snapshot.exists()) {
            var updates = {}
            updates['/RAM/' + id] = data
            conn.ref().update(updates, cb)
        } else {

            conn.ref('RAM').child(id).set(data, cb)
            db.saveDatabase()
        }
    })
}

ACModel.delete = (id, cb) => {
    conn.ref('RAM/').child(id).remove(cb)
}

module.exports = ACModel