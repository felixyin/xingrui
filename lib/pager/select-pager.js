'use strict';
/**
 * Created by yinbin on 2015/9/4.
 */
function selectPager(req, res, db, $selectSql, $where) {
    let params = req.body;

    let $limit = parseInt(params.rows);
    let $page = params.page;
    let $sidx = params.sidx;
    // let $sord = params.sord;

    if (!$sidx) $sidx = 1;

    db.pool.getConnection(function (err, connection) {
        connection.config.queryFormat = function (query, values) {
            if (!values) return query;
            return query.replace(/\:(\w+)/g, function (txt, key) {
                if (values.hasOwnProperty && values.hasOwnProperty(key)) {
                    //console.log('escape-->' + (values[key]));
                    return values[key];
                } else {
                    return values[key];
                }
                return txt;
            }.bind(this));
        };
        let countSql = $selectSql.substring(0, 7) + ' count(*) AS count ' + $selectSql.substring($selectSql.toUpperCase().indexOf('FROM'));

        let sql = countSql + $where;
        // console.info(sql);
        // console.info(params);
        let countQuery = connection.query(sql, params, function (count_err, count_rows, count_fields) {
            if (count_err) console.error(count_err);
            if (!count_rows) { // 兼容没有数据的情况
                console.warn('警告，没有查询到数据，count sql是：\n\n' + countQuery.sql);
                let result = {
                    page: 0,
                    total: 0,
                    records: 0,
                    rows: []
                };
                res.send(result);
                return;
            }
            let $count = count_rows[0].count;

            let $total_pages = 0;
            if ($count > 0) {
                $total_pages = Math.ceil($count / $limit);
            }
            if ($page > $total_pages) $page = $total_pages;
            if ($limit < 0) $limit = 0;

            let $start = $limit * $page - $limit; // do not put $limit*($page - 1)
            if ($start < 0) $start = 0;

            let $SQL = $selectSql + $where + ' ORDER BY `:sidx` :sord LIMIT :start,:limit';

            params.start = $start;
            params.limit = $limit;
            params.sidx = $sidx;

            // console.info($SQL);
            // console.info(params);
            let listQuery = connection.query($SQL, params, function (list_err, list_rows, list_fields) {
                if (list_err) {
                    console.error(list_err);
                    throw list_err;
                }

                let result = {
                    page: $page,
                    total: $total_pages,
                    records: $count,
                    rows: list_rows
                };

                res.send(result);
                delete connection.config.queryFormat;
                connection.release();
            });

            // console.error(listQuery.sql);

        });

        //console.log(countQuery.sql);
        //console.log($selectSql);
    });
}


//function conditional(paramName,condSql) {
//    req.body.courseName && (whereSql += " AND curriculum.`NAME`  LIKE '%:courseName%'");
//}

module.exports.selectPager = selectPager;

//module.exports.conditional = conditional;


function selectAll(db, sql, params, cb) {



    db.pool.getConnection(function (err, connection) {

        connection.config.queryFormat = function (query, values) {
            if (!values) return query;
            return query.replace(/\:(\w+)/g, function (txt, key) {
                if (values.hasOwnProperty && values.hasOwnProperty(key)) {
                    //console.log('escape-->' + (values[key]));
                    return values[key];
                } else {
                    return values[key];
                }
                return txt;
            }.bind(this));
        };

        let listQuery = connection.query(sql, params, function (list_err, list_rows, list_fields) {
            delete connection.config.queryFormat;
            if (list_err) {
                console.error(list_err);
                throw list_err;
            }
            cb(list_err, list_rows);
            connection.release();
        });

        // console.error(listQuery.sql);

    });
}


module.exports.selectAll = selectAll;
