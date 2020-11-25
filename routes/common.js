/**
 * Created by fy on 2017/1/1.
 */

'use strict';
const express = require('express');
const router = express.Router();
const fs = require('fs');
const utils = require('../lib/utils');
const commonService = require('../service/common');

/**
 * 返回count数
 */
router.post('/getCount', (req, res) => {
    let body = JSON.parse(req.body.data);
    //console.log(body);
    commonService.selectCount(body, (err, rows) => {
        //console.log(err);
        if (err)throw err;
        if (rows && rows.length == 1) {
            res.send(rows[0])
        }
    });
});


module.exports = router;