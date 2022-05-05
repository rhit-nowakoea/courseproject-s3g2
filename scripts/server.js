// Requiring modules
const express = require('express');
const app = express();
const mssql = require("mysql");
 
// Get request
app.get('/', function (req, res) {
 
    // Config your database credential
    const config = {
        user: 'clarken',
        password: 'EFzojoh0',
        server: 'titan.csse.rose-hulman.edu',
        database: 'SchedulingAssistant'
    };
 
    // Connect to your database
    mssql.connect(config, function (err) {
 
        // Create Request object to perform
        // query operation
        var request = new mssql.Request();
 
        // Query to the database and get the records
        request.query('select * from Student',
            function (err, records) {
 
                if (err) console.log(err)
 
                // Send records as a response
                // to browser
                res.send(records);
 
            });
    });
});
 
var server = app.listen(5000, function () {
    console.log('Server is listening at port 5000...');
});