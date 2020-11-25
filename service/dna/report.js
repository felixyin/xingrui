/**
 * Created by fy on 16-12-29.
 */
'use strict';
const sp = require('../../lib/pager/select-pager');
const db = require('../../config/db');
const util = require('../../lib/utils');
const _ = require('underscore');

function getSqls(params) {
    let selectSql = `SELECT 
        id,
        barcode_long,
        operate_outer,
        operate_out_residue,
        report_handover,
        report_handover_date,
        operate_chip_code,
        operate_reads_val,
        operate_q30_val,
        report_result,
        report_advice,
        report_is_send,
        reporter,
        report_date,
        report_sender,
        report_send_date,
        status
    FROM dna_flow `;

    let whereSql = " WHERE 1 = 1 \n";

    params.barcode_long && (whereSql += " AND barcode_long LIKE '%:barcode_long%' /*条码编号*/\n");
    // params.barcode_short && (whereSql += " AND barcode_short LIKE '%:barcode_short%' /*短条码编号*/\n");
    params.operate_outer && (whereSql += " AND operate_outer LIKE '%:operate_outer%' /*上机组出库人*/\n");
    params.operate_out_residue && (whereSql += " AND operate_out_residue LIKE '%:operate_out_residue%' /*上机组样本剩余量*/\n");
    params.report_handover && (whereSql += " AND report_handover LIKE '%:report_handover%' /*分析报告组接收人*/\n");
    params.report_handover_date && (whereSql += " AND report_handover_date LIKE '%:report_handover_date%' /*分析报告组接收时间*/\n");
    params.operate_chip_code && (whereSql += " AND operate_chip_code LIKE '%:operate_chip_code%' /*上机芯片编码*/\n");
    params.operate_reads_val && (whereSql += " AND operate_reads_val LIKE '%:operate_reads_val%' /*上机reads数*/\n");
    params.operate_q30_val && (whereSql += " AND operate_q30_val LIKE '%:operate_q30_val%' /*上机q30值*/\n");
    params.report_result && (whereSql += " AND report_result LIKE '%:report_result%' /*分析结果*/\n");
    params.report_advice && (whereSql += " AND report_advice LIKE '%:report_advice%' /*建议*/\n");
    params.report_is_send && (whereSql += " AND report_is_send LIKE '%:report_is_send%' /*是否发送（1、不发送；2、发送）*/\n");
    params.reporter && (whereSql += " AND reporter LIKE '%:reporter%' /*分析人*/\n");
    params.report_date && (whereSql += " AND report_date LIKE '%:report_date%' /*分析时间*/\n");
    params.report_sender && (whereSql += " AND report_sender LIKE '%:report_sender%' /*报告发送人*/\n");
    params.report_send_date && (whereSql += " AND report_send_date LIKE '%:report_send_date%' /*报告发送时间*/\n");
    let status = params.status;
    if (status == '-1' || status == undefined) { // 全部
        whereSql += " AND status IN (19,20,21) /*状态*/\n";
    } else {
        whereSql += " AND status = :status /*状态*/\n";
    }

    return {
        selectSql: selectSql,
        whereSql: whereSql,
        sql: selectSql + whereSql
    };
}

/**
 * 分页sql
 * @param req
 * @param res
 */
exports.list = (req, res) => {
    let sqls = getSqls(req.body);
    sp.selectPager(req, res, db, sqls.selectSql, sqls.whereSql);
};

/**
 * 查询所有
 * @params params
 * @params cb
 */
exports.listAll = (params, cb) => {
    let sqls = getSqls(params);
    sp.selectAll(db, sqls.sql, params, cb);
};

/**
 * 修改信息
 * @param dnaFlow
 * @param cb
 */
exports.updateDnaFlowById = (dnaFlow, cb) => {
    let id = dnaFlow.id;
    delete dnaFlow.id;
    dnaFlow.report_date = util.now();
    let uss = util.getUpdateSeletiveSql(dnaFlow);
    uss.param.push(id);
    db.pool.query('UPDATE dna_flow SET' + uss.sql + 'WHERE id=?', uss.param, cb);
};

/**
 * 查询数据,根据id
 * @param id
 * @param cb
 */
exports.selectDnaFlowById = (id, cb) => {
    db.pool.query('SELECT * FROM dna_flow AS t WHERE t.id=?', id, cb);
};

/**
 * 发送
 * @param sh
 * @param cb
 */
exports.updateFs = (sh, cb) => {
    //console.log(sh.ids);
    let sql = 'UPDATE dna_flow AS t SET t.report_sender="' + sh.userId + '", t.report_send_date=NOW(), t.status=21 WHERE t.id in (' + sh.ids + ')';
    //console.log(sql);
    db.pool.query(sql, cb);
};

/**
 * 根据barcode short查询
 * @param barcodeShort
 * @param cb
 */
exports.selectDnaFlowByBarcodeShort = (barcodeShort, cb) => {
    db.pool.query('SELECT * FROM dna_flow AS t WHERE t.barcode_long=?', barcodeShort, cb);
};
