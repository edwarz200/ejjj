'use strict'

var ACModel = require('../models/RAcMu-model'),
    ACController = () => {}

ACController.getAll = (req, res, next) => {
    ACModel.getAll((err, rows) => {
        if (err) {
            let locals = {
                title: 'Error al consultar la base de datos',
                description: 'Error de Sintaxis SQL',
                error: err
            }

            res.render('error', locals)
        } else {
            let locals = {
                title: 'Acuerdos Municipales',
                data: rows
            }

            res.render('index', locals)
        }
    })
}

ACController.getOne = (req, res, next) => {
    let acuerdo_id = req.params.acuerdo_id
    console.log(acuerdo_id)

    ACModel.getOne(acuerdo_id, (err, rows) => {
        console.log(err, '---', rows)
        if (err) {
            let locals = {
                title: `Error al buscar el registro con el id: ${acuerdo_id}`,
                description: "Error de Sintaxis SQL",
                error: err
            }

            res.render('error', locals)
        } else {
            let locals = {
                title: 'Acuerdos Municipales',
                data: rows
            }

            res.render('edit', locals)
        }
    })
}

ACController.save = (req, res, next) => {
    let AC = {
        acuerdo_id: req.body.acuerdo_id,
        nro_acuerdo: req.body.nro_acuerdo,
        fecha: req.body.fecha,
        detalle: req.body.detalle
    }

    console.log(AC)

    ACModel.save(AC, (err) => {
        if (err) {
            let locals = {
                title: `Error al salvar el registro con el id: ${AC.acuerdo_id}`,
                description: "Error de Sintaxis SQL",
                error: err
            }

            res.render('error', locals)
        } else {
            res.redirect('/')
        }
    })
}

ACController.delete = (req, res, next) => {
    let acuerdo_id = req.params.acuerdo_id
    console.log(acuerdo_id)

    ACModel.delete(acuerdo_id, (err, rows) => {
        console.log(err, '---', rows)
        if (err) {
            let locals = {
                title: `Error al eliminar el registro con el id: ${acuerdo_id}`,
                description: "Error de Sintaxis SQL",
                error: err
            }

            res.render('error', locals)
        } else {
            res.redirect('/')
        }
    })
}

ACController.addForm = (req, res, next) => {
    var letras_a = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    var letras_A = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

    res.render('add', { title: 'Agregar Película' })
}

ACController.error404 = (req, res, next) => {
    let error = new Error(),
        locals = {
            title: 'Error 404',
            description: 'Recurso No Encontrado',
            error: error
        }

    error.status = 404

    res.render('error', locals)

    next()
}

module.exports = ACController