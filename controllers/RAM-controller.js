'use strict'

var ACModel = require('../models/RAM-model'),
    ACController = () => {}

ACController.push = (req, res, next) => {
    let id = req.body.acuerdo_id,
        AC = {
            nro_acuerdo: req.body.nro_acuerdo,
            fecha: req.body.fecha,
            detalle: req.body.detalle
        }
    ACModel.push(id, AC, (err) => {
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


ACController.getAll = (req, res, next) => {
    let H_D = req.params.value,
        childKey = "no paso",
        c
    ACModel.getAll((snapshot) => {
        var childKey = {},
            rows, isss = 0
        snapshot.forEach(function(childSnapshot) {
            childKey[isss] = childSnapshot.key
            rows = snapshot.val()
            console.log(childKey[isss])
            isss++
        });
        if (H_D == ":Habilitar") {
            c = 'false'
        } else if (H_D == ":Varios") {
            c = 'false_v'
        } else {
            c = 'true_defect'
        }
        let locals = {
            title: 'Acuerdos Municipales',
            disables: c,
            data: rows,
            childKey: childKey
        }
        res.render('index', locals)
    })
}

ACController.close_reset = (req, res, next) => {
    let closeORreset = req.params.CoR,
        id

    if (closeORreset == ":Close") {
        id = "Close"
    } else if (closeORreset == ":Restart") {
        id = "Restart"
    }
    ACModel.close_reset(id, (err, stdout, stderr) => {
        res.redirect('/')
        return (err) ? console.log(`Archivo no encontrado ${err.stack}`) : console.log(`Archivo encontrado: stdout ${stdout}, stderr ${stderr} `)
    })
    console.log(closeORreset)
}

ACController.getOne = (req, res, next) => {
    let acuerdo_id = req.params.acuerdo_id
    console.log(acuerdo_id)

    ACModel.getOne(acuerdo_id, (snapshot) => {
        let rows = snapshot.val(),
            locals = {
                title: 'Acuerdos Municipales',
                id: acuerdo_id,
                data: rows,
                op: 'search'
            }
        console.log(rows)
        res.render('edit', locals)
    })
}

ACController.delete = (req, res, next) => {
    let acuerdo_id = req.params.acuerdo_id
    console.log(acuerdo_id)

    ACModel.delete(acuerdo_id, function(err) {
        if (err) {
            let locals = {
                title: `Error al eliminar el registro con el id: ${acuerdo_id}`,
                description: "Error de Sintaxis",
                error: err
            }

            res.render('error', locals)
        } else {
            res.redirect('/S_E:Habilitar')
        }
    })
}

ACController.addForm = (req, res, next) => {
    // ACModel.getOneAC((err, rows) => {
    var letras_a = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
        letras_A = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
        cant = req.params.cant,
        c = 0,
        m_idarray = []
        // if (err) {} else {
        //     if (err) {
        //         let locals = {
        //             title: 'Error al consultar la base de datos',
        //             description: 'Error de Sintaxis SQL',
        //             error: err
        //         }
        //         res.render('error', locals)
        //     } else {
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
        var m_id = "AC_",
            rows = 0
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
        // }
        // }
        // })
}

ACController.searchForm = (req, res, next) => {
    let sr = req.params.value_search,
        locals = {
            title: 'Buscar Acuerdo Municipal',
            op: 'search'
        }
    console.log(sr)
    console.log(req.params)

    // res.render('search', locals)
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