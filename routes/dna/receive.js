/**
 * Created by fy on 2016/12/29.
 */

'use strict';
const express = require('express');
const router = express.Router();
const fs = require('fs');
const utils = require('../../lib/utils');
const receiveService = require('../../service/dna/receive');
const excel = require('node-excel-export');

router.get('/', (req, res) => {
    res.render('dna/receive/list');
});

router.route('/list').get(receiveService.list).post(receiveService.list);

/**
 * 显示采血单录入界面
 */
router.get('/preAddCxd', (req, res) => {
    res.render('dna/receive/edit_cxd', {
        action: '/dna/receive/addCxd',
        inputter: req.query.userId,
        status: 1,
        sample_date: utils.now(),
        receive_date: utils.now()
    });
});

/**
 * 保存采血单信息
 */
router.post('/addCxd', (req, res) => {
    receiveService.insertCxd(req.body, (err, result) => {
        console.error(err);
        let errMsg = JSON.stringify(err);
        utils.jsonpAndEnd(res, `parent.parent.addCxdCb(${result ? result.insertId : null}, '${errMsg}');`);
    });
});

/**
 * 显示采血单修改界面
 */
router.get('/preEditCxd', (req, res) => {
    receiveService.selectDnaFlowById(req.query.id, (err, rows) => {
        if (rows && rows.length == 1) {
            let row = rows[0];
            row.action = '/dna/receive/editCxd';
            row.inputter = req.query.userId;
            res.render('dna/receive/edit_cxd', row);
        }
    });
});


/**
 * 修改采血单信息
 */
router.post('/editCxd', (req, res) => {
    receiveService.updateDnaFlowById(req.body, (err, result) => {
        console.error(err);
        let errMsg = JSON.stringify(err);
        utils.jsonpAndEnd(res, `parent.parent.editCxdCb(${result ? result.changedRows : null}, '${errMsg}');`);
    });
});


/**
 * 显示更换采血管界面
 */
router.get('/preAddCxg', (req, res) => {
    res.render('dna/receive/edit_cxg', {
        action: '/dna/receive/addCxg',
        barcode_long: req.query.barcode_long,
        changer: req.query.userId,
        status: 2
    });
});

/**
 * 更换采血管信息
 */
router.post('/addCxg', (req, res) => {
    receiveService.updateCxg(req.body, (err, result) => {
        console.error(err);
        let errMsg = JSON.stringify(err);
        utils.jsonpAndEnd(res, `parent.parent.addCxgCb(${result ? result.changedRows : null}, '${errMsg}');`);
    });
});

/**
 * 审核
 */
router.post('/addSh', (req, res) => {
    receiveService.updateSh(req.body, (err, result) => {
        res.send({
            changedRows: result.changedRows,
            err: err
        });
    });
});

/**
 * 入库
 */
router.post('/addRk', (req, res) => {
    receiveService.updateRk(req.body, (err, result) => {
        console.error(err);
        let errMsg = JSON.stringify(err);
        utils.jsonpAndEnd(res, `parent.addRkCb(${result ? result.changedRows : null}, '${errMsg}');`);
    });
});

/**
 * 导出条码打印机
 */
router.post('/printBarcode', (req, res) => {
    receiveService.printBarcode(req.body.ids, (err, result) => {
        res.send({
            affectedRows: result.affectedRows,
            err: err
        });
    });
});

/**
 * 显示出库界面
 */
router.get('/preAddCk', (req, res) => {
    res.render('dna/receive/edit_ck', {
        action: '/dna/receive/addCk',
        barcodeShortArray: req.query.barcodeShortArray,
        sample_outer: req.query.sample_outer,
        extract_handover: req.query.extract_handover
    });
});

/**
 * 保存出库信息
 */
router.post('/addCk', (req, res) => {
    receiveService.insertCk(req.body, (err, result) => {
        console.error(err);
        let errMsg = JSON.stringify(err);
        utils.jsonpAndEnd(res, `parent.parent.addCkCb(${result ? result.changedRows : null}, '${errMsg}');`);
    });
});

/**
 * 查询剩余数量
 */
router.post('/getByBarcodeShort', (req, res) => {
    receiveService.selectDnaFlowByBarcodeShort(req.body.barcode_long, (err, rows) => {
        //console.log(err);
        if (err)throw err;
        res.send(rows);
    });
});

/**
 * 导出excel
 */
router.post('/exportExcel', (req, res) => {
    // let dataStr = req.body.data;
    // let params = JSON.parse(dataStr);
    receiveService.listAll(req.body, (err, rows) => {
        if (err)throw err;
        if (rows && rows.length > 0) {
            let dataset = JSON.parse(JSON.stringify(rows));

            let styles = {
                title: {
                    font: {
                        sz: 30,
                        bold: true
                    }
                },
                header: {
                    // fill: {
                    //     fgColor: {
                    // rgb: '00000000'
                    // }
                    // },
                    font: {
                        color: {
                            // rgb: 'FFFFFFFF'
                        },
                        sz: 14,
                        bold: true,
                        underline: false
                    }
                },
                cell: {
                    // fill: {
                    //     fgColor: {
                    //         rgb: '00000000'
                    // }
                    // }
                }
            };

            let heading = [
                [{value: '标签接收数据导出', style: styles.header}],
            ];

            let specification = {
                barcode_long: {
                    displayName: '条码编号',
                    headerStyle: styles.header,
                    cellStyle: styles.cell,
                    cellFormat: function (value, row) {
                        return value || '';
                    },
                    width: '15'
                },
                hospital: {
                    displayName: '医院名称',
                    headerStyle: styles.header,
                    cellStyle: styles.cell,
                    cellFormat: function (value, row) {
                        return value || '';
                    },
                    width: '15'
                },
                sample_code: {
                    displayName: '样本编号',
                    headerStyle: styles.header,
                    cellStyle: styles.cell,
                    cellFormat: function (value, row) {
                        return value || '';
                    },
                    width: '15'
                },
                sample_date: {
                    displayName: '采样日期',
                    headerStyle: styles.header,
                    cellStyle: styles.cell,
                    cellFormat: function (value, row) {
                        return value || '';
                    },
                    width: '15'
                },
                receive_date: {
                    displayName: '接收日期',
                    headerStyle: styles.header,
                    cellStyle: styles.cell,
                    cellFormat: function (value, row) {
                        return value || '';
                    },
                    width: '15'
                },
                real_name: {
                    displayName: '姓名',
                    headerStyle: styles.header,
                    cellStyle: styles.cell,
                    cellFormat: function (value, row) {
                        return value || '';
                    },
                    width: '15'
                },
                id_card: {
                    displayName: '身份证',
                    headerStyle: styles.header,
                    cellStyle: styles.cell,
                    cellFormat: function (value, row) {
                        return value || '';
                    },
                    width: '15'
                },
                age: {
                    displayName: '年龄',
                    headerStyle: styles.header,
                    cellStyle: styles.cell,
                    cellFormat: function (value, row) {
                        return value || '';
                    },
                    width: '15'
                },
                pregnancy_week: {
                    displayName: '孕周',
                    headerStyle: styles.header,
                    cellStyle: styles.cell,
                    cellFormat: function (value, row) {
                        return value || '';
                    },
                    width: '15'
                },
                pregnancy_day: {
                    displayName: '孕天',
                    headerStyle: styles.header,
                    cellStyle: styles.cell,
                    cellFormat: function (value, row) {
                        return value || '';
                    },
                    width: '15'
                },
                pregnancy_condition: {
                    displayName: '妊娠情况',
                    headerStyle: styles.header,
                    cellStyle: styles.cell,
                    cellFormat: function (value, row) {
                        return value || '';
                    },
                    width: '15'
                },
                pregnancy_bad_history: {
                    displayName: '不良孕产史',
                    headerStyle: styles.header,
                    cellStyle: styles.cell,
                    cellFormat: function (value, row) {
                        return value || '';
                    },
                    width: '15'
                },
                comments: {
                    displayName: '备注',
                    headerStyle: styles.header,
                    cellStyle: styles.cell,
                    cellFormat: function (value, row) {
                        return value || '';
                    },
                    width: '15'
                },
                inputter: {
                    displayName: '录入人员',
                    headerStyle: styles.header,
                    cellStyle: styles.cell,
                    cellFormat: function (value, row) {
                        return value || '';
                    },
                    width: '15'
                },
                input_date: {
                    displayName: '录入日期',
                    headerStyle: styles.header,
                    cellStyle: styles.cell,
                    cellFormat: function (value, row) {
                        return value || '';
                    },
                    width: '15'
                },
                changer: {
                    displayName: '换管人员',
                    headerStyle: styles.header,
                    cellStyle: styles.cell,
                    cellFormat: function (value, row) {
                        return value || '';
                    },
                    width: '15'
                },
                change_date: {
                    displayName: '换管日期',
                    headerStyle: styles.header,
                    cellStyle: styles.cell,
                    cellFormat: function (value, row) {
                        return value || '';
                    },
                    width: '15'
                },
                checker: {
                    displayName: '审批人员',
                    headerStyle: styles.header,
                    cellStyle: styles.cell,
                    cellFormat: function (value, row) {
                        return value || '';
                    },
                    width: '15'
                },
                check_date: {
                    displayName: '审批日期',
                    headerStyle: styles.header,
                    cellStyle: styles.cell,
                    cellFormat: function (value, row) {
                        return value || '';
                    },
                    width: '15'
                },
                warehouser: {
                    displayName: '采血管入库人',
                    headerStyle: styles.header,
                    cellStyle: styles.cell,
                    cellFormat: function (value, row) {
                        return value || '';
                    },
                    width: '15'
                },
                warehouse_place: {
                    displayName: '采血管入库位置',
                    headerStyle: styles.header,
                    cellStyle: styles.cell,
                    cellFormat: function (value, row) {
                        return value || '';
                    },
                    width: '15'
                },
                warehouse_date: {
                    displayName: '采血管入库时间',
                    headerStyle: styles.header,
                    cellStyle: styles.cell,
                    cellFormat: function (value, row) {
                        return value || '';
                    },
                    width: '15'
                },
                // barcode_short: {
                //     displayName: '短条码编号',
                //     headerStyle: styles.header,
                //     cellStyle: styles.cell,
                //     cellFormat: function (value, row) {
                //         return value || '';
                //     },
                //     width: '15'
                // },
                sample_outer: {
                    displayName: '采血管出库人',
                    headerStyle: styles.header,
                    cellStyle: styles.cell,
                    cellFormat: function (value, row) {
                        return value || '';
                    },
                    width: '15'
                },
                sample_out_residue: {
                    displayName: '接收组样本剩余量',
                    headerStyle: styles.header,
                    cellStyle: styles.cell,
                    cellFormat: function (value, row) {
                        return value || '';
                    },
                    width: '15'
                },
                status: {
                    displayName: '状态',
                    headerStyle: styles.header,
                    cellStyle: styles.cell,
                    cellFormat: function (value, row) {
                        let text = '';
                        switch (value) {
                            case 0:
                                text = '已删除';
                                break;
                            case 1:
                                text = '已录入';
                                break;
                            case 2:
                                text = '已审批';
                                break;
                            case 3:
                                text = '已入库';
                                break;
                            case 4:
                                text = '已出库';
                                break;
                            case 5:
                                text = '已提取';
                                break;
                            case 6:
                                text = '提取合格';
                                break;
                            case 7:
                                text = '提取废弃';
                                break;
                            case 8:
                                text = '重提取';
                                break;
                            case 9:
                                text = '提取已交接';
                                break;
                            case 10:
                                text = '已建库';
                                break;
                            case 11:
                                text = '建库合格';
                                break;
                            case 12:
                                text = '建库废弃';
                                break;
                            case 13:
                                text = '重建库';
                                break;
                            case 14:
                                text = '建库已交接';
                                break;
                            case 15:
                                text = '已上机';
                                break;
                            case 16:
                                text = '上机合格';
                                break;
                            case 17:
                                text = '上机废弃';
                                break;
                            case 18:
                                text = '重上机';
                                break;
                            case 19:
                                text = '上机已交接';
                                break;
                            case 20:
                                text = '已分析';
                                break;
                            case 21:
                                text = '报告已发送';
                                break;
                            default:
                                text = '';
                        }
                        return text;
                    },
                    width: '15'
                }
            };

            let report = excel.buildExport(
                [
                    {
                        name: '标签接收数据导出',
                        heading: heading,
                        specification: specification,
                        data: dataset
                    }
                ]
            );

            res.attachment('标签接收数据导出.xlsx'); // This is sails.js specific (in general you need to set headers)
            return res.send(report);
        } else {
            let msg = encodeURI('没有数据可导出');
            return utils.jsonpAndEnd(res, `alert(decodeURI('${msg}'));window.close();`)
        }

    });
});

module.exports = router;
