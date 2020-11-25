/**
 * Created by fy on 16-12-29.
 */
'use strict';
const sp = require('../../lib/pager/select-pager');
const db = require('../../config/db');
const util = require('../../lib/utils');
const _ = require('underscore');
const dnaService = require('../../service/dna/index');

function getSqls(params) {
    let selectSql = `SELECT 
        id,
        barcode_long,
        extract_outer,
        extract_out_residue,
        storage_handover,
        storage_handover_date,
        extract_qbite_deep,
        extract_epoch_deep,
        extract_purity_deep,
        extract_part_size,
        extract_part_after_break,
        storage_deep,
        storage_index,
        storage_part_size,
        storager,
        storage_date,
        storage_checker,
        storage_check_date,
        storage_outer,
        storage_out_residue,
        status 
    FROM dna_flow `;

    let whereSql = " WHERE 1 = 1 \n";
    params.barcode_long && (whereSql += " AND barcode_long LIKE '%:barcode_long%' /*条码编号*/\n");
    // params.barcode_short && (whereSql += " AND barcode_short LIKE '%:barcode_short%' /*短条码编号*/\n");
    params.extract_outer && (whereSql += " AND extract_outer LIKE '%:extract_outer%' /*提取出库人*/\n");
    params.extract_out_residue && (whereSql += " AND extract_out_residue LIKE '%:extract_out_residue%' /*提取组样本剩余量*/\n");
    params.storage_handover && (whereSql += " AND storage_handover LIKE '%:storage_handover%' /*建库组接收人*/\n");
    params.storage_handover_date && (whereSql += " AND storage_handover_date LIKE '%:storage_handover_date%' /*建库组接收时间*/\n");
    params.extract_qbite_deep && (whereSql += " AND extract_qbite_deep LIKE '%:extract_qbite_deep%' /*Qubit浓度(ng/ul)*/\n");
    params.extract_epoch_deep && (whereSql += " AND extract_epoch_deep LIKE '%:extract_epoch_deep%' /*epoch浓度(ng/ul)*/\n");
    params.extract_purity_deep && (whereSql += " AND extract_purity_deep LIKE '%:extract_purity_deep%' /*纯度(%)*/\n");
    params.extract_part_size && (whereSql += " AND extract_part_size LIKE '%:extract_part_size%' /*片段大小(bp)*/\n");
    params.extract_part_after_break && (whereSql += " AND extract_part_after_break LIKE '%:extract_part_after_break%' /*打断后片段(bp)*/\n");
    params.storage_deep && (whereSql += " AND storage_deep LIKE '%:storage_deep%' /*建库浓度(ng/ul)*/\n");
    params.storage_index && (whereSql += " AND storage_index LIKE '%:storage_index%' /*建库index号*/\n");
    params.storage_part_size && (whereSql += " AND storage_part_size LIKE '%:storage_part_size%' /*建库片段大小(bp)*/\n");
    params.storager && (whereSql += " AND storager LIKE '%:storager%' /*建库人*/\n");
    params.storage_date && (whereSql += " AND storage_date LIKE '%:storage_date%' /*建库时间*/\n");
    params.storage_checker && (whereSql += " AND storage_checker LIKE '%:storage_checker%' /*建库审查人*/\n");
    params.storage_check_date && (whereSql += " AND storage_check_date LIKE '%:storage_check_date%' /*建库审查时间*/\n");
    params.storage_outer && (whereSql += " AND storage_outer LIKE '%:storage_outer%' /*建库组出库人*/\n");
    params.storage_out_residue && (whereSql += " AND storage_out_residue LIKE '%:storage_out_residue%' /*建库组样本剩余量*/\n");
    let status = params.status;
    if (status == '-1' || status == undefined) { // 全部
        whereSql += " AND status IN (9,10,11,12,13,14) /*状态*/\n";
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
    db.pool.query(sqls.sql, params, cb);
};

/**
 * 修改信息
 * @param dnaFlow
 * @param cb
 */
exports.updateDnaFlowById = (dnaFlow, cb) => {
    let id = dnaFlow.id;
    delete dnaFlow.id;
    dnaFlow.storage_date = util.now();
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
 * 审核
 * @param sh
 * @param cb
 */
exports.updateSh = (sh, cb) => {
    //console.log(sh.ids);
    let sql = 'UPDATE dna_flow AS t SET t.storage_checker="' + sh.checker + '", t.storage_check_date=NOW(), t.status=11 WHERE t.id in (' + sh.ids + ')';
    //console.log(sql);
    db.pool.query(sql, cb);
};

/**
 * 保存出库信息
 * @param ck
 * @param cb
 */
exports.insertCk = (ck, cb) => {
    let storage_outer = ck.ckUserId;
    let operate_handover = ck.jjUserId;
    let ids = ck.ids;
    //console.log(ids);
    let updateSql = ['UPDATE dna_flow SET storage_outer="', storage_outer, '", operate_handover="', operate_handover, '", operate_handover_date=NOW(), status=14 /*建库已交接*/  WHERE id IN (', ids, ')'].join('');
    //console.log(updateSql);
    db.pool.query(updateSql, cb);
};

/**
 * 根据barcode short查询
 * @param barcodeShort
 * @param cb
 */
exports.selectDnaFlowByBarcodeShort = (barcodeShort, cb) => {
    db.pool.query('SELECT * FROM dna_flow AS t WHERE t.barcode_long=?', barcodeShort, cb);
};

/**
 * 重做
 * @param params
 * @param cb
 */
exports.redo = (params, cb) => {
    dnaService.backup(params.checker, params.ids, (err, result) => {
        if (err)throw err;
        if (result && result.insertId) {
            let clearColumnSql = `UPDATE dna_flow SET storage_handover = NULL, storage_handover_date = NULL, storage_deep = NULL,
             storage_index = NULL, storage_part_size = NULL, storager = NULL, storage_date = NULL, storage_checker = NULL,
             storage_check_date = NULL, storage_outer = NULL, storage_out_residue = NULL, status=13
            WHERE id IN (${params.ids})`;
            db.pool.query(clearColumnSql, cb);
        } else {
            cb(new Error('保存失败!'), null);
        }
    });
};