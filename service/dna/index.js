/**
 * Created by fy on 2017/1/3.
 */
const db = require('../../config/db');

/**
 * 备份到history表的sql
 * @param checker
 * @param ids
 * @param cb
 * @returns {string}
 */
exports.backup = (checker, ids, cb) => {
    let backSql = `INSERT INTO dna_flow_his 
        (dna_flow_id, barcode_long, hospital, sample_code, sample_date, receive_date, real_name, id_card, age, pregnancy_week, pregnancy_condition,
        pregnancy_bad_history, comments, inputter, input_date, checker, check_date, warehouser, warehouse_place, warehouse_date, sample_outer,
        sample_out_residue, extract_handover, extract_handover_date, extract_qbite_deep, extract_epoch_deep, extract_purity_deep, extract_part_size, 
        extract_part_after_break, extracter, extract_date, extract_checker, extract_check_date, extract_outer, extract_out_residue, storage_handover, 
        storage_handover_date, storage_deep, storage_part_size, storager, storage_date, storage_checker, storage_check_date, storage_outer, 
        storage_out_residue, operate_handover, operate_handover_date, operate_chip_code, operate_reads_val, operate_q30_val, operater, operate_date,
        operate_checker, operate_check_date, operate_outer, operate_out_residue, report_handover, report_handover_date, report_result, report_advice, 
        report_is_send, reporter, report_date, report_sender, report_send_date, status)
    SELECT 
        id, barcode_long, hospital, sample_code, sample_date, receive_date, real_name, id_card, age, pregnancy_week, pregnancy_condition,
        pregnancy_bad_history, comments, inputter, input_date, checker, check_date, warehouser, warehouse_place, warehouse_date,
        sample_outer, sample_out_residue, extract_handover, extract_handover_date, extract_qbite_deep, extract_epoch_deep, extract_purity_deep, 
        extract_part_size, extract_part_after_break, extracter, extract_date, '${checker}' AS extract_checker, NOW() AS extract_check_date,
        extract_outer, extract_out_residue, storage_handover, 
        storage_handover_date, storage_deep, storage_part_size, storager, storage_date, storage_checker, storage_check_date, storage_outer, 
        storage_out_residue, operate_handover, operate_handover_date, operate_chip_code, operate_reads_val, operate_q30_val, operater, operate_date,
        operate_checker, operate_check_date, operate_outer, operate_out_residue, report_handover, report_handover_date, report_result, report_advice, 
        report_is_send, reporter, report_date, report_sender, report_send_date, status
    FROM dna_flow  WHERE id IN (${ids})`;
    //console.log(backSql);
    db.pool.query(backSql, cb);
};

/**
 * 废弃
 * @param checker
 * @param ids
 * @param cb
 */
exports.delete = (checker, ids, cb) => {
    // let delSql = `DELETE FROM dna_flow AS t WHERE t.id in(${ids})`;
    let delSql = `UPDATE dna_flow AS t SET t.status=0 WHERE t.id IN (${ids})`;
    db.pool.query(delSql, cb);
};