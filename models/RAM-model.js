'use strict'

var conn = require('./RAM-connection'),
    Cexec = require('./conexec'),
    ACModel = () => {}

ACModel.close_reset = (id, cb) => Cexec.conexec(id, cb)

ACModel.getAll = (cb) => conn.ref('RAM').once('value', cb)

ACModel.getid = (cb) => conn.ref('RAM').on('child_added', cb)

// ACModel.getid2 = (id, cb) => conn.ref('RAM/'+id).on('child_added', cb)

ACModel.getOne = (id, cb) => conn.ref('RAM/'+id).once('value', cb)

//MovieModel.insert = (data, cb) => conn.query('INSERT INTO movie SET ?', data, cb)

//MovieModel.update = (data, cb) => conn.query('UPDATE movie SET ? WHERE movie_id = ?', [data, data.movie_id], cb)

ACModel.push = (id,data,cb) => {
    // conn.ref('RAM').push(data, cb)
    conn.ref("RAM").child(id).set(data,cb);

        // conn.ref('RAM').once('value', (snapshot) => {
        //         var data = snapshot.val()
        //     })
        // conn.query('SELECT * FROM RAM WHERE acuerdo_id = ?', data.acuerdo_id, (err, rows) => {
        //     console.log(`Número de registros: ${rows.length}`)

    //     if (err) {
    //         return err
    //     } else {
    //         return (rows.length == 1) ?
    //             conn.query('UPDATE RAM SET ? WHERE acuerdo_id = ?', [data, data.acuerdo_id], cb) :
    //             db.ref('RAM').push(data)
    //     }
    // })
}

// ACModel.save = (data, cb) => {
//     conn.query('SELECT * FROM RAM WHERE acuerdo_id = ?', data.acuerdo_id, (err, rows) => {
//         console.log(`Número de registros: ${rows.length}`)

//         if (err) {
//             return err
//         } else {
//             return (rows.length == 1) ?
//                 conn.query('UPDATE RAM SET ? WHERE acuerdo_id = ?', [data, data.acuerdo_id], cb) :
//                 conn.query('INSERT INTO RAM SET ?', data, cb)
//         }
//     })
// }

ACModel.delete = (id, cb) => conn.query('DELETE FROM RAM WHERE acuerdo_id = ?', id, cb)

module.exports = ACModel