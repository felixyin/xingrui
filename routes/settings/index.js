/**
 * Created by fy on 15-12-22.
 */
'use strict';
const express = require('express');
const router = express.Router();
const fs = require('fs');
const utils = require('../../lib/utils');
const settingsService = require('../../service/settings/index');

router.get('/', function (req, res, next) {
    res.render('settings/index');
});

router.get('/user', function (req, res, next) {
    res.render('settings/user');
});

router.post('/getJsonFromFile', (req, res) => {
    settingsService.getJsonFromFile(req.body.type, (err, rows) => {
        res.send({
            err: err,
            data: rows
        });
    });
});

router.post('/setJsonToFile', (req, res) => {
    settingsService.setJsonToFile(req.body.type, req.body.dataString, (err, result) => {
        res.send({
            err: err,
            data: result
        });
    });
});

module.exports = router;
