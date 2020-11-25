/**
 * Created by fy on 15-9-7.
 */
'use strict';

const dateFormat = require('date-format');
const _ = require('underscore');

/**
 * 自己封装的jsonp方法,调用完毕后会关闭链接
 * 可以与上传文件同时提交搭配
 * @param res
 * @param script
 */
exports.jsonpAndEnd = function (res, script) {
    res.write('<script type="text/javascript">' + script + '</script>');
    res.end();
};

/**
 * 自己封装的json方法,调用完毕后不会关闭链接
 * 可以与上传文件同时提交搭配
 * @param res
 * @param script
 */
exports.jsonp = function (res, script) {
    res.write('<script type="text/javascript">' + script + '</script>');
};


/**
 * 返回当前的时间字符串
 * @param pattern　日期的格式，默认不传递则是：yyyy-MM-dd HH:mm:ss
 * @returns {*}
 */
exports.now = function (pattern) {
    if (!pattern) pattern = 'yyyy-MM-dd hh:mm:ss';
    return dateFormat.asString(pattern, new Date());
};

exports.format = function (date, pattern) {
    if (!pattern) pattern = 'yyyy-MM-dd hh:mm:ss';
    return dateFormat.asString(pattern, date);
};

/**
 * json生成动态insert语句
 * @param bean
 * @returns {{sql: string, param: Array}}
 */
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
        sql: ' (' + columnsSql.join(',') + ') values (' + valuesSql.join(',') + ')',
        param: param
    }
};

/**
 * json生成动态update语句
 * @param bean
 * @returns {{sql: string, param: Array}}
 */
exports.getUpdateSeletiveSql = function (bean) {
    if (!_.isObject(bean) || _.isEmpty(bean) || _.isArray(bean) && _.isFunction(bean)) {
        throw new Error('转换为 update sql 的json对象为空!');
    }
    let setSql = [];
    let param = [];
    for (let key in bean) {
        const value = bean[key];
        setSql.push(key + '=?');
        param.push(value || null);
    }
    return {
        sql: ' ' + setSql.join(',') + ' ',
        param: param
    }
};

exports.daterange = function (params, dateStr, comment = '') {
    let date = params[dateStr];
    if (date) {
        let startKey = dateStr + 'Start';
        let endKey = dateStr + 'End';
        let d = date.split(' 至 ');
        params[startKey] = d[0];
        params[endKey] = d[1];
        return " AND ( sample_date >= ':" + startKey + "' AND sample_date <= ':" + endKey + "' )/*" + comment + "*/\n";
    }
    return '';
}