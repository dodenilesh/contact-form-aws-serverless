var AWS = require('aws-sdk');
var ses = new AWS.SES();

var RECEIVER = 'dodenilesh94@gmail.com';
var SENDER = 'dodenilesh@yahoo.com';

var response = {
 "statusCode": 200,
 "headers": { 
"Content-Type": "application/json","Access-Control-Allow-Origin": "*"
},
"isBase64Encoded": false,
 "body": "{ \"result\": \"Success\"\n}"
}

exports.handler = async function (event, context) {
    console.log('Received event:', event);
    sendEmail(event, function (err, data) {
        context.done(err, null);
    });
return response;
};

function sendEmail (event, done) {
    var params = {
        Destination: {
            ToAddresses: [
                RECEIVER
            ]
        },
        Message: {
            Body: {
                Text: {
                    Data: 'name: ' + event.name + '\nphone: ' + event.phone + '\nemail: ' + event.email + '\ndesc: ' + event.desc,
                    Charset: 'UTF-8'
                }
            },
            Subject: {
                Data: 'Website Referral Form: ' + event.name,
                Charset: 'UTF-8'
            }
        },
        Source: SENDER
    };
    ses.sendEmail(params).promise();
}