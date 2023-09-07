const express = require('express');
const app = express();

const hostname = 'localhost';
const port = 5001;
const maxLimit = 10000;

app.get('/name', function (req, res) {

    const firstnames = require(__dirname + '/resource/firstnames.json');
    const lastnames = require(__dirname + '/resource/lastnames.json');

    var firstnameItem = firstnames[Math.floor(Math.random()*firstnames.length)];
    var lastnameItem = lastnames[Math.floor(Math.random()*lastnames.length)];

    if( req.query.count != null )
    {
        if( Number.isInteger(parseInt(req.query.count)) === false )
        {
            return res.send({
                'error' : true,
                'message': 'The value is not number.'
            });
        }

        if( parseInt(req.query.count) <= 0 )
        {
            return res.send({
                'error' : true,
                'message': 'The count value cannot be zero or negative.'
            });
        }

        if( parseInt(req.query.count) > maxLimit )
        {
            return res.send({
                'error' : true,
                'message': 'The count value cannot be greater than ' + maxLimit + '.',
            });
        }

        const names = [];
        const maxCount = parseInt(req.query.count) ?? 1;
        for (let index = 0; index < maxCount; index++) {
            firstnameItem = firstnames[Math.floor(Math.random()*firstnames.length)];
            lastnameItem = lastnames[Math.floor(Math.random()*lastnames.length)];
            names.push({
                'firstname' : firstnameItem.Etunimi,
                'lastname' : lastnameItem.Sukunimi,
            });
        }
        return res.send(names);
    }

    return res.send({
        'firstname' : firstnameItem.Etunimi,
        'lastname' : lastnameItem.Sukunimi,
    });
})

app.listen(port, hostname,  function () {
   console.log("Example app listening at http://%s:%s", hostname, port)
})
