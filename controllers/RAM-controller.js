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
                var c = 'false'
            } else if (H_D == ":Varios") {
                var c = 'false_v'
            } else {
                var c = 'true_defect'
            }
            var locals = {
                title: 'Acuerdos Municipales',
                disables: c,
                data: rows,
            }
            res.render('index', locals)
        }
    })
}
ACController.close_reset = (req,res,next)=>{
    let closeORreset = req.params.CoR,
        id
    if (closeORreset == ":Close") {
        id="Close"
    }else if (closeORreset == ":Reset") {
        id="Reset"
    }
    console.log(closeORreset)
     ACModel.close_reset(id,(err, stdout, stderr) => {
         if (err) {
            let locals = {
                title: 'Error al cerrar',
                description: 'Error de archivo',
                error: err
            }

            res.render('error', locals)
             
         }else{
             console.log(stdout)
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
        fecha: req.body.fecha,
        detalle: req.body.detalle
    }

    console.log(AC)

    ACModel.save(AC, (err) => {
        let r = req.params.save
        if (err) {
            let locals = {
                title: `Error al salvar el registro con el id: ${AC.acuerdo_id}`,
                description: "Error de Sintaxis SQL",
                error: err
            }

            res.render('error', locals)
        } else {
            console.log(r)
            // res.redirect('/')
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
    ACModel.getOneAC((err, rows) => {
        var letras_a = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
            letras_A = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
            cant = req.params.cant,
            c = 0,
            m_idarray = []
        if (err) {} else {
            if (err) {
                let locals = {
                    title: 'Error al consultar la base de datos',
                    description: 'Error de Sintaxis SQL',
                    error: err
                }
                res.render('error', locals)
            } else {
                if (cant == ":nums=1") {
                    c = 0
                } else if (cant == ":nums=2") {
                    c = 1
                } else if (cant == ":nums=3") {
                    c = 2
                } else if (cant == ":nums=4") {
                    c = 3
                } else if (cant == ":nums=5") {
                    c = 4
                }
                for (var i = 0; i <= c; i++) {
                    var m_id = "AC_"
                    for (var j = 0; j < 3; j++) {
                        m_id += letras_a[Math.round(Math.random() * 3)] + Math.round(Math.random() * 9) + letras_A[Math.round(Math.random() * 26)]
                    }
                    for (var ram = 0; ram < rows.length; ram++) {
                        while (m_id == rows[ram].acuerdo_id) {
                            for (var k = 0; k < 3; k++) {
                                m_id += letras_a[Math.round(Math.random() * 26)] + Math.round(Math.random() * 26) + letras_A[Math.round(Math.random() * 26)]
                            }
                        }
                    }
                    m_idarray[i] = m_id
                    console.log(m_idarray)
                }
                var locals = {
                    title: 'Agregar Acuerdo Municipal',
                    data: m_idarray,
                    nums: c,
                    op: 'search_ag'
                }
                res.render('add', locals)
            }
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