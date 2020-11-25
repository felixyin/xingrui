/**
 * 用户注册登陆等
 */
'use strict';

const express = require('express');
const router = express.Router();
const userService = require('../service/user/index');
const settingService = require('../service/settings/index');

router.get('/', function (req, res, next) {
    res.render('login');
});

router.get('/sessionLess', function (req, res, next) {
    res.render('session_less');
});

function getAllMenus(json, auth) {
    let allMenus = [];
    if (auth) {
        let flows = json['权限设置'];
        let set = new Set();
        if (auth.indexOf('&') != -1) { //多角色
            let roles = auth.split('&');
            for (let role in roles) {
                for (let flow in flows) {
                    let menus = flows[flow][roles[role]];
                    for (let menu in menus) {
                        set.add(menus[menu]);
                    }
                }
            }
        } else { //一个角色
            for (let flow in flows) {
                let menus = flows[flow][auth];
                for (let menu in menus) {
                    set.add(menus[menu]);
                }
            }
        }
        allMenus = Array.from(set);
    }
    return allMenus;
}

router.post('/', function (req, res, next) {

    let params = req.body;
    userService.login(params.username, params.password, function (data) {
        if (data.rs) {
            settingService.getJsonFromFile(4, function (err, jsonRow) {
                let json = JSON.parse(jsonRow[0].value);
                req.session.userid = params.userid;
                req.session.username = params.username;
                req.session.auth = data.auth;

                let allMenus = getAllMenus(json, data.auth);
                // //console.log(allMenus);

                res.render('home', {menus: allMenus});// 默认不在显示首页，而是直接默认显示用户管理页面
            });
        } else {
            res.render('login', {'msg': data.ms});
        }
    });
    //if (params.username == 'admin' && params.password == '123456') {
    //    res.redirect('user');// 默认不在显示首页，而是直接默认显示用户管理页面
    //    //res.render('index', {user: {username: params.username}});
    //} else {
    //    res.render('login', {'msg': '用户名密码错误'});
    //}
});

router.get('/logout', function (req, res, next) {
    req.session.destroy(function (err) {
        // cannot access session here
        res.redirect('/');
    });
});

router.get('/test', function (req, res, next) {
    res.render('test');
});

router.get('/test/screen', function (req, res, next) {
    res.render('test/screen');
});

router.get('/screen', function (req, res, next) {
    res.render('screen');
});


module.exports = router;
