const bodyParser = require('body-parser');
const express = require('express');
const verifyRequestSignature = require('./app/helpers/verifyRequestSignature');

let app = express();
app.set('port', process.env.PORT || 5001);
app.use(bodyParser.json({verify: verifyRequestSignature}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

const verificationController = require('./app/controllers/verification');
const messageController = require('./app/controllers/message');

app.get('/webhook', verificationController);
app.post('/webhook', messageController);

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});

module.exports = app;
