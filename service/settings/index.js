/**
 * Created by fy on 15-12-22.
 */

const db = require('../../config/db');
const dateFormat = require('date-format');
const pinyin = require('../../lib/pinyin');
const fs = require('fs');
const date = require('../../lib/date');

exports.index = function () {
    return "setting index";
};

exports.getJsonFromFile = function (type, cb) {
    let sql = "SELECT value from settings WHERE name = '" + type + "'";
    db.pool.query(sql, cb);
};

exports.setJsonToFile = function (type, data, cb) {
    let insertSql = "update settings set `value` = ? where `name` = ?";
    db.pool.query(insertSql, [data, type], cb);
    clearCache();
};

/**
 * 对设置对象进行缓存处理
 * @type {null}
 */
let CACHE_SETTINGS = null;

/**
 * 清空缓存的方法，在修改setting数据的时候
 */
let clearCache = function () {
    CACHE_SETTINGS = null;
};

/**
 * 返回所有的设置
 * @param cb
 */
let getAllSetting = function (cb) {
    if (CACHE_SETTINGS) {
        cb(null, CACHE_SETTINGS);
    } else {
        db.pool.query("SELECT value FROM settings WHERE name = 4", function (err, rows, fields) {
            if (err) {
                cb(err, null);
            } else {
                if (rows && rows.length == 1) {
                    CACHE_SETTINGS = JSON.parse(rows[0].value);
                    cb(null, CACHE_SETTINGS);
                } else {
                    cb(new Error('设置信息没有查询出来'), null);
                }
            }
        });
    }
};


/**
 * 返回所有的积分和等级的对应
 * @param cb
 */
let getAllDengJi = function (cb) {
    getAllSetting(function (err, setting) {
        if (err) cb(err, null);
        else cb(null, setting['游戏积分设置']);
    });
};


/**
 * 获取某个分数所对应的等级
 * @param fenShu
 * @param cb
 */
let getDengJi = function (fenShu, cb) {
    getAllDengJi(function (err, jiFen) {
        let resultKey = 1;
        for (let key in jiFen)
            if (fenShu > jiFen[key])
                resultKey = (parseInt(key) + 1);
        cb(null, resultKey);
    });
};


/**
 * 返回所有的折扣
 * @param cb
 */
let getAllZheKou = function (cb) {
    getAllSetting(function (err, setting) {
        if (err) cb(err, null);
        else cb(null, setting['优惠设置']['游戏优惠']);
    });
};


/**
 * 返回等级所对应的折扣
 * @param dengJi
 * @param cb
 */
let getZheKou = function (dengJi, cb) {
    getAllZheKou(function (err, zheKou) {
        //console.log(zheKou);
        cb(null, zheKou[dengJi]);
    });
};

/**
 * 游戏价格设置
 * @param cb
 */
let getGamePrice = function (cb) {
    getAllSetting(function (err, setting) {
        if (err) cb(err, null);
        else {
            let gamePrice = setting['游戏价格设置'];
            cb(null, {
                hour: gamePrice['小时'],
                price: gamePrice['元'],
                priceOfHour: gamePrice['超出后每小时元']
            });
        }
    });
};

/**
 * 获取游戏相关设置
 * @param cb
 */
let getGameSettings = function (cb) {
    getAllSetting(function (err, setting) {
        if (err) cb(err, null);
        else {
            let newGameSettings = {};
            let gameSettings = setting['游戏设置'];
            for (let key in gameSettings) {
                let dbgs = gameSettings[key];
                let newGs = {};
                newGs.personCount = {
                    min: dbgs['游戏人数限制']['最少'],
                    max: dbgs['游戏人数限制']['最多']
                };
                newGs.langRenCount = dbgs['狼人数量限制'];
                newGs.office = dbgs['局的名称'];
                newGs.shenfen = dbgs['身份特征'];
                newGs.nowDay = dbgs['从第几天开始'];
                newGs.haveCunZhang = true;
                newGs.score = {
                    langRen: dbgs['获胜所得分数配置']['狼人'],
                    shenFen: dbgs['获胜所得分数配置']['身份'],
                    pingMin: dbgs['获胜所得分数配置']['平民']
                };
                newGs.flowIndex = dbgs['从第几个环节开始'];
                let flowNames = [];
                let ret = dbgs['游戏流程环节配置'];
                for (let i = 0; i < ret.length; i++) {
                    let r = ret[i];
                    flowNames.push({
                        name: r['环节名称'],
                        show: r['是否显示']
                    });
                }
                newGs.flowNames = flowNames;
                newGs.shenFen = dbgs['身份名称'];
                newGameSettings[key] = newGs;
            }
            cb(null, newGameSettings);
        }
    });
};

/**
 * 获取局的名称列表
 * @param cb
 */
let getGameOffices = function (cb) {
    getGameSettings(function (err, result) {
        let ret = [];
        for (let key in result) {
            let value = result[key];
            ret.push(value.office);
        }
        cb(null, ret);
    });
};

exports.getAllSetting = getAllSetting;
exports.getAllDengJi = getAllDengJi;
exports.getDengJi = getDengJi;
exports.getAllZheKou = getAllZheKou;
exports.getZheKou = getZheKou;
exports.getGamePrice = getGamePrice;
exports.getGameSettings = getGameSettings;
exports.getGameOffices = getGameOffices;

exports.getAllAuth = function (cb) {
    getAllSetting(function (err, setting) {
        if (err) cb(err, null);
        else cb(null, setting['权限设置']);
    });
}
