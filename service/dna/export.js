/**
 * Created by fy on 2017/1/6.
 */
const excel = require('node-excel-export');

let styles = {
    title: {
        font: {
            sz: 30,
            bold: true
        }
    },
    header: {
        // fill: {
        //     fgColor: {
        // rgb: '00000000'
        // }
        // },
        font: {
            color: {
                // rgb: 'FFFFFFFF'
            },
            sz: 14,
            bold: true,
            underline: false
        }
    },
    cell: {
        // fill: {
        //     fgColor: {
        //         rgb: '00000000'
        // }
        // }
    }
};

let heading = [
    // [{value: '标签接收数据导出', style: styles.header}],
];

let specification = {
    id: {
        displayName: '序号',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function (value, row) {
            return value || '';
        },
        width: '15'
    },
    barcode_long: {
        displayName: '条码编号',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function (value, row) {
            return value || '';
        },
        width: '15'
    },
    hospital: {
        displayName: '医院名称',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function (value, row) {
            return value || '';
        },
        width: '15'
    },
    sample_code: {
        displayName: '样本编号',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function (value, row) {
            return value || '';
        },
        width: '15'
    },
    sample_date: {
        displayName: '采样日期',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function (value, row) {
            return value || '';
        },
        width: '15'
    },
    receive_date: {
        displayName: '接收日期',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function (value, row) {
            return value || '';
        },
        width: '15'
    },
    real_name: {
        displayName: '姓名',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function (value, row) {
            return value || '';
        },
        width: '15'
    },
    id_card: {
        displayName: '身份证',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function (value, row) {
            return value || '';
        },
        width: '15'
    },
    age: {
        displayName: '年龄',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function (value, row) {
            return value || '';
        },
        width: '15'
    },
    pregnancy_week: {
        displayName: '孕周',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function (value, row) {
            return value || '';
        },
        width: '15'
    },
    pregnancy_condition: {
        displayName: '妊娠情况',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function (value, row) {
            return value || '';
        },
        width: '15'
    },
    pregnancy_bad_history: {
        displayName: '不良孕产史',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function (value, row) {
            return value || '';
        },
        width: '15'
    },
    comments: {
        displayName: '备注',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function (value, row) {
            return value || '';
        },
        width: '15'
    },
    inputter: {
        displayName: '录入人员',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function (value, row) {
            return value || '';
        },
        width: '15'
    },
    input_date: {
        displayName: '录入日期',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function (value, row) {
            return value || '';
        },
        width: '15'
    },
    changer: {
        displayName: '换管人员',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function (value, row) {
            return value || '';
        },
        width: '15'
    },
    change_date: {
        displayName: '换管日期',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function (value, row) {
            return value || '';
        },
        width: '15'
    },
    checker: {
        displayName: '审批人员',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function (value, row) {
            return value || '';
        },
        width: '15'
    },
    check_date: {
        displayName: '审批日期',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function (value, row) {
            return value || '';
        },
        width: '15'
    },
    // barcode_short: {
    //     displayName: '短条码编号',
    //     headerStyle: styles.header,
    //     cellStyle: styles.cell,
    //     cellFormat: function (value, row) {
    //         return value || '';
    //     },
    //     width: '15'
    // },
    sample_outer: {
        displayName: '采血管出库人',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function (value, row) {
            return value || '';
        },
        width: '15'
    },
    sample_out_residue: {
        displayName: '接收组样本剩余量',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function (value, row) {
            return value || '';
        },
        width: '15'
    },
    extract_handover: {
        displayName: '提取组接收人',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function (value, row) {
            return value || '';
        },
        width: '15'
    },
    extract_handover_date: {
        displayName: '提取组接收时间',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function (value, row) {
            return value || '';
        },
        width: '15'
    },
    extract_qbite_deep: {
        displayName: 'Qubit浓度(ng/ul)',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function (value, row) {
            return value || '';
        },
        width: '15'
    },
    extract_epoch_deep: {
        displayName: 'epoch浓度(ng/ul)',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function (value, row) {
            return value || '';
        },
        width: '15'
    },
    extract_purity_deep: {
        displayName: '纯度(%)',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function (value, row) {
            return value || '';
        },
        width: '15'
    },
    extract_part_size: {
        displayName: '片段大小(bp)',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function (value, row) {
            return value || '';
        },
        width: '15'
    },
    extract_part_after_break: {
        displayName: '打断后片段(bp)',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function (value, row) {
            return value || '';
        },
        width: '15'
    },
    extracter: {
        displayName: '提取人员',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function (value, row) {
            return value || '';
        },
        width: '15'
    },
    extract_date: {
        displayName: '提取时间',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function (value, row) {
            return value || '';
        },
        width: '15'
    },
    extract_checker: {
        displayName: '提取审核人',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function (value, row) {
            return value || '';
        },
        width: '15'
    },
    extract_check_date: {
        displayName: '提取审核时间',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function (value, row) {
            return value || '';
        },
        width: '15'
    },
    extract_outer: {
        displayName: '提取出库人',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function (value, row) {
            return value || '';
        },
        width: '15'
    },
    extract_out_residue: {
        displayName: '提取组样本剩余量',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function (value, row) {
            return value || '';
        },
        width: '15'
    },
    storage_handover: {
        displayName: '建库组接收人',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function (value, row) {
            return value || '';
        },
        width: '15'
    },
    storage_handover_date: {
        displayName: '建库组接收时间',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function (value, row) {
            return value || '';
        },
        width: '15'
    },
    storage_deep: {
        displayName: '建库浓度(ng/ul)',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function (value, row) {
            return value || '';
        },
        width: '15'
    },
    storage_part_size: {
        displayName: '建库片段大小(bp)',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function (value, row) {
            return value || '';
        },
        width: '15'
    },
    storager: {
        displayName: '建库人',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function (value, row) {
            return value || '';
        },
        width: '15'
    },
    storage_date: {
        displayName: '建库时间',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function (value, row) {
            return value || '';
        },
        width: '15'
    },
    storage_checker: {
        displayName: '建库审查人',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function (value, row) {
            return value || '';
        },
        width: '15'
    },
    storage_check_date: {
        displayName: '建库审查时间',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function (value, row) {
            return value || '';
        },
        width: '15'
    },
    storage_outer: {
        displayName: '建库组出库人',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function (value, row) {
            return value || '';
        },
        width: '15'
    },
    storage_out_residue: {
        displayName: '建库组样本剩余量',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function (value, row) {
            return value || '';
        },
        width: '15'
    },
    operate_handover: {
        displayName: '上机组接收人',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function (value, row) {
            return value || '';
        },
        width: '15'
    },
    operate_handover_date: {
        displayName: '上机组接收时间',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function (value, row) {
            return value || '';
        },
        width: '15'
    },
    operate_chip_code: {
        displayName: '上机芯片编码',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function (value, row) {
            return value || '';
        },
        width: '15'
    },
    operate_reads_val: {
        displayName: '上机reads数',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function (value, row) {
            return value || '';
        },
        width: '15'
    },
    operate_q30_val: {
        displayName: '上机q30值',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function (value, row) {
            return value || '';
        },
        width: '15'
    },
    operater: {
        displayName: '上机人',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function (value, row) {
            return value || '';
        },
        width: '15'
    },
    operate_date: {
        displayName: '上机时间',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function (value, row) {
            return value || '';
        },
        width: '15'
    },
    operate_checker: {
        displayName: '上机审查人',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function (value, row) {
            return value || '';
        },
        width: '15'
    },
    operate_check_date: {
        displayName: '上机审查时间',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function (value, row) {
            return value || '';
        },
        width: '15'
    },
    operate_outer: {
        displayName: '上机组出库人',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function (value, row) {
            return value || '';
        },
        width: '15'
    },
    operate_out_residue: {
        displayName: '上机组样本剩余量',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function (value, row) {
            return value || '';
        },
        width: '15'
    },
    report_handover: {
        displayName: '分析报告组接收人',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function (value, row) {
            return value || '';
        },
        width: '15'
    },
    report_handover_date: {
        displayName: '分析报告组接收时间',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function (value, row) {
            return value || '';
        },
        width: '15'
    },
    report_result: {
        displayName: '分析结果',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function (value, row) {
            return value || '';
        },
        width: '15'
    },
    report_advice: {
        displayName: '建议',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function (value, row) {
            return value || '';
        },
        width: '15'
    },
    report_is_send: {
        displayName: '是否发送（1、不发送；2、发送）',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function (value, row) {
            return value || '';
        },
        width: '15'
    },
    reporter: {
        displayName: '分析人',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function (value, row) {
            return value || '';
        },
        width: '15'
    },
    report_date: {
        displayName: '分析时间',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function (value, row) {
            return value || '';
        },
        width: '15'
    },
    report_sender: {
        displayName: '报告发送人',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function (value, row) {
            return value || '';
        },
        width: '15'
    },
    report_send_date: {
        displayName: '报告发送时间',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function (value, row) {
            return value || '';
        },
        width: '15'
    },
    status: {
        displayName: '状态',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        cellFormat: function (value, row) {
            let text = '';
            switch (value) {
                case 0:
                    text = '已删除';
                    break;
                case 1:
                    text = '已录入';
                    break;
                case 2:
                    text = '已审批';
                    break;
                case 3:
                    text = '已入库';
                    break;
                case 4:
                    text = '已出库';
                    break;
                case 5:
                    text = '已提取';
                    break;
                case 6:
                    text = '提取合格';
                    break;
                case 7:
                    text = '提取废弃';
                    break;
                case 8:
                    text = '重提取';
                    break;
                case 9:
                    text = '提取已交接';
                    break;
                case 10:
                    text = '已建库';
                    break;
                case 11:
                    text = '建库合格';
                    break;
                case 12:
                    text = '建库废弃';
                    break;
                case 13:
                    text = '重建库';
                    break;
                case 14:
                    text = '建库已交接';
                    break;
                case 15:
                    text = '已上机';
                    break;
                case 16:
                    text = '上机合格';
                    break;
                case 17:
                    text = '上机废弃';
                    break;
                case 18:
                    text = '重上机';
                    break;
                case 19:
                    text = '上机已交接';
                    break;
                case 20:
                    text = '已分析';
                    break;
                case 21:
                    text = '报告已发送';
                    break;
                default:
                    text = '';
            }
            return text;
        },
        width: '15'
    }
};

exports.export = function (rows) {
    let dataset = JSON.parse(JSON.stringify(rows));
    return excel.buildExport(
        [
            {
                name: '数据导出',
                heading: heading,
                specification: specification,
                data: dataset
            }
        ]
    );
};