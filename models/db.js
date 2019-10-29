const	loki = require ('lokijs'),
		db = new loki ('db.json')

// db.addCollection ('RAM').insert({nombre: 'David Tennant', doctorNumber: 10})
// doctors.insert ({nombre: 'Matt Smith', doctorNumber: 11})


db.insert({nombre: 'r gpennant', doctorNumber: 10})
db.throttledSaveDrain(function(success){
       	if (success) {
        	console . log ( "Exito" );
		} else {
       		console . log ( " tarda demasiado, inténtalo de nuevo más tarde " );
      	}
}, {recursiveWaitLimit : true , recursiveWaitLimitDuration : 2000 });

// module.exports = db
db.saveDatabase()
