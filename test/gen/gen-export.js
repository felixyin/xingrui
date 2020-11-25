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

			let input = `${row.cn}: {
    displayName: '${row.cc}',
    headerStyle: styles.header,
    cellStyle: styles.cell, 
    cellFormat: function (value, row) { 
        return value || '';
    },
    width: '15' 
},`;
			console.log(input);

		}
	});

	conn.release();
});