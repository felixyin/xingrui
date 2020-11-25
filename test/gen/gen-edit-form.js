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

			let input = `    .form-group
        label.col-xs-3.control-label.no-padding-right(for='ff-${idx}') ${row.cc} 
        .col-xs-9
            input#ff-${idx}.col-xs-6${row.ct.indexOf('date') != -1 ? '.ipt-date' : ''}${row.cc.indexOf('人') != -1 ? '.ipt-person' : ''}(type='text', name='${row.cn}', value='#{${row.cn}||""}', placeholder='')
            span.help-inline.col-xs-6
                span.middle.hide Inline help text
    .space-4`;
			console.log(input);

		}
	});

	conn.release();
});