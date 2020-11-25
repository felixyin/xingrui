/**
 * Created by fy on 16-12-29.
 */
'use strict';
(function (W) {

    !function () {
        W.grid_selector = "#grid-table";
        W.pager_selector = "#grid-pager";
        W.search_form = '#search-form-id';
        W.str = location.search;
        W._title = '超级管理';
        W._url = BASE_URL + "dna/admin/list";
        W._sortname = 'input_date';
        W._sortorder = 'ASC';
        W._postData = {};
        W._colNames = ['序号', '条码编号', '医院名称', '样本编号', '状态', '采样日期', '接收日期', '姓名', '身份证号', '年龄', '孕周', '孕天', '妊娠情况', '不良孕产史',
            '备注', '录入人员', '录入日期', '审批人员', '审批日期', '采血管入库人', '采血管入库位置', '采血管入库时间', '采血管出库人', '接收组样本剩余量', '提取组接收人',
            '提取组接收时间', 'Qubit浓度(ng/ul)', 'epoch浓度(ng/ul)', '纯度(%)', '片段大小(bp)', '打断后片段(bp)', '提取人员', '提取时间', '提取审核人', '提取审核时间', '提取出库人',
            '提取组样本剩余量', '建库组接收人', '建库组接收时间', '建库浓度(ng/ul)', '建库index号', '建库片段大小(bp)', '建库人', '建库时间', '建库审查人', '建库审查时间', '建库组出库人',
            '建库组样本剩余量', '上机组接收人', '上机组接收时间', '上机芯片编码', '上机reads数', '上机q30值', '上机人', '上机时间', '上机审查人', '上机审查时间',
            '上机组出库人', '上机组样本剩余量', '分析报告组接收人', '分析报告组接收时间', '分析结果', '建议', '是否发送', '分析人', '分析时间',
            '报告发送人', '报告发送时间', ''];
        // W._groupHeader = function () {
        //     jQuery(grid_selector).jqGrid('setGroupHeaders', {
        //         useColSpanStyle: true,
        //         groupHeaders:[
        //             // {startColumnName: 'id', numberOfColumns: 5, titleText: '<em>Price</em>'},
        //             {startColumnName: 'sample_date', numberOfColumns: 17, titleText: 'Shiping'}
        //         ]
        //     });
        // };
        W._colModel = [
            {name: 'id', width: 70, index: 'id', align: 'center', sortable: true, frozen: true},
            {name: 'barcode_long', width: 100, index: 'barcode_long', align: 'center', sortable: true, frozen: true},
            {name: 'hospital', width: 120, index: 'hospital', align: 'center', sortable: true, frozen: true},
            {name: 'sample_code', width: 100, index: 'sample_code', align: 'center', sortable: true, frozen: true},
            {
                name: 'status1', width: 90, index: 'status', align: 'center', sortable: true, frozen: true,
                formatter: function (value, options, row) {
                    var text = '';
                    switch (row.status) {
                        case 0:
                            text = ['<span class="label label-danger">', '已删除', ''].join('');
                            break;
                        case 1:
                            text = ['<span class="label label-info">', '已录入', ''].join('');
                            break;
                        case 2:
                            text = ['<span class="label label-success">', '已审批', ''].join('');
                            break;
                        case 3:
                            text = ['<span class="label label-primary">', '已入库', ''].join('');
                            break;
                        case 4:
                            text = ['<span class="label label-purple">', '已出库', ''].join('');
                            break;
                        case 5:
                            text = ['<span class="label label-info">', '已提取', ''].join('');
                            break;
                        case 6:
                            text = ['<span class="label label-success">', '提取合格', ''].join('');
                            break;
                        case 7:
                            text = ['<span class="label label-danger">', '提取废弃', ''].join('');
                            break;
                        case 8:
                            text = ['<span class="label label-warning">', '重提取', ''].join('');
                            break;
                        case 9:
                            text = ['<span class="label label-default">', '提取已交接', ''].join('');
                            break;
                        case 10:
                            text = ['<span class="label label-info">', '已建库', ''].join('');
                            break;
                        case 11:
                            text = ['<span class="label label-success">', '建库合格', ''].join('');
                            break;
                        case 12:
                            text = ['<span class="label label-danger">', '建库废弃', ''].join('');
                            break;
                        case 13:
                            text = ['<span class="label label-warning">', '重建库', ''].join('');
                            break;
                        case 14:
                            text = ['<span class="label label-default">', '建库已交接', ''].join('');
                            break;
                        case 15:
                            text = ['<span class="label label-info">', '已上机', ''].join('');
                            break;
                        case 16:
                            text = ['<span class="label label-success">', '上机合格', ''].join('');
                            break;
                        case 17:
                            text = ['<span class="label label-danger">', '上机废弃', ''].join('');
                            break;
                        case 18:
                            text = ['<span class="label label-warning">', '重上机', ''].join('');
                            break;
                        case 19:
                            text = ['<span class="label label-default">', '上机已交接', ''].join('');
                            break;
                        case 20:
                            text = ['<span class="label label-info">', '已分析', ''].join('');
                            break;
                        case 21:
                            text = ['<span class="label label-success">', '报告已发送', ''].join('');
                            break;
                        default:
                            text = '';
                    }
                    return text;
                }
            },
            {name: 'sample_date', width: 140, index: 'sample_date', align: 'center', sortable: true},
            {name: 'receive_date', width: 140, index: 'receive_date', align: 'center', sortable: true},
            {name: 'real_name', width: 80, index: 'real_name', align: 'center', sortable: true},
            {name: 'id_card', width: 150, index: 'id_card', align: 'center', sortable: true},
            {name: 'age', width: 50, index: 'age', align: 'center', sortable: true},
            {name: 'pregnancy_week', width: 60, index: 'pregnancy_week', align: 'center', sortable: true},
            {name: 'pregnancy_day', width: 60, index: 'pregnancy_day', align: 'center', sortable: true},
            {name: 'pregnancy_condition', width: 100, index: 'pregnancy_condition', align: 'center', sortable: true},
            {name: 'pregnancy_bad_history', width: 100, index: 'pregnancy_bad_history', align: 'center', sortable: true},
            {name: 'comments', width: 100, index: 'comments', align: 'center', sortable: true},
            {name: 'inputter', width: 80, index: 'inputter', align: 'center', sortable: true},
            {name: 'input_date', width: 140, index: 'input_date', align: 'center', sortable: true},
            {name: 'checker', width: 80, index: 'checker', align: 'center', sortable: true},
            {name: 'check_date', width: 140, index: 'check_date', align: 'center', sortable: true},
            {name: 'warehouser', width: 80, index: 'warehouser', align: 'center', sortable: true},
            {name: 'warehouse_place', width: 100, index: 'warehouse_place', align: 'center', sortable: true},
            {name: 'warehouse_date', width: 140, index: 'warehouse_date', align: 'center', sortable: true},
            // {name: 'barcode_short', width: 100, index: 'barcode_short', align: 'center', sortable: true},
            {name: 'sample_outer', width: 80, index: 'sample_outer', align: 'center', sortable: true},
            {name: 'sample_out_residue', width: 100, index: 'sample_out_residue', align: 'center', sortable: true},
            {name: 'extract_handover', width: 80, index: 'extract_handover', align: 'center', sortable: true},
            {name: 'extract_handover_date', width: 140, index: 'extract_handover_date', align: 'center', sortable: true},
            {name: 'extract_qbite_deep', width: 100, index: 'extract_qbite_deep', align: 'center', sortable: true},
            {name: 'extract_epoch_deep', width: 100, index: 'extract_epoch_deep', align: 'center', sortable: true},
            {name: 'extract_purity_deep', width: 100, index: 'extract_purity_deep', align: 'center', sortable: true},
            {name: 'extract_part_size', width: 100, index: 'extract_part_size', align: 'center', sortable: true},
            {name: 'extract_part_after_break', width: 100, index: 'extract_part_after_break', align: 'center', sortable: true},
            {name: 'extracter', width: 80, index: 'extracter', align: 'center', sortable: true},
            {name: 'extract_date', width: 140, index: 'extract_date', align: 'center', sortable: true},
            {name: 'extract_checker', width: 80, index: 'extract_checker', align: 'center', sortable: true},
            {name: 'extract_check_date', width: 140, index: 'extract_check_date', align: 'center', sortable: true},
            {name: 'extract_outer', width: 80, index: 'extract_outer', align: 'center', sortable: true},
            {
                name: 'extract_out_residue',
                width: 100,
                index: 'extract_out_residue',
                align: 'center',
                sortable: true
            },
            {name: 'storage_handover', width: 80, index: 'storage_handover', align: 'center', sortable: true},
            {name: 'storage_handover_date', width: 140, index: 'storage_handover_date', align: 'center', sortable: true},
            {name: 'storage_deep', width: 100, index: 'storage_deep', align: 'center', sortable: true},
            {name: 'storage_index', width: 100, index: 'storage_index', align: 'center', sortable: true},
            {name: 'storage_part_size', width: 100, index: 'storage_part_size', align: 'center', sortable: true},
            {name: 'storager', width: 80, index: 'storager', align: 'center', sortable: true},
            {name: 'storage_date', width: 140, index: 'storage_date', align: 'center', sortable: true},
            {name: 'storage_checker', width: 80, index: 'storage_checker', align: 'center', sortable: true},
            {name: 'storage_check_date', width: 140, index: 'storage_check_date', align: 'center', sortable: true},
            {name: 'storage_outer', width: 80, index: 'storage_outer', align: 'center', sortable: true},
            {name: 'storage_out_residue', width: 100, index: 'storage_out_residue', align: 'center', sortable: true},
            {name: 'operate_handover', width: 80, index: 'operate_handover', align: 'center', sortable: true},
            {name: 'operate_handover_date', width: 140, index: 'operate_handover_date', align: 'center', sortable: true},
            {name: 'operate_chip_code', width: 100, index: 'operate_chip_code', align: 'center', sortable: true},
            {name: 'operate_reads_val', width: 100, index: 'operate_reads_val', align: 'center', sortable: true},
            {name: 'operate_q30_val', width: 100, index: 'operate_q30_val', align: 'center', sortable: true},
            {name: 'operater', width: 80, index: 'operater', align: 'center', sortable: true},
            {name: 'operate_date', width: 140, index: 'operate_date', align: 'center', sortable: true},
            {name: 'operate_checker', width: 80, index: 'operate_checker', align: 'center', sortable: true},
            {name: 'operate_check_date', width: 140, index: 'operate_check_date', align: 'center', sortable: true},
            {name: 'operate_outer', width: 80, index: 'operate_outer', align: 'center', sortable: true},
            {name: 'operate_out_residue', width: 100, index: 'operate_out_residue', align: 'center', sortable: true},
            {name: 'report_handover', width: 80, index: 'report_handover', align: 'center', sortable: true},
            {name: 'report_handover_date', width: 140, index: 'report_handover_date', align: 'center', sortable: true},
            {name: 'report_result', width: 100, index: 'report_result', align: 'center', sortable: true},
            {name: 'report_advice', width: 100, index: 'report_advice', align: 'center', sortable: true},
            {
                name: 'report_is_send', width: 100, index: 'report_is_send', align: 'center', sortable: true, formatter: function (value, options, row) {
                if (value == 1) {
                    return '不发送';
                } else if (value == 2) {
                    return '发送';
                } else {
                    return '';
                }
            }
            },
            {name: 'reporter', width: 80, index: 'reporter', align: 'center', sortable: true},
            {name: 'report_date', width: 140, index: 'report_date', align: 'center', sortable: true},
            {name: 'report_sender', width: 80, index: 'report_sender', align: 'center', sortable: true},
            {name: 'report_send_date', width: 140, index: 'report_send_date', align: 'center', sortable: true},
            {name: 'status', hidden: true, hidedlg: true}

        ];

        W.updateActionIcons = function () {
        };
        W.updateActionIcons();

        W.onSelectRow = function (ids, status) { //单击选择行

        };

        // $(".ipt-date,.input-daterange").datepicker({
        //     language: 'zh-CN',
        //     format: "yyyy-MM-dd",
        //     autoclose: true,
        //     pickerPosition: "bottom-right"
        // });

        $('.ipt-date,.ipt-range-date').daterangepicker({
            format: 'YY-MM-DD'
        });

        $('.ipt-person').selectUser();

        var trRowArray = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
        showSearchMore($('#btn-search-more'), trRowArray, '_dna_report_is_search_more');

    }();

    /**
     * 修改信息
     * @param btn
     */
    W.showEditDialog = function (btn) {
        var ids = $(grid_selector).jqGrid('getGridParam', 'selarrrow');
        if (ids && ids.length == 1) {
            var row = $(grid_selector).jqGrid('getRowData', ids[0]);
            W.showDialog('preEdit', '/dna/admin/preEdit?id=' + row.id, '修改数据:' + row.barcode_long,
                '90%', '450px', function (contextWindow, dialog) {
                    $('#edit-form', contextWindow.document).submit();
                });
        } else {
            Toast.show('请先勾选一行数据');
        }
    };

    /**
     * 修改的回调
     * @param changedRows
     * @param error
     */
    W.editCb = function (changedRows, error) {
        if (changedRows == 1) {
            Toast.show('保存成功');
            $('#preEdit').dialog('close').remove();
            jQuery(grid_selector).trigger('reloadGrid');
        } else if (changedRows == -1) {
            Toast.show('数据没有变化,不能保存!');
        } else {
            Toast.show('保存失败,请联系管理员!');
            localStorage.setItem('_error_editExtract_Cb', error);
        }
    };

    /**
     * 显示删除的对话框
     */
    W.showDeleteDialog = function () {
        var ids = $(grid_selector).jqGrid('getGridParam', 'selarrrow');
        if (ids && ids.length >= 1) {
            bootbox.confirm("删除后不可恢复！！！您确定要彻底删除此数据吗？？？", function (result) {
                if (result) {
                    $.post('dna/admin/delete', {
                        ids: ids.join(',')
                    }, function (result) {
                        if (result.affectedRows > 0) {
                            Toast.show(result.affectedRows + '条数据，数据已经彻底删除！');
                            jQuery(grid_selector).trigger('reloadGrid');
                        } else {
                            Toast.show('没有数据被删除！');
                            localStorage.setItem('_error_delete', result.err);
                        }
                    });
                } else {
                    Toast.show('您取消了删除操作!');
                    jQuery(grid_selector).trigger('reloadGrid');
                }
            });
        } else {
            Toast.show('请先勾选一行数据');
        }
    };

    /**
     * 导出excel文件
     */
    W.exportCvs = function () {
        $('#search-form-id')
            .off('submit').attr('action', 'dna/admin/exportExcel').attr('method', 'post').attr('target', '_blank').submit()
            .on('submit', searchFormSubmitHandler).removeAttr('action').removeAttr('target');
    };

})(window);