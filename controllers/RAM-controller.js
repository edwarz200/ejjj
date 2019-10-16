'use strict'

var ACModel = require('../models/RAM-model'),
    ACController = () => {}

ACController.getAll = (req, res, next) => {
    var H_D = req.params.value
    console.log(req.params.value)
    ACModel.getAll((err, rows) => {
        if (err) {
            let locals = {
                title: 'Error al consultar la base de datos',
                description: 'Error de Sintaxis SQL',
                error: err
            }

            res.render('error', locals)
        } else {
            if (H_D == ":Habilitar") {
                var locals = {
                    title: 'Acuerdos Municipales',
                    disables: 'false',
                    data: rows
                }
                console.log("entro")
            } else if (H_D == ":Deshabilitar") {
                var locals = {
                    title: 'Acuerdos Municipales',
                    disables: 'true',
                    data: rows
                }
            } else if (H_D == ":Varios") {
                var locals = {
                    title: 'Acuerdos Municipales',
                    disables: 'false_v',
                    data: rows
                }
            } else {
                var locals = {
                    title: 'Acuerdos Municipales',
                    disables: 'true_defect',
                    data: rows
                }
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
                data: rows,
                op: 'search'
            }

            res.render('edit', locals)
        }
    })
}

ACController.save = (req, res, next) => {
    let AC = {
        acuerdo_id: req.body.acuerdo_id,
        nro_acuerdo: req.body.nro_acuerdo,
        f_dia: req.body.f_dia,
        f_mes: req.body.f_mes,
        f_año: req.body.f_año,
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
            res.redirect('/S_E:Habilitar')
        }
    })
}

ACController.addForm = (req, res, next) => {
    var letras_a = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    var letras_A = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    ACModel.getOneAC((err, rows) => {
        if (err) {} else {
            var m_id = "AC_"
            for (var i = 0; i < 3; i++) {
                m_id += letras_a[Math.round(Math.random() * 3)] + Math.round(Math.random() * 9) + letras_A[Math.round(Math.random() * 26)]
            }

            for (var movie = 0; movie < rows.length; movie++) {
                while (m_id == rows[movie].movie_id) {
                    for (var i = 0; i < 3; i++) {
                        m_id += letras_a[Math.round(Math.random() * 26)] + Math.round(Math.random() * 26) + letras_A[Math.round(Math.random() * 26)]
                    }
                }
            }
            let locals = {
                title: 'Agregar Acuerdo Municipal',
                data: m_id,
                op: 'search_ag'
            }
            res.render('add', locals)
        }
    })
}

ACController.searchForm = (req, res, next) => {
    let locals = {
        title: 'Buscar Acuerdo Municipal',
        op: 'search'
    }
    res.render('search', locals)
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