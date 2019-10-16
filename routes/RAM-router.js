'use strict'

var ACController = require('../controllers/RAM-controller'),
    express = require('express'),
    router = express.Router()

router
    .get('/', ACController.getAll)
    .get('/agregar', ACController.addForm)
    .get('/search', ACController.searchForm)
    //.post('/', ACController.insert)
    .post('/', ACController.save)
    .get('/?S_E=Habilitar', () => { console.log(entro) })
    // .get('/?S_E=Deshabilitar', ACController.dD)
    // .get('/?S_E=Varios', ACController.HV)
    .get('/editar/:acuerdo_id', ACController.getOne)
    //.post('/actualizar/:acuerdo_id', ACController.update)
    //.put('/actualizar/:acuerdo_id', ACController.update)
    .put('/actualizar/:acuerdo_id', ACController.save)
    //.post('/eliminar/:acuerdo_id', ACController.delete)
    .delete('/eliminar/:acuerdo_id', ACController.delete)
    .use(ACController.error404)

module.exports = router