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

			let input =
`td ${row.cc}
td
    input.col-xs-10.col-sm-5(type='text' , name='${row.cn}')`;
			console.log(input);

		}
	});

	conn.release();
});