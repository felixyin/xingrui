/**
 * Created by FY on 2016/2/16.
 */

//override dialog's title function to allow for HTML titles
$.widget("ui.dialog", $.extend({}, $.ui.dialog.prototype, {
    _title: function (title) {
        var $title = this.options.title || '&nbsp;'
        if (("title_html" in this.options) && this.options.title_html == true)
            title.html($title);
        else title.text($title);
    }
}));

/**
 * 显示提示的对象
 * @type {{show: Function, hide: Function}}
 */
var Toast = {
    show: function (title, text) {
        this.hide(function () {
            $.gritter.add({
                title: title,
                text: text,
                class_name: 'gritter-error gritter-light'
            });
        });
    },
    hide: function (cb) {
        $.gritter.removeAll();
        setTimeout(cb, 500);
    },
    clear: function () {
        $.gritter.removeAll();
    }
};


/**
 * 定时检测dom是否存在了
 * @param selector
 * @param cb
 */
function afterDomReady(selector, cb) {
    var t = setTimeout(function () {
        var x = setInterval(function () {
            var $j = jQuery(selector);
            if ($j.size()) {
                clearInterval(x);
                clearTimeout(t);
                cb($j);
            }
        }, 200);
    });
}

/**
 * 显示更多搜索选项
 */
function showSearchMore(id, hideSearchRows, localStorageKey) {
    var _dna_is_search_more = localStorage.getItem(localStorageKey);
    if (_dna_is_search_more == 'true') {
        getSearchTr(hideSearchRows).show();
        $('#btn-search-more').text('隐藏更多搜索项');
    } else {
        getSearchTr(hideSearchRows).hide();
        $('#btn-search-more').text('显示更多搜索项');
    }
    $(id).click(function () {
        var _dna_receive_is_search_more = localStorage.getItem(localStorageKey);
        if (_dna_receive_is_search_more == 'true') {
            getSearchTr(hideSearchRows).hide();
            $(this).text('显示更多搜索项');
            localStorage.setItem(localStorageKey, 'false');
        } else {
            getSearchTr(hideSearchRows).show();
            $(this).text('隐藏更多搜索项');
            localStorage.setItem(localStorageKey, 'true');
        }
    });
}

(function (W) {

    /**
     * @name 提交的请求的key的名称
     * @message 错误消息
     */
    W.validate = function (name, message) {
        $.gritter.add({
            title: message,
            class_name: 'gritter-info gritter-center'
        });
        $('input[name="' + name + '"],textarea[name="' + name + '"]').focus();
        $('.my-submit-btn-id').show();
        var x = setTimeout(function () {
            $.gritter.removeAll();
            clearTimeout(x);
        }, 2000);
    };

    /**
     * 成功和失败的通用会掉方法
     * @param id
     * @param status
     */
    W.cbJsonp = function (id, status) {
        window.__myDialog.modal('hide');
        var msg = '保存失败', color = 'red';
        if (status) msg = '保存成功', color = 'green';
        $.gritter.add({
            title: msg,
            //text: msg,
            class_name: 'gritter-error gritter-light'
        });
        //$('.my-a-' + id).parent().empty().append('<span style="color:' + color + ';">' + msg + '<span>');
        setTimeout(function () {
            jQuery(grid_selector).trigger('reloadGrid');
        }, 1000);
    };

    W.cbJsonpForRpc = function (result) {
        W.cbJsonp(null, !result.err);
    };

    W.clearUser = function (mark) {
        sessionStorage.removeItem('_select_user_for_' + mark);
        Toast.show('记住的' + (mark ? mark : '操作用户') + '已删除');
    };

    /**
     * 弹出选择用户对话框,选择后回调
     * @param userMark 字符串,用于区别此选择的用户是录入采血单,还是审核,还是更换采血管;此值与clearUser方法对应
     * @param cb
     * @param stepRole
     */
    W.selectUser = function (userMark, cb, stepRole) {
        var userId = sessionStorage.getItem('_select_user_for_' + userMark);
        if (userId) {
            cb(userId);
        } else {
            $.post('user/getUserByRole', {stepRole: stepRole || ''}, function (roleAndUsers) {

                var html = jade.templates.selectUser({roleAndUsers: roleAndUsers});

                var __myDialog = bootbox.dialog({
                    //size: 'small',
                    title: userMark ? '选择' + userMark + '对话框' : "选择操作用户对话框",
                    message: html,
                    buttons: {
                        tiJiao: {
                            label: "确定",
                            className: "btn-success my-submit-btn-id",
                            callback: function () {

                                var userId = $('.my-select-user-radio').filter(':checked').val();
                                if (userId) {
                                    __myDialog.modal('hide');
                                    Toast.clear();
                                    sessionStorage.setItem('_select_user_for_' + userMark, userId);
                                    cb(userId);
                                } else {
                                    Toast.show('请先选择' + userMark);
                                }
                                return false;
                            }
                        }
                    }
                });

                afterDomReady('.my-accordion', function ($dom) {
                    $dom.accordion({
                        collapsible: true,
                        heightStyle: "content",
                        animate: 250,
                        header: ".accordion-header"
                    });
                });
            });
        }
    };

    /**
     * 显示iframe形式的dialog
     *
     * @param id
     * @param url dna/receive/preAddCxd
     * @param title 录入采血单
     * @param width 70%
     * @param height 450px
     * @param saveCb function () {
                    $('#addForm').submit();
                    $(this).dialog("close");
                    return false;
                }
     * @param cancelCb function (isOk) {
                            if (isOk) {
                                $(this).dialog("close");
                            }
                        }
     */
    W.showDialog = function (id, url, title, width, height, saveCb, cancelCb) {
        $('<div id="' + id + '"><div style="width: 100%;height:' + (height || '450px') + '!important;overflow:hidden;">' +
            '<iframe id="' + id + 'Ifame" src="' + url + '" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no"  width="100%" height="100%"></iframe>' +
            '</div></div>').dialog({
            position: {
                my: "top",
                at: "top"
            },
            title: "<div class='widget-header widget-header-large' style='line-height:45px;'>" +
            "<h3 class='smaller'><i class='icon-ok'></i> " + title + "</h3>" +
            "</div>",
            title_html: true,
            minWidth: 500,
            width: width || '70%',
            resizable: true,
            modal: true,
            buttons: [{
                text: '关闭',
                "class": "btn btn-danger btn-xs",
                click: function () {
                    // bootbox.confirm({
                    //     title: '提示',
                    //     message: "您确定不保存就关闭吗?",
                    //     buttons: {
                    //         cancel: {
                    //             label: '<i class="fa fa-times"></i> 关闭'
                    //         },
                    //         confirm: {
                    //             label: '<i class="fa fa-check"></i> 确定'
                    //         }
                    //     },
                    //     callback: function (isOk) {
                    if (cancelCb) {
                        var context = $('#' + id + 'Ifame').get(0).contentWindow;
                        cancelCb(context, this);
                    } else {
                        $(this).dialog("close").remove();
                    }
                    // }
                    // });
                }
            }, {
                text: '保       存',
                "class": "btn btn-primary btn-xs my-dialog-save-btn",
                click: function () {
                    var context = $('#' + id + 'Ifame').get(0).contentWindow;
                    saveCb(context, this);
                }
            }]
        });

    };

    /**
     * 返回后台数据库某个表,某个咧的count数
     * @param postData
     * @param cb
     */
    W.getCountFromDB = function (postData, cb) {
        $.post('common/getCount', {
            data: JSON.stringify(postData)
        }, cb);
    };

    /**
     * 返回searchtable的第几行tr
     * @param arr
     * @param cls
     * @returns {*|jQuery}
     */
    W.getSearchTr = function (arr, cls) {
        return $(cls || '.searchTable').find('tr').filter(function (i, v) {
            for (var k in arr) {
                var a = arr[k];
                if (a == i)return true;
            }
            return false;
        });
    };

    /**
     * 选择用户jquery插件
     */
    jQuery.fn.extend({
        selectUser: function () {
            $(this).click(function () {
                var self = this;
                var userMark = $(self).parent().prev().text();
                $.post('user/getUserByRole', {stepRole: ''}, function (roleAndUsers) {

                    var html = jade.templates.selectUser({roleAndUsers: roleAndUsers});

                    var __myDialog = bootbox.dialog({
                        size: 'small',
                        title: userMark ? '选择' + userMark + '对话框' : "选择操作用户对话框",
                        message: html,
                        buttons: {
                            tiJiao: {
                                label: "确定",
                                className: "btn-success my-submit-btn-id",
                                callback: function () {

                                    var userId = $('.my-select-user-radio').filter(':checked').val();
                                    if (userId) {
                                        __myDialog.modal('hide');
                                        Toast.clear();

                                        $(self).val(userId);
                                    } else {
                                        Toast.show('请先选择' + userMark);
                                    }
                                    return false;
                                }
                            }
                        }
                    });

                    afterDomReady('.my-accordion', function ($dom) {
                        $dom.accordion({
                            collapsible: true,
                            heightStyle: "content",
                            animate: 250,
                            header: ".accordion-header"
                        });
                    });
                });
            });
        }
    });


    /**
     * 切换是否固定列或排序显示
     */
    W.switchTableModel = function (owner) {
        var isFrozen = $(owner).prop('checked');
        if (isFrozen) { //固定列模式
            jQuery(grid_selector).jqGrid("setGridParam", { sortable: false});
            jQuery(grid_selector).jqGrid('setFrozenColumns');
            jQuery(grid_selector).trigger("reloadGrid");
        } else { //排序模式
            jQuery(grid_selector).jqGrid("setGridParam", { sortable: true});
            jQuery(grid_selector).jqGrid('destroyFrozenColumns');
        }
    };

})(window);