/**
 * Created by Administrator on 2016/1/6 0006.
 */

const _ = require('underscore');

exports.getInsertSeletiveSql = function (bean) {
    if (!_.isObject(bean) || _.isEmpty(bean) || _.isArray(bean) && _.isFunction(bean)) {
        throw new Error('转换为 insert sql 的json对象为空!');
    }
    let columnsSql = [];
    let valuesSql = [];
    let param = [];
    for (let key in bean) {
        let value = bean[key];
        columnsSql.push(key);
        valuesSql.push('?');
        param.push(value);
    }
    return {
        sql: '('+columnsSql.join(',') + ') values (' + valuesSql.join(',')+')',
        param: param
    }
};

exports.getUpdateSeletiveSql = function (bean) {
    if (!_.isObject(bean) || _.isEmpty(bean) || _.isArray(bean) && _.isFunction(bean)) {
        throw new Error('转换为 update sql 的json对象为空!');
    }
    let setSql = [];
    let param = [];
    for (let key in bean) {
        const value = bean[key];
        setSql.push(key + '=?');
        param.push(value);
    }
    return {
        sql: setSql.join(','),
        param: param
    }
};
