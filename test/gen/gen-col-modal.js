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
			console.log(`'${row.cc}',`);
		}

		console.log();
		console.log('----------------------------');
		console.log();

		for (let idx in result) {
			let row = result[idx];

			let width = 100;
			let formatter = '';
			if (row.ct.indexOf('time') != -1) width = 130;
			else if (row.ct.indexOf('int') != -1)
				formatter = ',formatter: function (value, options, row){ return value;}';

			let input = `{name: '${row.cn}', width: ${width}, index: '${row.cn}', align: 'center', sortable: false ${formatter}},`;
			console.log(input);

		}
	});

	conn.release();
});