/**
 * Created by fy on 15-9-4.
 * 关于模块
 */
'use strict';

const express = require('express');
const http = require('http');
const request = require('request-json');
const router = express.Router();

/**
 * 跳转到关于说明页面
 */
router.get('/', function (req, res, next) {
    res.render('about');
});

module.exports = router;