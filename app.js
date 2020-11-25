const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const RedisStore = require('connect-redis')(session);

const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.disable('etag');
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(serveStatic('bower_components'));
app.use(cookieParser('fy_'));

// app.use(session({
//    secret: 'felix yin',
//    name: 'LrsGame',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
//    cookie: {maxAge: 60000 * 300},  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
//    resave: true,
//    saveUninitialized: true
// }));
app.use(session({
    name: 'sid',
    secret: 'sysm-felix-',
    resave: true,
    rolling: true,
    saveUninitialized: true,
    cookie: {maxAge: 60000 * 3000},
    store: new RedisStore({
        // "host": "redis",
        "host": "qtrj.i234.me",
        // "host": "localhost",
        "port": "6380",
        // "pass": "123456",
        "db": 4,
        "ttl": 1800,
        "logErrors": true
    })
}));

app.use(function (req, res, next) {
    let url = req.originalUrl;
    if (url !== "/login" && url !== "/sessionLess" && url !== "/" && !req.session.username) {
        return res.redirect("/sessionLess");
    }
    next();
});

app.use(function (req, res, next) {
    res.locals.userid = req.session.userid || null;
    res.locals.auth = req.session.auth || null;
    res.locals.username = req.session.username || null;
    //res.locals.menus = req.session.menus || null;
    next();
});


// =================================================================================

//注册登陆等
let index = require('./routes/index');
app.use('/', index);
//标签接收管理模块
app.use('/dna/receive', require('./routes/dna/receive'));
//DNA提取管理模块
app.use('/dna/extract', require('./routes/dna/extract'));
//建库管理
app.use('/dna/storage', require('./routes/dna/storage'));
//上机管理
app.use('/dna/operate', require('./routes/dna/operate'));
//分析报告管理
app.use('/dna/report', require('./routes/dna/report'));
//超级管理
app.use('/dna/admin', require('./routes/dna/admin'));
//重做模块
app.use('/dna/redo', require('./routes/dna/redo'));

//用户管理模块
let user = require('./routes/user');
app.use('/user', user);
//基本设置
let settings = require('./routes/settings/index');
app.use('/settings', settings);
//关于模块
let about = require('./routes/about');
app.use('/about', about);
//公共模块
let common = require('./routes/common');
app.use('/common', common);


//自动注册所有service为rpc服务
let rpc = require('./lib/rpc');
let dirWalk = require('./lib/myfs/digui');
let _s = require('underscore.string');
let serviceFileFolder = __dirname + '/service';
let serviceFileList = dirWalk.syncWalk(serviceFileFolder, 0);
// console.info('页面需引入RPC注册的服务地址是： ');
let rpcScripts = serviceFileList.map(function (o) {
    let service = require('.' + o.rpcPath),
        ret = o.rpcPath.split('/'),
        clientName = _s.capitalize(ret[ret.length - 2]) + _s.capitalize(ret[ret.length - 1].replace('.js', '')),
        script = ['script(src=\'', o.rpcPath, '/helper.js', '\')\n', "script var ", clientName, " = new ", clientName, "('", o.rpcPath, "');\n"].join('');
    app.use(o.rpcPath, rpc(express, '/helper.js', clientName, service));
    // console.log(script);
    return script;
});
let fs = require('fs');
let rpcJadePath = __dirname + '/views/include/rpc.jade';
try {
    fs.unlinkSync(rpcJadePath);
} catch (e) {
}
fs.writeFile(rpcJadePath, rpcScripts.join('\n'), function (err, x) {
});

//生成jade模板的导入script
let scriptFolder = '/javascripts/fragment';
let spath = [__dirname, '/public', scriptFolder].join('');
let files = fs.readdirSync(spath);
fs.writeFileSync(__dirname + '/views/include/template.jade', files.filter(function (item) {
    return item.toString().indexOf('runtime.js') === -1; //排除jade模板运行时
}).map(function (item) {
    return ['script(src="', scriptFolder, '/', item, '")\n'].join('');
}).join(''));
//let serviceList = require('./service/api/service');
//app.use('/rpc', rpc(express, '/helper.js', 'APIClient', serviceList));

// =================================================================================

/*app.use('/test_session', function (req, res, next) {
 let u = req.session.user;
 res.send(u);
 });*/

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    // next(err);
    res.render('404', {
        message: err.message,
        error: err
    });
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        console.error(err);
        res.render('500', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    console.error(JSON.stringify(err));
    res.render('500', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
