'use strict'

var ACController = require('../controllers/RAM-controller'),
    express = require('express'),
    router = express.Router()
router
    .get('/', ACController.getAll)
    .get('/C_R:CoR', ACController.close_reset)
    .get('/S_E:value', ACController.getAll)
    .get('/agregar:cant', ACController.addForm)
    .get('/search', ACController.searchForm)
    .get('/search/SR:value_search', ACController.searchForm)
    .post('/save', ACController.push)
    .get('/editar/:acuerdo_id', ACController.getOne)
    .put('/actualizar/:acuerdo_id', ACController.push)
    .delete('/eliminar/:acuerdo_id', ACController.delete)
    .use(ACController.error404)

module.exports = router