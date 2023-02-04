const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

function sendMail({ emailTo, name, legalNumber, password }) {
    var transporter = nodemailer.createTransport(
        {
            service: 'gmail',
            auth: {
                user: 'info@hsbkanzlei.de@gmail.com',
                pass: 'ointnujllbnjvgqa'
            }
        }
    );
    transporter.use('compile', hbs({
        viewEngine: {
            partialsDir: path.resolve('./templates/'),
            defaultLayout: false,
        },
        viewPath: path.resolve('./templates/'),
    }))

    var mailOptions = {
        from: 'sooo78491@gmail.com',
        to: emailTo,
        subject: 'Welcome!',
        template: 'email',
        context: {
            name: name,
            company: 'HSB',
            password: password,
            legalNumber: legalNumber
        }
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}

function sendOtp({ emailTo, name, otpCode }) {
    var transporter = nodemailer.createTransport(
        {
            service: 'gmail',
            auth: {
                user: 'sharloo.12.00@gmail.com',
                pass: 'bkbrrhqofzscpotv'
            }
        }
    );
    transporter.use('compile', hbs({
        viewEngine: {
            partialsDir: path.resolve('./templates/'),
            defaultLayout: false,
        },
        viewPath: path.resolve('./templates/'),
    }))

    var mailOptions = {
        from: 'sooo78491@gmail.com',
        to: emailTo,
        subject: 'Welcome!',
        template: 'otp',
        context: {
            name: name,
            company: 'HSB',
            otpCode: otpCode,
        }
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}

module.exports = {
    sendMail,
    sendOtp,
}