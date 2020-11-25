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
        id, barcode_long, hospital, sample_code, sample_date, receive_date, real_name, id_card, age, pregnancy_week, pregnancy_day, pregnancy_condition, pregnancy_bad_history,
        comments, inputter, input_date, changer, change_date, checker, check_date, warehouser, warehouse_place, warehouse_date, sample_outer,
        sample_out_residue, extract_handover, extract_handover_date, extract_qbite_deep, extract_epoch_deep, extract_purity_deep, extract_part_size, 
        extract_part_after_break, extracter, extract_date, extract_checker, extract_check_date, extract_outer, extract_out_residue, storage_handover, 
        storage_handover_date, storage_deep, storage_index, storage_part_size, storager, storage_date, storage_checker, storage_check_date, storage_outer, 
        storage_out_residue, operate_handover, operate_handover_date, operate_chip_code, operate_reads_val, operate_q30_val, operater, operate_date,
        operate_checker, operate_check_date, operate_outer, operate_out_residue, report_handover, report_handover_date, report_result, report_advice, 
        report_is_send, reporter, report_date, report_sender, report_send_date, status
    FROM `;
    let show_is_his = params.show_is_his;
    //console.log(show_is_his);
    if (show_is_his === '1') {
        selectSql += " view_dna_flow";
    } else if (show_is_his === '2') {
        selectSql += " dna_flow_his";
    } else {
        selectSql += " dna_flow";
    }

    let whereSql = " WHERE 1 = 1 \n";

    params.id && (whereSql += " AND id LIKE '%:id%' /**/\n");
    params.barcode_long && (whereSql += " AND barcode_long LIKE '%:barcode_long%' /*长条码编号*/\n");
    params.hospital && (whereSql += " AND hospital LIKE '%:hospital%' /*医院名称*/\n");
    params.sample_code && (whereSql += " AND sample_code LIKE '%:sample_code%' /*样本编号*/\n");
    params.sample_date && (whereSql += util.daterange(params, 'sample_date', '采样日期'));
    params.receive_date && (whereSql += util.daterange(params, 'receive_date', '接收日期'));
    params.real_name && (whereSql += " AND real_name LIKE '%:real_name%' /*姓名*/\n");
    params.id_card && (whereSql += " AND id_card LIKE '%:id_card%' /*身份证*/\n");
    params.age && (whereSql += " AND age LIKE '%:age%' /*年龄*/\n");
    params.pregnancy_week && (whereSql += " AND pregnancy_week LIKE '%:pregnancy_week%' /*孕周*/\n");
    params.pregnancy_day && (whereSql += " AND pregnancy_day LIKE '%:pregnancy_day%' /*孕天*/\n");
    params.pregnancy_condition && (whereSql += " AND pregnancy_condition LIKE '%:pregnancy_condition%' /*妊娠情况*/\n");
    params.pregnancy_bad_history && (whereSql += " AND pregnancy_bad_history LIKE '%:pregnancy_bad_history%' /*不良孕产史*/\n");
    params.comments && (whereSql += " AND comments LIKE '%:comments%' /*备注*/\n");
    params.inputter && (whereSql += " AND inputter LIKE '%:inputter%' /*录入人员*/\n");
    params.input_date && (whereSql += util.daterange(params, 'input_date', '录入日期'));
    params.changer && (whereSql += " AND changer LIKE '%:changer%' /*换管人员*/\n");
    params.change_date && (whereSql += util.daterange(params, 'change_date', '换管日期'));
    params.checker && (whereSql += " AND checker LIKE '%:checker%' /*审批人员*/\n");
    params.check_date && (whereSql += util.daterange(params, 'check_date', '审批日期'));
    params.warehouser && (whereSql += " AND warehouser LIKE '%:warehouser%' /*采血管入库人*/\n");
    params.warehouse_place && (whereSql += " AND warehouse_place LIKE '%:warehouse_place%' /*采血管入库位置*/\n");
    params.warehouse_date && (whereSql += util.daterange(params, 'warehouse_date', '采血管入库时间'));
    params.sample_outer && (whereSql += " AND sample_outer LIKE '%:sample_outer%' /*短采血管出库人*/\n");
    params.sample_out_residue && (whereSql += " AND sample_out_residue LIKE '%:sample_out_residue%' /*接收组试管剩余数量*/\n");
    params.extract_handover && (whereSql += " AND extract_handover LIKE '%:extract_handover%' /*提取组接收人*/\n");
    params.extract_handover_date && (whereSql += util.daterange(params, 'extract_handover_date', '提取组接收时间'));
    params.extract_qbite_deep && (whereSql += " AND extract_qbite_deep LIKE '%:extract_qbite_deep%' /*qbite浓度*/\n");
    params.extract_epoch_deep && (whereSql += " AND extract_epoch_deep LIKE '%:extract_epoch_deep%' /*epoch浓度*/\n");
    params.extract_purity_deep && (whereSql += " AND extract_purity_deep LIKE '%:extract_purity_deep%' /*纯度*/\n");
    params.extract_part_size && (whereSql += " AND extract_part_size LIKE '%:extract_part_size%' /*片段大小*/\n");
    params.extract_part_after_break && (whereSql += " AND extract_part_after_break LIKE '%:extract_part_after_break%' /*打断后片段*/\n");
    params.extracter && (whereSql += " AND extracter LIKE '%:extracter%' /*提取人员*/\n");
    params.extract_date && (whereSql += util.daterange(params, 'extract_date', '提取时间'));
    params.extract_checker && (whereSql += " AND extract_checker LIKE '%:extract_checker%' /*提取审核人*/\n");
    params.extract_check_date && (whereSql += util.daterange(params, 'extract_check_date', '提取审核时间'));
    params.extract_outer && (whereSql += " AND extract_outer LIKE '%:extract_outer%' /*提取出库人*/\n");
    params.extract_out_residue && (whereSql += " AND extract_out_residue LIKE '%:extract_out_residue%' /*提取组试管剩余数量*/\n");
    params.storage_handover && (whereSql += " AND storage_handover LIKE '%:storage_handover%' /*建库组接收人*/\n");
    params.storage_handover_date && (whereSql += util.daterange(params, 'storage_handover_date', '建库组接收时间'));
    params.storage_deep && (whereSql += " AND storage_deep LIKE '%:storage_deep%' /*建库浓度*/\n");
    params.storage_index && (whereSql += " AND storage_index LIKE '%:storage_index%' /*建库index号*/\n");
    params.storage_part_size && (whereSql += " AND storage_part_size LIKE '%:storage_part_size%' /*建库片段大小*/\n");
    params.storager && (whereSql += " AND storager LIKE '%:storager%' /*建库人*/\n");
    params.storage_date && (whereSql += util.daterange(params, 'storage_date', '建库时间'));
    params.storage_checker && (whereSql += " AND storage_checker LIKE '%:storage_checker%' /*建库审查人*/\n");
    params.storage_check_date && (whereSql += util.daterange(params, 'storage_check_date', '建库审查时间'));
    params.storage_outer && (whereSql += " AND storage_outer LIKE '%:storage_outer%' /*建库组出库人*/\n");
    params.storage_out_residue && (whereSql += " AND storage_out_residue LIKE '%:storage_out_residue%' /*建库组试管剩余数量*/\n");
    params.operate_handover && (whereSql += " AND operate_handover LIKE '%:operate_handover%' /*上机组接收人*/\n");
    params.operate_handover_date && (whereSql += util.daterange(params, 'operate_handover_date', '上机组接收时间'));
    params.operate_chip_code && (whereSql += " AND operate_chip_code LIKE '%:operate_chip_code%' /*上机芯片编码*/\n");
    params.operate_reads_val && (whereSql += " AND operate_reads_val LIKE '%:operate_reads_val%' /*上机reads数*/\n");
    params.operate_q30_val && (whereSql += " AND operate_q30_val LIKE '%:operate_q30_val%' /*上机q30值*/\n");
    params.operater && (whereSql += " AND operater LIKE '%:operater%' /*上机人*/\n");
    params.operate_date && (whereSql += util.daterange(params, 'operate_date', '上机时间'));
    params.operate_checker && (whereSql += " AND operate_checker LIKE '%:operate_checker%' /*上机审查人*/\n");
    params.operate_check_date && (whereSql += util.daterange(params, 'operate_check_date', '上机审查时间'));
    params.operate_outer && (whereSql += " AND operate_outer LIKE '%:operate_outer%' /*上机组出库人*/\n");
    params.operate_out_residue && (whereSql += " AND operate_out_residue LIKE '%:operate_out_residue%' /*上机组试管剩余数量*/\n");
    params.report_handover && (whereSql += " AND report_handover LIKE '%:report_handover%' /*分析报告组接收人*/\n");
    params.report_handover_date && (whereSql += util.daterange(params, 'report_handover_date', '分析报告组接收时间'));
    params.report_result && (whereSql += " AND report_result LIKE '%:report_result%' /*分析结果*/\n");
    params.report_advice && (whereSql += " AND report_advice LIKE '%:report_advice%' /*建议*/\n");
    params.report_is_send && (whereSql += " AND report_is_send LIKE '%:report_is_send%' /*是否发送（1、不发送；2、发送）*/\n");
    params.reporter && (whereSql += " AND reporter LIKE '%:reporter%' /*分析人*/\n");
    params.report_date && (whereSql += util.daterange(params, 'report_date', '分析时间'));
    params.report_sender && (whereSql += " AND report_sender LIKE '%:report_sender%' /*报告发送人*/\n");
    params.report_send_date && (whereSql += util.daterange(params, 'report_send_date', '报告发送时间'));

    let status = params.status;
    if (status == '-1' || status == undefined) { // 全部
        whereSql += " \n";
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
    if (req.body.sidx) {
        req.session.sidx = req.body.sidx;
        req.session.sord = req.body.sord;
    }
    sp.selectPager(req, res, db, sqls.selectSql, sqls.whereSql);
};

/**
 * 查询所有
 * @params params
 * @params cb
 */
exports.listAll = (req, cb) => {
    let sqls = getSqls(req.body);
    if (req.session.sidx) {
        req.body.sidx = req.session.sidx;
        req.body.sord = req.session.sord;
        sqls.sql += ' ORDER BY `:sidx` :sord';
    }
    sp.selectAll(db, sqls.sql, req.body, cb);
};

/**
 * 修改信息
 * @param dnaFlow
 * @param cb
 */
exports.updateDnaFlowById = (dnaFlow, cb) => {
    let id = dnaFlow.id;
    delete dnaFlow.id;
    let uss = util.getUpdateSeletiveSql(dnaFlow);
    uss.param.push(id);
    db.pool.query('UPDATE dna_flow SET' + uss.sql + 'WHERE id=?', uss.param, cb);
};

/**
 * 彻底删除数据
 * @param ids
 * @param cb
 */
exports.deleteDnaByIds = (ids, cb) => {
    db.pool.query(`DELETE FROM dna_flow WHERE id IN (${ids})`, (err, result) => {
        if (err)throw err;
        db.pool.query(`DELETE FROM dna_flow_his WHERE id IN (${ids})`, (err2, result2) => {
            result2.affectedRows += result.affectedRows;
            cb(err || err2 || null, result2);
        });
    });
};

/**
 * 查询数据,根据id
 * @param id
 * @param cb
 */
exports.selectDnaFlowById = (id, cb) => {
    db.pool.query('SELECT * FROM dna_flow AS t WHERE t.id=?', id, cb);
};

