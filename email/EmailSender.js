var nodemailer = require('nodemailer');

this.sendEmail = () => {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        port: 465,
        auth: {
            type: "OAuth2",
            user: 'prueba.correotog@gmail.com',
            pass: 'FABIAN2308andrew'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    var mailOptions = {
        from: 'prueba.correotog@gmail.com',
        to: 'andres.simbaqueba@uptc.edu.co',
        subject: 'Sending Email Using Node.js',
        text: 'That was easy!'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });


}

module.exports = this;