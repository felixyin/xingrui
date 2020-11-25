/**
 * Created by fy on 2016/12/29.
 */
async function sleep(timeout) {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve();
        }, timeout);
    });
}

(async function () {
    console.log('Do some thing, ' + new Date());
    await sleep(3000);
    console.log('Do other things, ' + new Date());
})();


let s = "管理员&操作员".split('&');
console.log(s);

let sqls = s.map((v, i) => {
    console.log(v, i);
    return ['u.role LIKE "%', v, `%"`].join('');
});

console.log(sqls.join(' OR '));