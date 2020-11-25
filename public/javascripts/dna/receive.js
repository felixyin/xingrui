/**
 * Created by fy on 16-12-29.
 */
'use strict';
(function (W) {

    W.grid_selector = "#grid-table";
    W.pager_selector = "#grid-pager";
    W.search_form = '#search-form-id';
    W.str = location.search;
    W._title = '样本接收管理';
    W._url = BASE_URL + "dna/receive/list";
    W._sortname = 'sample_date';
    W._sortorder = 'DESC';
    W._postData = {};
    W._colNames = ['序号', '条码编号', '医院名称', '样本编号', '采样日期', '接收日期', '姓名', '状态', '身份证号', '年龄', '孕周', '孕天', '妊娠情况',
        '不良孕产史', '备注', '录入人员', '录入日期', '审批人员', '审批日期', '采血管入库人', '采血管入库位置', '采血管入库时间', ''];
    W._colModel = [
        {name: 'id', width: 40, index: 'id', align: 'center', sortable: true, frozen: true},
        {name: 'barcode_long', width: 120, index: 'barcode_long', align: 'center', sortable: true, frozen: true},
        {name: 'hospital', width: 120, index: 'hospital', align: 'center', sortable: true, frozen: true},
        {name: 'sample_code', width: 80, index: 'sample_code', align: 'center', sortable: true, frozen: true},
        {
            name: 'sample_date', width: 130, index: 'sample_date', align: 'center', sortable: true, frozen: true,
            formatter: function (value, options, row) {
                if (value) {
                    return value.substring(0, 10);
                }
            }
        },
        {
            name: 'receive_date', width: 130, index: 'receive_date', align: 'center', sortable: true, frozen: true,
            formatter: function (value, options, row) {
                if (value) {
                    return value.substring(0, 10);
                }
            }
        },
        {name: 'real_name', width: 80, index: 'real_name', align: 'center', sortable: true, frozen: true},
        {
            name: 'status1', width: 100, index: 'status', align: 'center', sortable: true,
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
                    default:
                        text = '';
                }
                return text;
            }, frozen: true
        },
        {name: 'id_card', width: 150, index: 'id_card', align: 'center', sortable: true},
        {name: 'age', width: 130, index: 'age', align: 'center', sortable: true},
        {name: 'pregnancy_week', width: 100, index: 'pregnancy_week', align: 'center', sortable: true},
        {name: 'pregnancy_day', width: 100, index: 'pregnancy_day', align: 'center', sortable: true},
        {name: 'pregnancy_condition', width: 100, index: 'pregnancy_condition', align: 'center', sortable: true},
        {name: 'pregnancy_bad_history', width: 100, index: 'pregnancy_bad_history', align: 'center', sortable: true},
        {name: 'comments', width: 100, index: 'comments', align: 'center', sortable: true},
        {name: 'inputter', width: 100, index: 'inputter', align: 'center', sortable: true},
        {name: 'input_date', width: 100, index: 'input_date', align: 'center', sortable: true},
        // {name: 'changer', width: 100, index: 'changer', align: 'center', sortable: true},
        // {name: 'change_date', width: 100, index: 'change_date', align: 'center', sortable: true},
        {name: 'checker', width: 100, index: 'checker', align: 'center', sortable: true},
        {name: 'check_date', width: 100, index: 'check_date', align: 'center', sortable: true},
        {name: 'warehouser', width: 100, index: 'warehouser', align: 'center', sortable: true},
        {name: 'warehouse_place', width: 100, index: 'warehouse_place', align: 'center', sortable: true},
        {name: 'warehouse_date', width: 130, index: 'warehouse_date', align: 'center', sortable: true},
        // {name: 'barcode_short', width: 100, index: 'barcode_short', align: 'center', sortable: true},
        {name: 'status', hidden: true, hidedlg: true}
    ];

    W.updateActionIcons = function () {
        $('#btn-cxd').children('button').prop('disabled', false).first().children('i').html('&nbsp;批量录入采血单');
        // $('#btn-cxg').children('button').prop('disabled', false).first().children('i').html('&nbsp;批量更换采血管');
        $('#btn-sh').children('button').prop('disabled', true).first().children('i').html('&nbsp;审核');
        $('#btn-rk').children('button').prop('disabled', true).first().children('i').html('&nbsp;入库');
        $('#btn-ck').children('button').prop('disabled', false).first().children('i').html('&nbsp;批量出库');
    };
    W.updateActionIcons();

    W.onSelectRow = function (ids, status) { //单击选择行
        var myIds = $(grid_selector).jqGrid('getGridParam', 'selarrrow');
        var selectedLength = myIds.length;
        if (selectedLength == 1) {
            $('#btn-cxd').children('button').prop('disabled', false).first().children('i').html('&nbsp;修改采血单');
            // $('#btn-cxg').children('button').prop('disabled', false).first().children('i').html('&nbsp;更换采血管');
            $('#btn-sh').children('button').prop('disabled', false).first().children('i').html('&nbsp;审核');
            $('#btn-rk').children('button').prop('disabled', false).first().children('i').html('&nbsp;入库');
            $('#btn-ck').children('button').prop('disabled', false).first().children('i').html('&nbsp;出库');
        } else if (selectedLength > 1) {
            $('#btn-cxd').children('button').prop('disabled', true).first().children('i').html('&nbsp;批量录入采血单');
            // $('#btn-cxg').children('button').prop('disabled', true);
            $('#btn-sh').children('button').prop('disabled', false).first().children('i').html('&nbsp;批量审核');
            $('#btn-rk').children('button').prop('disabled', false).first().children('i').html('&nbsp;批量入库');
            $('#btn-ck').children('button').prop('disabled', false).first().children('i').html('&nbsp;批量出库');
        } else { // 0
            $('#btn-cxd').children('button').prop('disabled', false).first().children('i').html('&nbsp;批量录入采血单');
            // $('#btn-cxg').children('button').prop('disabled', false).first().children('i').html('&nbsp;批量更换采血管');
            $('#btn-sh').children('button').prop('disabled', true).first().children('i').html('&nbsp;审核');
            $('#btn-rk').children('button').prop('disabled', true).first().children('i').html('&nbsp;入库');
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

    // showSearchMore($('#btn-search-more'), [2], '_dna_receive_is_search_more');

    /**
     * 录入采血单
     * @param btn
     */
    W.showCxdDialog = function (btn) {
        W.selectUser('采血单录入人员', function (userId) {
            var ids = $(grid_selector).jqGrid('getGridParam', 'selarrrow');
            if (ids && ids.length == 1) {
                var row = $(grid_selector).jqGrid('getRowData', ids[0]);
                var id = row.id;
                var barcode_long = row.barcode_long;
                var status = parseInt(row.status);
                if (status < 3) { // 未审批状态
                    W.showDialog('preEditCxd', '/dna/receive/preEditCxd?id=' + id + '&userId=' + userId, '修改采血单:' + barcode_long, '70%', '450px', function (contextWindow, dialog) {
                        $('#edit-cxd-form', contextWindow.document).submit();
                    });
                } else {
                    Toast.show('此采血单已审批,不能修改:' + barcode_long);
                }
            } else { // 批量录入逻辑
                W.showDialog('preAddCxd', '/dna/receive/preAddCxd?userId=' + userId, '批量录入采血单', '70%', '450px', function (contextWindow, dialog) {
                    $('#edit-cxd-form', contextWindow.document).submit();
                });
            }
        });
    };

    /**
     * 录入采血单回调
     * @param cxdId
     * @param error
     */
    W.addCxdCb = function (cxdId, error) {
        if (cxdId) {
            Toast.show('采血单保存成功,开始录入下一单!');
            $('#preAddCxd').dialog('close').remove();
            jQuery(grid_selector).trigger('reloadGrid');
            W.showCxdDialog();
        } else {
            Toast.show('采血单保存失败,请联系管理员!');
            localStorage.setItem('_error_addCxd', error);
        }
    };

    /**
     * 修改采血单回调
     * @param changedRows
     * @param error
     */
    W.editCxdCb = function (changedRows, error) {
        if (changedRows) {
            Toast.show('采血单修改成功');
            $('#preEditCxd').dialog('close').remove();
            jQuery(grid_selector).trigger('reloadGrid');
        } else {
            Toast.show('采血单修改失败,请联系管理员!');
            localStorage.setItem('_error_editCxd', error);
        }
    };

    /**
     * 更换采血管
     * @param btn
     */
    W.showCxgDialog = function (btn) {
        var barcode_long = '';
        var ids = $(grid_selector).jqGrid('getGridParam', 'selarrrow');
        if (ids && ids.length == 1) {
            var row = $(grid_selector).jqGrid('getRowData', ids[0]);
            barcode_long = row.barcode_long;
            var status = row.status;
            if (status >= 3) { // 3 已审批
                Toast.show('此数据已审批,不能修改:' + barcode_long);
                return;
            }
        }
        W.selectUser('采血管更换人员', function (userId) {
            W.showDialog('preAddCxg', '/dna/receive/preAddCxg?userId=' + userId + '&barcode_long=' + barcode_long, '更换采血管:' + barcode_long, '60%', '200px', function (contextWindow, dialog) {
                var ctm = $('#ff-ctmbh', contextWindow.document).val();
                var dtm = $('#ff-dtmbh', contextWindow.document).val();
                if (ctm && dtm) {
                    $('#edit-cxg-form', contextWindow.document).submit();
                } else {
                    Toast.show('请先扫描条码再保存');
                }
            });
        });
    };

    /**
     * 更新采血管回调
     * @param cxgId
     * @param error
     */
    W.addCxgCb = function (cxgId, error) {
        if (cxgId) {
            $('#preAddCxg').dialog('close').remove();

            var ids = $(grid_selector).jqGrid('getGridParam', 'selarrrow');
            if (ids && ids.length == 1) {
                var row = $(grid_selector).jqGrid('getRowData', ids[0]);
                var barcode_long = row.barcode_long;
                Toast.show('更换采血管成功,条码编号:' + barcode_long);
            } else {
                Toast.show('更换采血管成功,开始录入下一单!');
                W.showCxgDialog();
            }
            jQuery(grid_selector).trigger('reloadGrid');
        } else {
            Toast.show('更换采血管失败,请联系管理员!');
            localStorage.setItem('_error_addCxg', error);
        }
    };

    /**
     * 审核
     * @param btn
     */
    W.showShDialog = function (btn) {
        var ids = $(grid_selector).jqGrid('getGridParam', 'selarrrow');
        if (ids && ids.length) {
            var warnArray = [];
            var idArray = [];
            for (var i in ids) {
                var id = ids[i];
                var row = $(grid_selector).jqGrid('getRowData', id);
                if (row.status == 1 /*已录入*/) {
                    idArray.push(id);
                } else {
                    $(grid_selector).jqGrid('setSelection', id, false);
                    warnArray.push(id);
                }
            }
            if (warnArray.length > 0) {
                Toast.show('您选择的部分行的状态不符合审核条件,已经取消选中');
            }
            if (idArray.length > 0) {
                W.selectUser('审核人员', function (userId) {
                    $.post('dna/receive/addSh', {checker: userId, ids: idArray.join(',')}, function (result) {
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
                    })
                });
            }
        } else {
            Toast.show('请先在列表中勾选您要审核的数据行');
        }
    };

    /**
     * 入库
     */
    W.showRkDialog = function () {
        var ids = $(grid_selector).jqGrid('getGridParam', 'selarrrow');
        if (ids && ids.length) {
            var warnArray = [];
            var idArray = [];
            for (var i in ids) {
                var id = ids[i];
                var row = $(grid_selector).jqGrid('getRowData', id);
                if (row.status == 2) {// 已审批
                    idArray.push(id);
                } else {
                    $(grid_selector).jqGrid('setSelection', id, false);
                    warnArray.push(id);
                }
            }
            if (warnArray.length > 0) {
                Toast.show('您选择的部分行不符合入库条件,已经取消选中');
            }
            if (idArray.length > 0) {
                W.selectUser('入库人员', function (userId) {
                    var dnaWarehouse = jade.templates.dnaWarehouse({
                        action: 'dna/receive/addRk',
                        ids: idArray.join(','),
                        warehouser: userId
                    });
                    window.__myDialog = bootbox.dialog({
                        title: '入库',
                        message: dnaWarehouse,
                        buttons: {
                            tiJiao: {
                                label: "保存",
                                className: "btn-success my-submit-btn-id",
                                callback: function () {
                                    if ($('#edit-form').data('cantSubmit') === 1) {
                                        return false;
                                    }
                                    $('.my-submit-btn-id').hide();
                                    $('#edit-form').submit();
                                    return false;
                                }
                            }
                        }
                    });
                    //
                    // afterDomReady('#role', function ($dom) {
                    //     $dom.chosen();
                    //     $('#role_chosen').width(165);
                    // });
                });
            }
        } else {
            Toast.show('请先在列表中勾选您要入库的数据行');
        }
    };

    /**
     * 入库回调
     * @param changedRows
     * @param error
     */
    W.addRkCb = function (changedRows, error) {
        if (changedRows > 0) {
            $('#preAddRk').dialog('close').remove();
            Toast.show('入库成功');
            window.__myDialog.modal('hide');
            jQuery(grid_selector).trigger('reloadGrid');
        } else {
            Toast.show('更换采血管失败,请联系管理员!');
            localStorage.setItem('_error_addCxg', error);
        }
    };

    /**
     * 出库
     * @param btn
     */
    W.showCkDialog = function (btn) {
        var barcodeShortArray = [];
        var warnArray = [];
        var ids = $(grid_selector).jqGrid('getGridParam', 'selarrrow');
        if (ids && ids.length) {
            for (var i in ids) {
                var id = ids[i];
                var row = $(grid_selector).jqGrid('getRowData', id);
                if (row.status == 3 /*已审批且入库*/ || row.status == 8/*重提取*/) {
                    barcodeShortArray.push(row.barcode_long);
                } else {
                    $(grid_selector).jqGrid('setSelection', id, false);
                    warnArray.push(id);
                }
            }
            if (warnArray.length > 0) {
                Toast.show('您选择的部分行不符合出库条件,已经取消选中');
            }
            if (barcodeShortArray.length > 0) {
                W.selectUser('出库人员', function (ckUserId) {
                    W.selectUser('交接人员', function (jjUserId) {
                        W.showDialog('preAddCk', '/dna/receive/preAddCk?sample_outer=' + ckUserId + '&extract_handover=' + jjUserId + '&barcodeShortArray=' + barcodeShortArray, '出库', '60%', '450px',
                            function (contextWindow, dialog) {
                                var dtm = $('.my-dtmbh', contextWindow.document).map(function (i, v) {
                                    var vv = $(v).val();
                                    if (vv)return vv;
                                }).get().join(',');
                                if (dtm) {
                                    $('#edit-ck-form', contextWindow.document).submit();
                                } else {
                                    Toast.show('请先扫描条码再保存出库');
                                }
                            });
                    }, 'DNA提取管理');
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
            localStorage.setItem('_error_addCk', error);
        }
    };

    /**
     * 导出excel文件
     */
    W.exportCvs = function () {
        $('#search-form-id')
            .off('submit').attr('action', 'dna/receive/exportExcel').attr('method', 'post').attr('target', '_blank').submit()
            .on('submit', searchFormSubmitHandler).removeAttr('action').removeAttr('target');
    };

    /**
     * 复制条码编号
     */
    W.copyBarcode = function (owner) {
        var barcodeShortArray = [];
        var ids = $(grid_selector).jqGrid('getGridParam', 'selarrrow');
        if (ids && ids.length) {
            for (var i in ids) {
                var row = $(grid_selector).jqGrid('getRowData', ids[i]);
                barcodeShortArray.push(row.barcode_long);
            }
        }
        console.log(barcodeShortArray.join('\n'));
        if (barcodeShortArray.length >= 1) {
            $('#barcode-copy-ta').val(barcodeShortArray.join('\n'));
        } else {
            Toast.show('请先勾选要复制的行');
        }
    };

    var clipboard = new Clipboard('#btn-copy-id');
    clipboard.on('success', function (e) {
        // console.error('Action:', e.action);
        // console.info('Text:', e.text);
        // console.info('Trigger:', e.trigger);
        if (e.text && e.text.length > 0) {
            Toast.show('已复制到剪贴板');
        }
        e.clearSelection();
    });
    clipboard.on('error', function (e) {
        Toast.show('未知原因,复制失败');
        // console.error('Action:', e.action);
        // console.error('Trigger:', e.trigger);
    });

    /**
     * 导出到条码打印机
     */
    W.printBarcode = function () {
        var idArray = [];
        var ids = $(grid_selector).jqGrid('getGridParam', 'selarrrow');
        if (ids && ids.length) {
            for (var i in ids) {
                idArray.push(ids[i]);
            }
        }
        if (idArray.length >= 1) {
            $.post('dna/receive/printBarcode', {ids: idArray.join(',')}, function (result) {
                if (result && result.affectedRows > 0) {
                    if (result.affectedRows == 1) {
                        Toast.show('导出条码打印机成功!');
                    } else {
                        Toast.show('批量导出条码打印机成功!');
                    }
                    jQuery(grid_selector).trigger('reloadGrid');
                } else {
                    Toast.show(userId + ',导出条码打印机失败,请联系管理员!');
                    localStorage.setItem('_error_addSh', result.err);
                }
            });
        } else {
            Toast.show('请先勾选要复制的行');
        }
    };
})(window);