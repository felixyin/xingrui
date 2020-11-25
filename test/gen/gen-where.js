/**
 * Created by fy on 2016/12/30.
 */

const db = require('../../config/db');

let sql = `SELECT  t.COLUMN_NAME as cn, t.COLUMN_COMMENT as cc, t.COLUMN_TYPE as ct
            FROM information_schema.COLUMNS t
            WHERE t.TABLE_NAME = 'dna_flow'`;

db.pool.getConnection(function (err, conn) {

    conn.query(sql, function (err, result) {
        for (let idx in result) {
            let row = result[idx];
            console.log(`${row.cn},`);
        }
        for (let idx in result) {
            let row = result[idx];

            let input = '';
            if (row.ct.indexOf('time') != -1) {
                input = `params.${row.cn} && (whereSql += util.daterange(params, '${row.cn}', '${row.cc}'));`;
            } else {
                input = `params.${row.cn} && (whereSql += " AND ${row.cn} LIKE '%:${row.cn}%' /*${row.cc}*/\\n");`;
            }
            console.log(input);
        }
    });

    conn.release();
});