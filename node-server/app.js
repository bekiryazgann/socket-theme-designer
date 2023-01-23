const express = require('express');
const {request, response} = require("express");
const app = express();
const api = 'http://192.168.1.156:8088';
const fs = require('fs');
const request1 = require('request');
const md5 = require('md5');

global.code = {
    html: '',
    css: '',
    js: ''
}

app.use(express.json());

app.post('/customer/:page/', (request, response) => {
    let data = request.body;

    for (const [key, value] of Object.entries(data)) {
        request1.post({
            url: api + '/?component=' + value,
            json: true,
            body: {}
        }, (error, response1, body) => {
            if (error) {
                return console.log(error);
            }
            if (response1.statusCode === 200) {
                code.html = code.html + body.source.html;
                code.css = code.css + body.source.css;
                code.js = code.js + body.source.js;
            }
        })
    }

    console.log('213:' , code);
    let fileBody = '<!doctype html>\n' +
        '<html lang="en">\n<head>\n    ' +
        '<meta charset="UTF-8">\n    ' +
        '<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">\n    ' +
        '<meta http-equiv="X-UA-Compatible" content="ie=edge">\n    ' +
        '<title>Document</title>\n    ' +
        '<style>' + code.css + '</style>\n' +
        '</head>\n<body>' + code.html +
        '<script>' + code.js + '</script>' +
        '</body></html>'

    code.html = '';
    code.js = '';
    code.css = '';

    let path = 'sites/' + md5(Math.random() + Math.ceil(Math.random())) + '.html'

    fs.writeFile(path, fileBody, error => {
        if (error) {
            console.log(error);
        }
        response.status(200).send({
            url: 'http://192.168.1.156:3031/' + path
        });
        console.log('Generated File...')
    })
});

app.get('/sites/:md5', (request, response) => {

    fs.readFile('sites/' + request.params.md5, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        response.status(200).send(data)

    });
});

app.listen(3031);