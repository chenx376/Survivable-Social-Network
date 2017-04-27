var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

module.exports = class GmailService {

    constructor() {
        var content = fs.readFileSync('client_secret.json');
        // Authorize a client with the loaded credentials, then call the
        // Gmail API.
        var credentials = JSON.parse(content)
        var clientSecret = credentials.installed.client_secret;
        var clientId = credentials.installed.client_id;
        var redirectUrl = credentials.installed.redirect_uris[0];
        var auth = new googleAuth();
        var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

        var token = fs.readFileSync('gmail-nodejs-quickstart.json');
        oauth2Client.credentials = JSON.parse(token);
        this.mAuth = oauth2Client;
        console.log("Gmail API Authentication Success");
    };

    sendEMail(email) {
        // email = {
        //     sender_name : "yan",
        //     receiver_email : "liyansam91@gmail.com",
        //     title : "SV4 ESN Emergency Message",
        //     content : "test"
        // }

        var gmail = google.gmail('v1');

        var email_lines = [];
        email_lines.push('From: "SV4 ESN" <sv4esn@gmail.com>');
        email_lines.push('To: ' + email.receiver_email);
        email_lines.push('Content-type: text/html;charset=iso-8859-1');
        email_lines.push('MIME-Version: 1.0');
        email_lines.push('Subject: ' + email.title);
        email_lines.push('');
        email_lines.push('From: ' + email.sender_name + '<br/>');
        email_lines.push('<br/>');
        email_lines.push('Content: ' + email.content + '<br/>');
        var email = email_lines.join('\r\n').trim();
        var base64EncodedEmail = new Buffer(email).toString('base64');
        base64EncodedEmail = base64EncodedEmail.replace(/\+/g, '-').replace(/\//g, '_');

        gmail.users.messages.send({
          auth: this.mAuth,
          userId: 'me',
          resource: {
            raw: base64EncodedEmail
          }
        });
    }

}
