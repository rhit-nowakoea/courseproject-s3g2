var Connection = require('tedious').Connection;
var config = {
    server: 'titan.csse.rose-hulman.edu', //update me
    authentication: {
        type: 'default',
        options: {
            userName: 'SAAppAcc', //update me
            password: 'SAPassword123' //update me
        }
    },
    options: {
        // If you are on Microsoft Azure, you need encryption:
        encrypt: true,
        database: 'SchedulingAssistant', //update me
        trustServerCertificate: true
    }
};
var connection = new Connection(config);
connection.on('connect', function (err) {
    // If no error, then good to proceed.
    console.log("Connected");
});

connection.connect();
module.exports = {
    foo: function(){
        console.log("Connected");
    }
};