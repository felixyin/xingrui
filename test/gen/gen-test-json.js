/**
 * Created by fy on 2016/12/30.
 */

const db = require('../../config/db');
const util = require('../../lib/utils');

let sql = `SELECT  t.COLUMN_NAME as cn, t.COLUMN_COMMENT as cc, t.COLUMN_TYPE as ct
            FROM information_schema.COLUMNS t
            WHERE t.TABLE_NAME = 'dna_flow'`;

db.pool.getConnection(function (err, conn) {

	conn.query(sql, function (err, result) {
        // for (let idx in result) {
        //     let row = result[idx];
        //     let input = `${row.cn}:req.body.${row.cn},`;
        //     console.log(input);
        // }
        //
        // console.log();
        // console.log();
        // console.log();
        // console.log('-----------------------------------------------------');
        // console.log();
        // console.log();
        // console.log();

		for (let idx in result) {
			let row = result[idx];
			if (row.ct.indexOf('varchar') != -1) {
				let input = `${row.cn}:'test${idx}',`;
				console.log(input);
			} else if (row.ct.indexOf('int') != -1) {
				let input = `${row.cn}:88${idx},`;
				console.log(input);
			} else if (row.ct.indexOf('time') != -1) {
				let now = util.now();
				let input = `${row.cn}:'${now}',`;
				console.log(input);
			}
		}
	});

	conn.release();
});