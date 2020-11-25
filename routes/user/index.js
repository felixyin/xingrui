/**
 * Created by fy on 15-9-4.
 */
'use strict';

const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: 'public/files/excel/'});
const userService = require('../../service/user/index');
const utils = require('../../lib/utils');

/**
 * 跳转到用户管理页面
 */
router.get('/', function (req, res, next) {
    userService.getRoles(null, (err, result) => {
        if (err)throw err;
        //console.log(result);
        res.render('user/list', {roles: result});
    });
});

/**
 * 获取所有的裁判
 */
router.get('/getJudgment', function (req, res, next) {
    userService.selectAllJudgment(function (err, result) {
        if (err)throw err;
        res.send(result);
    });
});

router.route('/list').get(userService.list).post(userService.list);

/**
 * 增加用户
 */
router.post('/add', function (req, res, next) {
    let params = req.body;
    let username = params.username;
    let realName = params.realName;
    let password = params.password;
    let password1 = params.password1;
    let role = params.role;
    let newObj = {
        username: username,
        realName: realName,
        role: role.join ? role.join('&') : role,
        // menu_id: role,
        password: password,
        status: 1
    };
    //console.log(role);
    validate(res, username, realName, password, password1, function () {
        userService.addUserInfo(newObj, function (err, result) {
            //console.log(err);
            res.send(`<script>parent.cbJsonp(${result ? result.insertId : null}, ${!err ? true : false});</script>`);
        });
    });
});
/**
 * 编辑用户
 */
router.post('/updateUserInfo', function (req, res, next) {
    let params = req.body;
    let username = params.username;
    let realName = params.realName;
    let password = params.password;
    let password1 = params.password1;
    let userId = params.id;
    let status = params.status;
    let role = params.role;
    let newObj = {
        username: username,
        realName: realName,
        role: role.join ? role.join('&') : role,
        // menu_id: params.role,
        password: password,
        status: status
    };
    validate(res, username, realName, password, password1, function () {
        userService.updateUserInfo(userId, newObj, function (err, result) {
            //console.log(err);
            res.send('<script>parent.cbJsonp(' + result.insertId + ', true)</script>');
        });
    });
});

function validate(res, username, realName, password, password1, cb) {
    if (!username || username.length < 5 || username.length > 25) {
        return utils.jsonpAndEnd(res, 'parent.validate("code","登陆账号长度须在5到25之间")');
    }
    if (!realName || realName.length < 2 || realName.length > 25) {
        return utils.jsonpAndEnd(res, 'parent.validate("realName","姓名长度必须在2到7之间")');
    }
    if (!password || password.length < 6 || password.length > 24) {
        return utils.jsonpAndEnd(res, 'parent.validate("password","密码长度必须在6到25之间")');
    }
    if (password != password1) {
        return utils.jsonpAndEnd(res, 'parent.validate("password","两次输入的密码不一致，请重新输入！")');
    }
    cb();
}

/**
 * 更改用户状态
 */
router.post('/update', function (req, res, next) {
    let id = req.body.userId;
    let status = req.body.status;
    userService.updateUserStatus(id, status, function (err, result) {
        res.send({status: !err});
    });

});

router.post('/validate', function (req, res, next) {
    let username = req.body.username;
    userService.validate(username, function (err, result) {
        if (result && result[0] != null) {
            res.send({status: "no"});
        } else {
            res.send({status: "yes"});
        }
    });
});

router.post('/passwordValidate', function (req, res, next) {
    let oldpassword = req.body.password;
    let userId = req.body.id;
    userService.passwordValidate(userId, function (err, result) {
        if (err)throw err;
        if (oldpassword === result[0]["password"]) {
            res.send({status: "yes"});
        } else {
            res.send({staus: "no"});
        }
    });
});

router.post('/getRoles', (req, res) => {
    let userId = req.body.userId;
    userService.getRoles(userId, (err, result) => {
        if (err)throw err;
        res.send(result);
    });
});

router.post('/getUserByRole', (req, res) => {
    let auth = req.body.stepRole || req.session.auth;
    userService.getUserByRole(auth, (err, result) => {
        if (err)throw err;
        res.send(result);
    })
});


module.exports = router;
