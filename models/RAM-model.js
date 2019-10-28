'use strict'

var conn = require('./RAM-connection'),
    Cexec = require('./conexec'),
    ACModel = () => {}

ACModel.close_reset = (id, cb) => Cexec.conexec(id, cb)

ACModel.getAll = (cb) => {
    conn.ref('RAM/').once('value', cb)
}

ACModel.getOne = (id, cb) => conn.ref('RAM/' + id).once('value', cb)

ACModel.push = (id, data, cb) => {

    conn.ref(`RAM/${id}`).once("value", snapshot => {
        if (snapshot.exists()) {
            var updates = {}
            updates['/RAM/' + id] = data
            conn.ref().update(updates, cb)
        } else {
            conn.ref('RAM').child(id).set(data, cb)
        }
    })
}

ACModel.delete = (id, cb) => {
    conn.ref('RAM/').child(id).remove(cb)
}

module.exports = ACModel