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
        W._title = '上机管理';
        W._url = BASE_URL + "dna/operate/list";
        W._sortname = 'input_date';
        W._sortorder = 'ASC';
        W._postData = {};
        W._colNames = ['序号', '条码编号', '上机芯片编码', '上机reads数', '上机q30值', '状态', '建库组出库人', '建库组样本剩余量', '上机组接收人', '上机组接收时间',
            '建库浓度(ng/ul)', '建库片段大小(bp)', '上机人', '上机时间', '上机审查人', '上机审查时间', '上机组出库人', '分析报告组接收人', '分析报告组接收时间', ''];
        W._colModel = [
            {name: 'id', width: 40, index: 'id', align: 'center', sortable: true, frozen: true},
            {name: 'barcode_long', width: 120, index: 'barcode_long', align: 'center', sortable: true, frozen: true},
            // {name: 'barcode_short', width: 100, index: 'barcode_short', align: 'center', sortable: true, frozen: true},
            {name: 'operate_chip_code', width: 100, index: 'operate_chip_code', align: 'center', sortable: true, frozen: true},
            {name: 'operate_reads_val', width: 100, index: 'operate_reads_val', align: 'center', sortable: true, frozen: true},
            {name: 'operate_q30_val', width: 100, index: 'operate_q30_val', align: 'center', sortable: true, frozen: true},
            {
                name: 'status1', width: 100, index: 'status', align: 'center', sortable: true,
                formatter: function (value, options, row) {
                    var text = '';
                    switch (row.status) {
                        case 14:
                            text = ['<span class="label label-default">','未上机',''].join('');
                            break;
                        case 15:
                            text = ['<span class="label label-info">','已上机',''].join('');
                            break;
                        case 16:
                            text = ['<span class="label label-success">','合格',''].join('');
                            break;
                        case 17:
                            text = ['<span class="label label-danger">','废弃',''].join('');
                            break;
                        case 18:
                            text = ['<span class="label label-warning">','重上机',''].join('');
                            break;
                        case 19:
                            text = ['<span class="label label-purple">','已交接',''].join('');
                            break;
                        default:
                            text = '';
                    }
                    return text;
                },
                frozen: true
            },
            {name: 'storage_outer', width: 100, index: 'storage_outer', align: 'center', sortable: true},
            {name: 'storage_out_residue', width: 100, index: 'storage_out_residue', align: 'center', sortable: true},
            {name: 'operate_handover', width: 100, index: 'operate_handover', align: 'center', sortable: true},
            {name: 'operate_handover_date', width: 130, index: 'operate_handover_date', align: 'center', sortable: true},
            {name: 'storage_deep', width: 100, index: 'storage_deep', align: 'center', sortable: true},
            {name: 'storage_part_size', width: 100, index: 'storage_part_size', align: 'center', sortable: true},
            {name: 'operater', width: 100, index: 'operater', align: 'center', sortable: true},
            {name: 'operate_date', width: 130, index: 'operate_date', align: 'center', sortable: true},
            {name: 'operate_checker', width: 100, index: 'operate_checker', align: 'center', sortable: true},
            {name: 'operate_check_date', width: 130, index: 'operate_check_date', align: 'center', sortable: true},
            {name: 'operate_outer', width: 100, index: 'operate_outer', align: 'center', sortable: true},
            // {name: 'operate_out_residue', width: 100, index: 'operate_out_residue', align: 'center', sortable: true},
            {name: 'report_handover', width: 100, index: 'report_handover', align: 'center', sortable: true},
            {name: 'report_handover_date', width: 130, index: 'report_handover_date', align: 'center', sortable: true},
            {name: 'status', hidden: true, hidedlg: true},

        ];

        W.updateActionIcons = function () {
            $('#btn-cxd').children('button').prop('disabled', true).first().children('i').html('&nbsp;录入上机信息');
            $('#btn-sh').children('button').prop('disabled', true).first().children('i').html('&nbsp;审核');
            $('#btn-ck').children('button').prop('disabled', false).first().children('i').html('&nbsp;批量出库');
        };
        W.updateActionIcons();

        W.onSelectRow = function (ids, status) { //单击选择行
            var myIds = $(grid_selector).jqGrid('getGridParam', 'selarrrow');
            var selectedLength = myIds.length;
            if (selectedLength == 1) {
                var row = $(grid_selector).jqGrid('getRowData', myIds[0]);
                if (row.operate_date) { // 修改
                    $('#btn-cxd').children('button').prop('disabled', false).first().children('i').html('&nbsp;修改上机信息');
                } else {
                    $('#btn-cxd').children('button').prop('disabled', false).first().children('i').html('&nbsp;录入上机信息');
                }
                $('#btn-sh').children('button').prop('disabled', false).first().children('i').html('&nbsp;审核');
                $('#btn-ck').children('button').prop('disabled', false).first().children('i').html('&nbsp;出库');
            } else if (selectedLength > 1) {
                $('#btn-cxd').children('button').prop('disabled', true).first().children('i').html('&nbsp;录入上机信息');
                $('#btn-sh').children('button').prop('disabled', false).first().children('i').html('&nbsp;批量审核');
                $('#btn-ck').children('button').prop('disabled', false).first().children('i').html('&nbsp;批量出库');
            } else { // 0
                $('#btn-cxd').children('button').prop('disabled', true).first().children('i').html('&nbsp;录入上机信息');
                $('#btn-sh').children('button').prop('disabled', true).first().children('i').html('&nbsp;审核');
                $('#btn-ck').children('button').prop('disabled', false).first().children('i').html('&nbsp;批量出库');
            }
        };

        $(".ipt-date").datepicker({
            language: 'zh-CN',
            format: "yyyy-MM-dd",
            autoclose: true,
            pickerPosition: "bottom-right"
        });

        $('.ipt-person').selectUser();

        showSearchMore($('#btn-search-more'), [ 3, 4], '_dna_operate_is_search_more');

    }();

    /**
     * 录入上机信息
     * @param btn
     */
    W.showEditDialog = function (btn) {
        W.selectUser('上机录入人员', function (userId) {
            var ids = $(grid_selector).jqGrid('getGridParam', 'selarrrow');
            if (ids && ids.length == 1) {
                var row = $(grid_selector).jqGrid('getRowData', ids[0]);
                var id = row.id;
                var barcode_long = row.barcode_long;
                var status = parseInt(row.status);
                if (status == 14 || status == 15) { // 未审批状态
                    W.showDialog('preEdit', '/dna/operate/preEdit?id=' + id + '&userId=' + userId, '录入上机数据:' + barcode_long,
                        '70%', '350px', function (contextWindow, dialog) {
                            $('#edit-form', contextWindow.document).submit();
                        });
                } else {
                    Toast.show('此记录不能修改:' + barcode_long);
                }
            } else {
                Toast.show('请先勾选一行数据');
            }
        });
    };

    /**
     * 修改的回调
     * @param changedRows
     * @param error
     */
    W.editCb = function (changedRows, error) {
        if (changedRows) {
            Toast.show('保存成功');
            $('#preEdit').dialog('close').remove();
            jQuery(grid_selector).trigger('reloadGrid');
        } else {
            Toast.show('保存失败,请联系管理员!');
            localStorage.setItem('_error_editoperate_Cb', error);
        }
    };

    /**
     * 审核
     * @param btn
     */
    W.showShDialog = function (btn) {
        var ids = $(grid_selector).jqGrid('getGridParam', 'selarrrow');
        if (ids && ids.length) {
            var warnRows = [];
            // var okRows = [];
            for (var i in ids) {
                var id = ids[i];
                if (id) {
                    var row = $(grid_selector).jqGrid('getRowData', id);
                    if (row.status != 15 /*已上机*/) {
                        $(grid_selector).jqGrid('setSelection', id, false);
                        warnRows.push(row.barcode_long);
                        // }else{
                        //     okRows.push(row.barcode_short);
                    }
                }
            }
            if (warnRows.length > 0) {
                Toast.show('您选择的这些行不符合审批要求,已经取消选中:' + warnRows.join(','));
            }
            ids = $(grid_selector).jqGrid('getGridParam', 'selarrrow');

            if (ids && ids.length) {

                W.selectUser('审核人员', function (userId) {
                    bootbox.dialog({
                        message: "<span class='bigger-110' style='font-size:25px;'>请审批,注意:审批后无法再次编辑<span style='font-size:18px;'></span></span>",
                        buttons: {
                            "success": {
                                "label": "<i class='icon-ok'></i> &nbsp;&nbsp;&nbsp;&nbsp;合&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
                                "className": "btn-sm btn-success",
                                "callback": function () {
                                    $.post('dna/operate/addSh', {checker: userId, ids: ids.join(',')}, function (result) {
                                        if (result.changedRows > 0) {
                                            if (result.changedRows == 1) {
                                                Toast.show(userId + ',审核成功!');
                                            } else {
                                                Toast.show(userId + ',批量审核成功!');
                                            }
                                            jQuery(grid_selector).trigger('reloadGrid');
                                        } else {
                                            Toast.show(userId + ',审核失败,请联系管理员!');
                                            localStorage.setItem('_error_addSh', result.err);
                                        }
                                    });
                                }
                            },
                            "click": {
                                "label": "重上机!",
                                "className": "btn-sm btn-warning",
                                "callback": function () {
                                    var warnRows = [];
                                    for (var i in ids) {
                                        var id = ids[i];
                                        var row = $(grid_selector).jqGrid('getRowData', id);
                                        var count = parseInt(row.sample_out_residue);
                                        if (count < 1) { // 没有剩余试管用于重做
                                            $(grid_selector).jqGrid('setSelection', id, false);
                                            warnRows.push(id);
                                        }
                                    }
                                    if (warnRows.length > 0) {
                                        Toast.show('部分选中行,在上一环节已没有剩余试管,已取消选中');
                                    }
                                    ids = $(grid_selector).jqGrid('getGridParam', 'selarrrow');
                                    $.post('dna/redo/operate', {checker: userId, ids: ids.join(',')}, function (result) {
                                        if (result.changedRows > 0) {
                                            if (result.changedRows == 1) {
                                                Toast.show(userId + ',审核成功!');
                                            } else {
                                                Toast.show(userId + ',批量审核成功!');
                                            }
                                            jQuery(grid_selector).trigger('reloadGrid');
                                        } else {
                                            Toast.show(userId + ',审核失败,请联系管理员!');
                                            localStorage.setItem('_error_addSh', result.err);
                                        }
                                    });
                                }
                            },
                            "danger": {
                                "label": "废弃!",
                                "className": "btn-sm btn-danger",
                                "callback": function () {
                                    var warnRows = [];
                                    for (var i in ids) {
                                        var id = ids[i];
                                        var row = $(grid_selector).jqGrid('getRowData', id);
                                        var count = parseInt(row.sample_out_residue);
                                        if (count < 1) { // 没有剩余试管用于重做
                                            $(grid_selector).jqGrid('setSelection', id, false);
                                            warnRows.push(id);
                                        }
                                    }
                                    if (warnRows.length > 0) {
                                        Toast.show('部分选中行,在上一环节已没有剩余试管,已取消选中');
                                    }
                                    ids = $(grid_selector).jqGrid('getGridParam', 'selarrrow');
                                    $.post('dna/redo/delete', {checker: userId, ids: ids.join(',')}, function (result) {
                                        if (result.changedRows > 0) {
                                            if (result.changedRows == 1) {
                                                Toast.show(userId + ',已废弃,审核成功!');
                                            } else {
                                                Toast.show(userId + ',已废弃,批量审核成功!');
                                            }
                                            jQuery(grid_selector).trigger('reloadGrid');
                                        } else {
                                            Toast.show(userId + ',审核失败,请联系管理员!');
                                            localStorage.setItem('_error_addSh', result.err);
                                        }
                                    });
                                }
                            }
                        }
                    });

                });
            }
        } else {
            Toast.show('请先在列表中勾选您要审核的数据行');
        }
    };

    /**
     * 出库
     * @param btn
     */
    W.showCkDialog = function (btn) {
        var idArray = [];
        var ids = $(grid_selector).jqGrid('getGridParam', 'selarrrow');
        if (ids && ids.length) {
            var warnRows = [];
            for (var i in ids) {
                var id = ids[i];
                var row = $(grid_selector).jqGrid('getRowData', id);
                var status = row.status;
                if (status == 16) { // 6为审核通过
                    idArray.push(id);
                } else {
                    $(grid_selector).jqGrid('setSelection', id, false);
                    warnRows.push(row.barcode_long);
                }
            }

            if (warnRows.length > 0) {
                Toast.show('您选择的这些行不符合出库要求,已经取消选中:' + warnRows.join(','));
            }
            ids = $(grid_selector).jqGrid('getGridParam', 'selarrrow');

            if (ids && ids.length) {
                W.selectUser('出库人员', function (ckUserId) {
                    W.selectUser('交接人员', function (jjUserId) {
                        $.post('dna/operate/addCk', {
                            ckUserId: ckUserId,
                            jjUserId: jjUserId,
                            ids: idArray.join(',')
                        }, function (result) {
                            if (result.changedRows > 0) {
                                if (result.changedRows == 1) {
                                    Toast.show('出库成功!');
                                } else {
                                    Toast.show('批量出库成功!');
                                }
                                jQuery(grid_selector).trigger('reloadGrid');
                            } else {
                                Toast.show('出库失败,请联系管理员!');
                                localStorage.setItem('_error_addCk_operate', result.err);
                            }
                        });
                    }, '分析报告管理');
                });
            }
        } else {
            Toast.show('请先在列表中勾选您要出库的数据行');
        }

    };

    /**
     * 出库回调
     * @param changedRows
     * @param error
     */
    W.addCkCb = function (changedRows, error) {
        if (changedRows) {
            Toast.show('已出库!');
            $('#preAddCk').dialog('close').remove();
            jQuery(grid_selector).trigger('reloadGrid');
        } else {
            Toast.show('出库失败,请联系管理员!');
            localStorage.setItem('_error_addCkCb_operate', error);
        }
    };

    /**
     * 导出excel文件
     */
    W.exportCvs = function () {
        $('#search-form-id')
            .off('submit').attr('action', 'dna/operate/exportExcel').attr('method', 'post').attr('target', '_blank').submit()
            .on('submit', searchFormSubmitHandler).removeAttr('action').removeAttr('target');
    };

})(window);