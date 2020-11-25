/**
 * Created by fy on 16-12-29.
 */
'use strict';
const sp = require('../../lib/pager/select-pager');
const db = require('../../config/db');
const util = require('../../lib/utils');
const _ = require('underscore');

function getSql(params) {
    let selectSql = `SELECT 
        id, barcode_long, hospital, sample_code, sample_date, receive_date, real_name, id_card, age, pregnancy_week, pregnancy_day, pregnancy_condition,
        pregnancy_bad_history, comments, inputter, input_date, checker, check_date, warehouser, warehouse_place, warehouse_date,
        sample_outer, sample_out_residue, status
    FROM dna_flow `;
    let whereSql = " WHERE 1 = 1 \n";
    params.barcode_long && (whereSql += " AND barcode_long LIKE '%:barcode_long%' /*条码编号*/\n");
    params.hospital && (whereSql += " AND hospital LIKE '%:hospital%' /*医院名称*/\n");
    params.sample_code && (whereSql += " AND sample_code LIKE '%:sample_code%' /*样本编号*/\n");
    params.sample_date && (whereSql += " AND sample_date LIKE '%:sample_date%' /*采样日期*/\n");
    params.receive_date && (whereSql += " AND receive_date LIKE '%:receive_date%' /*接收日期*/\n");
    params.real_name && (whereSql += " AND real_name LIKE '%:real_name%' /*姓名*/\n");
    params.id_card && (whereSql += " AND id_card LIKE '%:id_card%' /*身份证*/\n");
    params.age && (whereSql += " AND age LIKE '%:age%' /*年龄*/\n");
    params.pregnancy_week && (whereSql += " AND pregnancy_week LIKE '%:pregnancy_week%' /*孕周*/\n");
    params.pregnancy_day && (whereSql += " AND pregnancy_day LIKE '%:pregnancy_day%' /*孕天*/\n");
    params.pregnancy_condition && (whereSql += " AND pregnancy_condition LIKE '%:pregnancy_condition%' /*妊娠情况*/\n");
    params.pregnancy_bad_history && (whereSql += " AND pregnancy_bad_history LIKE '%:pregnancy_bad_history%' /*不良孕产史*/\n");
    params.comments && (whereSql += " AND comments LIKE '%:comments%' /*备注*/\n");
    params.inputter && (whereSql += " AND inputter LIKE '%:inputter%' /*录入人员*/\n");
    params.input_date && (whereSql += " AND input_date LIKE '%:input_date%' /*录入日期*/\n");
    params.checker && (whereSql += " AND checker LIKE '%:checker%' /*审批人员*/\n");
    params.check_date && (whereSql += " AND check_date LIKE '%:check_date%' /*审批日期*/\n");
    params.warehouser && (whereSql += " AND warehouser LIKE '%:warehouser%' /*入库人*/\n");
    params.warehouse_place && (whereSql += " AND warehouse_place LIKE '%:warehouse_place%' /*入库位置*/\n");
    params.warehouse_date && (whereSql += " AND warehouse_date LIKE '%:warehouse_date%' /*入库时间*/\n");
    // params.barcode_short && (whereSql += " AND barcode_short LIKE '%:barcode_short%' /*短条码编号*/\n");
    params.sample_outer && (whereSql += " AND sample_outer LIKE '%:sample_outer%' /*采血管出库人*/\n");
    params.sample_out_residue && (whereSql += " AND sample_out_residue LIKE '%:sample_out_residue%' /*接收组样本剩余量*/\n");
    let status = params.status;
    if (status == '-1' || status == undefined) { // 全部
        whereSql += " AND status IN (1,2,3,4) /*状态*/\n";
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
    let sqls = getSql(req.body);
    sp.selectPager(req, res, db, sqls.selectSql, sqls.whereSql);
};

/**
 * 查询所有
 * @params params
 * @params cb
 */
exports.listAll = (params, cb) => {
    let sqls = getSql(params);
    sp.selectAll(db, sqls.sql, params, cb);
};

/**
 * 保存采血单信息
 * @param cxd
 * @param cb
 */
exports.insertCxd = (cxd, cb) => {
    delete cxd.id;
    cxd.input_date = util.now();
    let iss = util.getInsertSeletiveSql(cxd);
    // //console.log(iss);
    db.pool.query('INSERT INTO dna_flow' + iss.sql, iss.param, cb);
};

/**
 * 修改采血单信息
 * @param dnaFlow
 * @param cb
 */
exports.updateDnaFlowById = (dnaFlow, cb) => {
    let id = dnaFlow.id;
    delete dnaFlow.id;
    dnaFlow.input_date = util.now();
    let uss = util.getUpdateSeletiveSql(dnaFlow);
    uss.param.push(id);
    db.pool.query('UPDATE dna_flow SET' + uss.sql + 'WHERE id=?', uss.param, cb);
};

/**
 * 查询采血单数据,根据id
 * @param id
 * @param cb
 */
exports.selectDnaFlowById = (id, cb) => {
    db.pool.query('SELECT * FROM dna_flow AS t WHERE t.id=?', id, cb);
};

/**
 * 更换采血管信息
 * @param cxg
 * @param cb
 */
exports.updateCxg = (cxg, cb) => {
    let barcode_long = cxg.barcode_long;
    delete cxg.barcode_long;
    cxg.change_date = util.now();
    let uss = util.getUpdateSeletiveSql(cxg);
    uss.param.push(barcode_long);
    db.pool.query('UPDATE dna_flow SET' + uss.sql + 'WHERE barcode_long =?', uss.param, cb);
};

/**
 * 审核
 * @param sh
 * @param cb                                                               接收日期字段是：receive_date，审核操作数据库的脚本（下面的sql）没有找到这个字段呀？？？？
 */
exports.updateSh = (sh, cb) => {
    // //console.log(sh.ids);
    let sql = 'UPDATE dna_flow AS t SET t.checker="' + sh.checker + '", t.check_date=NOW(), t.sample_out_residue =2, t.status=2 WHERE t.id in (' + sh.ids + ')';
    //console.log(sql);
    db.pool.query(sql, cb);
};

/**
 * 入库
 * @param rk
 * @param cb
 */
exports.updateRk = (rk, cb) => {
    //console.log(rk);
    let sql = 'UPDATE dna_flow AS t SET t.warehouser="' + rk.warehouser + '", t.warehouse_place="' + rk.warehouse_place + '", t.warehouse_date=NOW(), t.status =3 WHERE t.id in (' + rk.ids + ')';
    db.pool.query(sql, cb);
};

/**
 * 导出条码编码到barcode表中
 * @param barcodes
 * @param cb
 */
exports.printBarcode = (barcodes, cb) => {
    db.pool.query('DELETE FROM dna_print', (err, result) => {
        if (err)throw err;
        db.pool.query(`INSERT INTO dna_print (barcode) SELECT barcode_long FROM dna_flow t WHERE t.id in (${barcodes}) ORDER BY sample_date DESC`, cb);
    });
};

/**
 * 保存出库信息
 * @param ck
 * @param cb
 */
exports.insertCk = (ck, cb) => {
    let sample_outer = ck.sample_outer;
    let extract_handover = ck.extract_handover;
    let bsArray = ck.barcode_long;
    bsArray.pop();
    //console.log(bsArray);
    let updateSql = ['UPDATE dna_flow SET sample_outer="', sample_outer, '", extract_handover="', extract_handover, '", extract_handover_date=NOW(), status=4  WHERE barcode_long IN ("', bsArray.join('", "'), '")'].join('');
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
