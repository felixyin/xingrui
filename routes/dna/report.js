/**
 * Created by fy on 2016/12/29.
 */

'use strict';
const express = require('express');
const router = express.Router();
const fs = require('fs');
const utils = require('../../lib/utils');
const reportService = require('../../service/dna/report');
const excel = require('node-excel-export');

router.get('/', (req, res) => {
    res.render('dna/report/list');
});

router.route('/list').get(reportService.list).post(reportService.list);

/**
 * 显示修改界面
 */
router.get('/preEdit', (req, res) => {
    reportService.selectDnaFlowById(req.query.id, (err, rows) => {
        console.error(err);
        if (rows && rows.length == 1) {
            let row = rows[0];
            row.action = '/dna/report/edit';
            row.reporter = req.query.userId;
            row.status = 20;// 已分析
            res.render('dna/report/edit', row);
        }
    });
});

/**
 * 修改信息
 */
router.post('/edit', (req, res) => {
    let params = req.body;
    params.report_date = utils.now();
    reportService.updateDnaFlowById(params, (err, result) => {
        console.error(err);
        let errMsg = JSON.stringify(err);
        utils.jsonpAndEnd(res, `parent.parent.editCb(${result ? result.changedRows : null}, '${errMsg}');`);
    });
});

/**
 * 发送
 */
router.post('/addFs', (req, res) => {
    reportService.updateFs(req.body, (err, result) => {
        res.send({
            changedRows: result.changedRows,
            err: err
        });
    });
});

/**
 * 查询剩余数量
 */
router.post('/getByBarcodeShort', (req, res) => {
    reportService.selectDnaFlowByBarcodeShort(req.body.barcode_long, (err, rows) => {
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
    reportService.listAll(req.body, (err, rows) => {
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
                [{value: '分析报告数据导出', style: styles.header}],
            ];

            let specification = {
                barcode_long: {
                    displayName: '条码编号',
                    headerStyle: styles.header,
                    cellStyle: styles.cell,
                    cellFormat: function (value, row) {
                        return value;
                    },
                    width: '15'
                },
                operate_outer: {
                    displayName: '上机组出库人',
                    headerStyle: styles.header,
                    cellStyle: styles.cell,
                    cellFormat: function (value, row) {
                        return value || '';
                    },
                    width: '15'
                },
                operate_out_residue: {
                    displayName: '上机组样本剩余量',
                    headerStyle: styles.header,
                    cellStyle: styles.cell,
                    cellFormat: function (value, row) {
                        return value || '';
                    },
                    width: '15'
                },
                report_handover: {
                    displayName: '分析报告组接收人',
                    headerStyle: styles.header,
                    cellStyle: styles.cell,
                    cellFormat: function (value, row) {
                        return value || '';
                    },
                    width: '15'
                },
                report_handover_date: {
                    displayName: '分析报告组接收时间',
                    headerStyle: styles.header,
                    cellStyle: styles.cell,
                    cellFormat: function (value, row) {
                        return value || '';
                    },
                    width: '15'
                },
                operate_chip_code: {
                    displayName: '上机芯片编码',
                    headerStyle: styles.header,
                    cellStyle: styles.cell,
                    cellFormat: function (value, row) {
                        return value || '';
                    },
                    width: '15'
                },
                operate_reads_val: {
                    displayName: '上机reads数',
                    headerStyle: styles.header,
                    cellStyle: styles.cell,
                    cellFormat: function (value, row) {
                        return value || '';
                    },
                    width: '15'
                },
                operate_q30_val: {
                    displayName: '上机q30值',
                    headerStyle: styles.header,
                    cellStyle: styles.cell,
                    cellFormat: function (value, row) {
                        return value || '';
                    },
                    width: '15'
                },
                report_result: {
                    displayName: '分析结果',
                    headerStyle: styles.header,
                    cellStyle: styles.cell,
                    cellFormat: function (value, row) {
                        return value || '';
                    },
                    width: '15'
                },
                report_advice: {
                    displayName: '建议',
                    headerStyle: styles.header,
                    cellStyle: styles.cell,
                    cellFormat: function (value, row) {
                        return value || '';
                    },
                    width: '15'
                },
                report_is_send: {
                    displayName: '是否发送',
                    headerStyle: styles.header,
                    cellStyle: styles.cell,
                    cellFormat: function (value, row) {
                        if (value == 1) {
                            return '不发送';
                        } else if (value == 2) {
                            return '发送';
                        } else {
                            return '未知';
                        }
                    },
                    width: '15'
                },
                reporter: {
                    displayName: '分析人',
                    headerStyle: styles.header,
                    cellStyle: styles.cell,
                    cellFormat: function (value, row) {
                        return value || '';
                    },
                    width: '15'
                },
                report_date: {
                    displayName: '分析时间',
                    headerStyle: styles.header,
                    cellStyle: styles.cell,
                    cellFormat: function (value, row) {
                        return value || '';
                    },
                    width: '15'
                },
                report_sender: {
                    displayName: '报告发送人',
                    headerStyle: styles.header,
                    cellStyle: styles.cell,
                    cellFormat: function (value, row) {
                        return value || '';
                    },
                    width: '15'
                },
                report_send_date: {
                    displayName: '报告发送时间',
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
                        name: '分析报告收数据导出',
                        heading: heading,
                        specification: specification,
                        data: dataset
                    }
                ]
            );

            res.attachment('分析报告数据导出.xlsx'); // This is sails.js specific (in general you need to set headers)
            return res.send(report);
        } else {
            let msg = encodeURI('没有数据可导出');
            return utils.jsonpAndEnd(res, `alert(decodeURI('${msg}'));window.close();`)
        }

    });
});

module.exports = router;
