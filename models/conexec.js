'use strict'

var express = require('express'),
    Cexec = require('child_process').exec

exports.conexec = ((id) => {
    Cexec('start ' + id + '.VBS', (err, stdout, stderr) => {
        return (err) ? console.log(`Archivo no encontrado ${err.stack}`) : console.log(`Archivo encontrado: stdout ${stdout}, stderr ${stderr} `)
    })
})