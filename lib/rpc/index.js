module.exports = function (express, helperUrl, rpcClientClassName, remoteObj) {

    let Mustache = require('mustache');
    let fs = require('fs');

    let rpcRouter = express.Router();

    rpcRouter.get('/test', function (req, res) {
        res.send(200, "test successful...");
    });

    rpcRouter.get(helperUrl, function (req, res) {

        let port = (process.env.lrs_PORT || '8080');

        let data = {
            RPCClientClassName: rpcClientClassName,
            methods: [],
            port: port,
            host: req.host
        };

        for (method in remoteObj) {
            if (typeof(remoteObj[method]) === 'function') {
                data.methods.push({method_name: method});
            }
        }

        let helperTemplatePath = require('path').resolve(__dirname, 'helper.mustache');

        let jsContent = Mustache.render(fs.readFileSync(helperTemplatePath).toString(), data);

        res.end(jsContent);
    });


    rpcRouter.post('/:method', function (req, res) {
        let method = req.params.method;
        let args = JSON.parse(req.body.args);
        // console.log('params:');
        // console.log(req.body.args);

        if (remoteObj.hasOwnProperty(method) && typeof(remoteObj[method]) === 'function') {
            let fn = remoteObj[method];
            args.push(function (err, result) {
                let param = {
                    err: err,
                    data: result
                };

                res.set('Content-Type', 'application/json');
                let json = JSON.stringify(param);
                // console.log('return:');
                // console.log(json);
                res.send(200, json);
            });

            remoteObj.request = req;
            fn.apply(remoteObj, args);
        } else {
            res.send(500);
        }

    });

    return rpcRouter;


};