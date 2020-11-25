/**
 * Created by fy on 16-12-29.
 */
'use strict';
const sp = require('../lib/pager/select-pager');
const db = require('../config/db');
const util = require('../lib/utils');
const _ = require('underscore');

/**
 * 查询数量
 * @param body
 * @param cb
 */
exports.selectCount = (body, cb) => {
    let sql = [];
    sql.push('SELECT ');
    for (let key in body) {
        let b = body[key];
        sql.push('(');
        sql.push(['SELECT count(', b.column, ') count FROM ', b.table, ' WHERE ', b.column, '="', b.value, '"'].join(''));
        sql.push(') as ');
        sql.push(key);
        sql.push(', ');
    }
    sql.push('1 ;');
    let selectSql = sql.join('');
    //console.log(selectSql);

    db.pool.query(selectSql, cb);
};
