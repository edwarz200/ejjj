'use strict'

var conn = require('./RAM-connection'),
    ACModel = () => {}

ACModel.getAll = (cb) => conn.query('SELECT * FROM RAM order by fecha, nro_acuerdo', cb)

ACModel.getOneAC = (cb) => conn.query('SELECT acuerdo_id FROM RAM', cb)

ACModel.getOne = (id, cb) => conn.query('SELECT * FROM RAM WHERE acuerdo_id = ?', id, cb)

//MovieModel.insert = (data, cb) => conn.query('INSERT INTO movie SET ?', data, cb)

//MovieModel.update = (data, cb) => conn.query('UPDATE movie SET ? WHERE movie_id = ?', [data, data.movie_id], cb)


ACModel.save = (data, cb) => {
    conn.query('SELECT * FROM RAM WHERE acuerdo_id = ?', data.acuerdo_id, (err, rows) => {
        console.log(`Número de registros: ${rows.length}`)

        if (err) {
            return err
        } else {
            return (rows.length == 1) ?
                conn.query('UPDATE RAM SET ? WHERE acuerdo_id = ?', [data, data.acuerdo_id], cb) :
                conn.query('INSERT INTO RAM SET ?', data, cb)
        }
    })
}

ACModel.delete = (id, cb) => conn.query('DELETE FROM RAM WHERE acuerdo_id = ?', id, cb)

module.exports = ACModel