/**
 * Created by HZC on 2015/09/04.
 */
const dateFormat = require('date-format');
const fs = require('fs');
const sp = require('../../lib/pager/select-pager');
const db = require('../../config/db');
const date = require('../../lib/date');
const dbutil = require('../../lib/db/dbutil');
const _ = require('underscore');
const settingService = require('../../service/settings/index');
/**
 * 查询所有裁判或者收银员
 * @param role
 * @param cb
 */
exports.selectUserByRole = function (role, cb) {
    db.pool.query('SELECT * FROM user WHERE `role` = ?', role, cb);
};

exports.selectAllJudgment = function (cb) {
    this.selectUserByRole('裁判', cb);

};
/**
 * 查询所有用户
 */
exports.list = function (req, res, next) {
    //let params = URL.parse(req.url, true).query;
    let selectSql = "SELECT * FROM user";

    let whereSql = " WHERE 1 = 1 \n";
    req.body.realName && (whereSql += " AND realName LIKE '%:realName%' /*真实姓名*/");
    req.body.username && (whereSql += " AND username LIKE '%:username%' /*用户名*/");
    req.body.role && (whereSql += " AND `role` LIKE '%:role%' /*角色*/");
    req.body.status && (whereSql += " AND status = :status /*角色*/");

    sp.selectPager(req, res, db, selectSql, whereSql);
};
/**
 * 增加用户
 * @param memberInfo
 * @param cb
 */
exports.addUserInfo = function (userInfo, cb) {
    let tuple = dbutil.getInsertSeletiveSql(userInfo);
    let sql = ['INSERT INTO user ' + tuple.sql].join();
    db.pool.query(sql, tuple.param, cb);
};

/**
 * 更改用户状态
 * @param memberId
 * @param cb
 */
exports.updateUserStatus = function (userId, status, cb) {
    let updateSql = ' UPDATE user SET `status` =? WHERE id = ?';
    db.pool.query(updateSql, [status, userId], cb);

};


/**
 * 编辑信息
 */
exports.updateUserInfo = function (id, user, cb) {
    let userInfo = _.clone(user);
    delete userInfo['id'];
    let tuple = dbutil.getUpdateSeletiveSql(userInfo);
    tuple.param.push(id);
    db.pool.query('UPDATE user SET ' + tuple.sql + ' WHERE id = ?', tuple.param, cb)
};
exports.login = function (username, password, callback) {
    if (!username) return callback({rs: false, ms: '用户名不能为空'});
    if (username.length < 5 || username.length > 25) return callback({rs: false, ms: '用户名长度需在5到25之间'});
    if (!password) return callback({rs: false, ms: '密码不能为空'});
    if (password.length < 6 || password.length > 20) return callback({rs: false, ms: '密码长度需在6到20之间'});
    let loginSql = 'SELECT id,password,status,`role` FROM user WHERE username = ?';
    db.pool.query(loginSql, username, function (error, row, field) {
        //console.log(error);
        if (row && row[0]) {
            let user = row[0];
            if (password === user.password) {
                if (user.status !== 1) return callback({rs: false, ms: '账号不可用'});
                //console.error({ms: username, auth: user.role});
                callback({rs: true, ms: user.id, auth: user.role});
            } else callback({rs: false, ms: '密码错误'});
        } else callback({rs: false, ms: '用户名不存在'});
    });
};

exports.validate = function (username, cb) {
    let selectSql = 'SELECT id FROM user WHERE username = ?';
    db.pool.query(selectSql, [username], cb);
};
/**
 * 用户密码校验
 * @param id
 * @param cb
 */
exports.passwordValidate = function (id, cb) {
    let selectSql = 'SELECT password FROM user WHERE id = ?';
    db.pool.query(selectSql, [id], cb);
};


/**
 * 返回所有的角色,用户拥有的角色特殊处理
 * @param id
 * @param cb
 */
exports.getRoles = function (id, cb) {
    settingService.getAllAuth((err, roles) => {
        if (!roles) new Error('系统中不存在任何角色');

        let selectSql = `SELECT u.role FROM user u WHERE id = ?`;

        if (!id) {

            for (let flowName in roles)
                for (let roleName in roles[flowName])
                    roles[flowName][roleName] = false;

            cb(null, roles);
        } else {

            db.pool.query(selectSql, [id], (err, row) => {
                if (row && row.length == 1 && row[0].role) {
                    let userRoles = row[0].role.split('&');
                    for (let flowName in roles)
                        for (let roleName in roles[flowName])
                            roles[flowName][roleName] = userRoles.includes(roleName);

                    cb(null, roles);
                }
            });
        }
    });
};


/**
 * 返回用户角色对应的所有用户
 * @param auth
 * @param cb
 */
exports.getUserByRole = function (auth, cb) {
    if (!auth) throw new Error('当前用户会话中没有权限:req.session.auth');

    let roles = auth.split('&');
    let selectSql = 'SELECT u.id, u.realName, u.role FROM user u WHERE u.role LIKE ?';

    async function selectUser(role) {
        return new Promise((resolve, reject) => {
            db.pool.query(selectSql, '%' + role + '%', (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    }

    (async function () {
        let roleAndUserList = [];
        for (let idx in roles) {
            let role = roles[idx];
            let users = await selectUser(role);
            roleAndUserList.push({[role]: users});
        }
        cb(null, roleAndUserList);
    })();
};

