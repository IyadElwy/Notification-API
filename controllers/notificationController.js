const catchAsync = require("../utils/catchAsync");
const AppError = require('./../utils/appError');
/////////////////////////////////////////////////////////////////////////////////////////////
const fs = require('fs/promises');

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRIDAPIKEY);

/////////////////////////////////////////////////////////////////////////////////////////////


exports.confirmAccount = catchAsync(async (req, res, next) => {


    let Template = await fs.readFile('static/Email_Templates/confirm_account.html', {encoding: 'utf8'});
    Template = Template.replace('{email}', req.body.email);


    const msg = {
        to: req.body.email,
        from: process.env.SENDGRIDVERIFIEDSENDER,
        subject: 'Rabbit Account Confirmation',
        html: Template
    };

    sgMail.send(msg).then(() => {
        res.status(201).json({
            status: "Success",
        });
    });
});

exports.confirmOrder = catchAsync(async (req, res, next) => {


    let Template = await fs.readFile('static/Email_Templates/order_confirmed.html', {encoding: 'utf8'});
    Template = Template.replace('{id}', req.body.orderid);
    Template = Template.replace('{name}', req.body.name);
    Template = Template.replace('{address}', req.body.address);
    Template = Template.replace('{total}', req.body.total);


    const msg = {
        to: req.body.email,
        from: process.env.SENDGRIDVERIFIEDSENDER,
        subject: 'Rabbit Confirm Order',
        html: Template
    };

    sgMail.send(msg).then(() => {
        res.status(201).json({
            status: "Success",
        });
    });


});

exports.changeStatus = catchAsync(async (req, res, next) => {


    let Template = await fs.readFile('static/Email_Templates/order_status_changed.html', {encoding: 'utf8'});
    Template = Template.replace('{status}', req.body.status);
    Template = Template.replace('{id}', req.body.orderid);
    Template = Template.replace('{name}', req.body.name);
    Template = Template.replace('{address}', req.body.address);
    Template = Template.replace('{total}', req.body.total);


    const msg = {
        to: req.body.email,
        from: process.env.SENDGRIDVERIFIEDSENDER,
        subject: 'Rabbit Order Status',
        html: Template
    };

    sgMail.send(msg).then(() => {
        res.status(201).json({
            status: "Success",
        });
    });


});

exports.sendAd = catchAsync(async (req, res, next) => {


    let Template = await fs.readFile('static/Email_Templates/ad.html', {encoding: 'utf8'});
    Template = Template.replace('{msg}', req.body.msg);


    const msg = {
        to: req.body.email,
        from: process.env.SENDGRIDVERIFIEDSENDER,
        subject: 'CHECK IT OUT !',
        html: Template
    };

    sgMail.send(msg).then(() => {
        res.status(201).json({
            status: "Success",
        });
    });


});

/////////////////////////////////////////////////////////////////////////////////////////////
