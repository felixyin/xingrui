/**
 * Created by fy on 2017/1/21.
 */

const express = require('express');
const router = express.Router();
const dnaService = require('../../service/dna/index');
const extractService = require('../../service/dna/extract');
const storageService = require('../../service/dna/storage');
const operateService = require('../../service/dna/operate');

/**
 * 重提取
 */
router.post('/extract', (req, res) => {
    extractService.redo(req.body, (err, result) => {
        res.send({
            changedRows: result.changedRows,
            err: err
        });
    });
});

/**
 * 重建库
 */
router.post('/storage', (req, res) => {
    storageService.redo(req.body, (err, result) => {
        res.send({
            changedRows: result.changedRows,
            err: err
        });
    });
});

/**
 * 重上机
 */
router.post('/operate', (req, res) => {
    operateService.redo(req.body, (err, result) => {
        res.send({
            changedRows: result.changedRows,
            err: err
        });
    });
});

/**
 * 废弃
 */
router.post('/delete', (req, res) => {
    dnaService.delete(req.body.checker, req.body.ids, (err, result) => {
        res.send({
            changedRows: result.changedRows,
            err: err
        });
    });
});

module.exports = router;

