'use strict'

var express = require('express'),
    retornada,
    exec = require('child_process').exec

exports.conexec = function (id){
    exec('start '+id+'.bat',(err, stdout, stderr) => {
        if(err){
            console.error(err)
            retornada = err
            return retornada
        }else{
            console.log('stdout',stdout)
            console.log('stderr',stderr)
            retornada = stdout
            return retornada
        }
  });
}