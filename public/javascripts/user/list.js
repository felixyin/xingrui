/**
 * Created by fy on 15-9-8.
 */
(function (W) {
    W.userPageInit = function () {

        W._shrinkToFit=true;
        W.grid_selector = "#grid-table";
        W.pager_selector = "#grid-pager";
        W.search_form = '#search-form-id';
        W._title = '员工管理';
        W.str = location.search;
        W._url = BASE_URL + "user/list";
        W._sortname = 'username';
        W._sortorder = 'asc';
        $('.date').datepicker();
        W._postData = {};
        /*`id`, `username`, `password`, `company`, `department`, `name`, `phone`, `status`, `cdate`, `udate`*/
        W._colNames = ['登陆账号', '员工姓名', '角色', '状态', '密码', '操作'];
        W._colModel = [
            {name: 'username', width: 120, index: 'username', align: "center", sortable: true},
            {name: 'realName', width: 120, index: 'realName', align: "center", sortable: true},
            {name: 'role', width: 600, index: 'role', align: "center", sortable: true},
            {
                name: 'status', width: 100, index: 'status', align: "center", sortable: true,
                formatter: function (value) {
                    if (value === 1) {
                        return '有效';
                    } else {
                        return '无效';
                    }
                }
            },
            {name: 'password', width: 100, index: 'password', align: "center", sortable: true, hidden: true},
            {
                name: '操作', width: 100, index: '', sortable: false, align: 'center',
                formatter: function (value, options, row) {
                    var userId = row.id;
                    var rowJson = encodeURIComponent(JSON.stringify(row));
                    return '<button class="btn btn-primary btn-sm" onclick="editUserInfo(this,' + userId + ',\'' + rowJson + '\');">编辑</button>';
                }
            }
        ];

        W.updateUserStatus = function (owner, userId, status) {
            $.post('user/update', {userId: userId, status: status}, function (result) {
                var msg = '修改失败', color = 'red';
                if (result && result.status) msg = '修改成功', color = 'green';
                $(owner).parent().empty().append('<span style="color:' + color + ';">' + msg + '<span>');
                setTimeout(function () {
                    jQuery(grid_selector).trigger("reloadGrid");
                }, 1000);
            });
        };
        W.addCategoryJsonp = function (id, status) {
            window.__myDialog.modal('hide');
            if (status == true) {
                alert("保存成功！");
            } else {
                alert("保存失败！");
            }
            setTimeout(function () {
                jQuery(grid_selector).trigger('reloadGrid');
            }, 1000);
        };

        /**
         * 添加用户
         */
        W.addUser = function (onwer, id) {
            var addUrl = 'user/add'; // 添加请求
            $.post('user/getRoles', function (roles) {
                // console.log(result);

                var html = jade.templates.editUserInfo({action: addUrl, roles: roles});
                window.__myDialog = bootbox.dialog({
                    title: "新增员工",
                    message: html,
                    buttons: {
                        tiJiao: {
                            label: "保存",
                            className: "btn-success my-submit-btn-id",
                            callback: function () {
                                if ($('#editForm').data('cantSubmit') === 1) {
                                    return false;
                                }
                                $('#uName').remove();
                                $('.my-submit-btn-id').hide();
                                $('#editForm').submit();
                                return false;
                            }
                        }
                    }
                });

                afterDomReady('#role', function ($dom) {
                    $dom.chosen();
                    $('#role_chosen').width(165);
                });

            });

        };
        W.userValidate = function (owner, operator) {
            var username = $("#username").val().trim();
            var uName = $("#uName").val();
            $.ajax({
                url: 'user/validate',
                data: {
                    username: username
                },
                type: 'post',
                dataType: 'json',
                success: function (data) {
                    if (data.status === "yes") {
                        $("#file_upload_form").removeAttr("disabled");
                    } else {
                        if (username === uName) {
                            $("#file_upload_form").removeAttr("disabled");
                        } else {
                            $('#file_upload_form').data('cantSubmit', 1);
                            $('#editForm').data('cantSubmit', 1);
                            $("#spanName").html("登陆账号已存在！");
                        }
                    }
                },
                error: function () {
                    alert("err");
                }
            });
            flag = true;
        };
        /**
         * 服务器导入用户成功后的ｊｓｏｎｐ回调函数
         */
        W.importCallback = function (status, sMsg) {
            var msg = '导入失败', color = 'red';
            if (status) {
                msg = '导入结束', color = 'green';
            } else {
                $('.my-add-btn-id').show();
            }
            $('#progress-id').replaceWith('<span style="font-size:13px;color:' + color + ';">' + msg + '~~~<span><br/><div>' + sMsg + '</div>');
            //setTimeout(function () {
            //    window.__myDialog.modal('hide');
            jQuery(grid_selector).trigger('reloadGrid');
            //}, 1500);
        };

        /**
         * 显示导入用户的消息
         */
        W.showMessage = function (msg) {
            $('#message-id').append('<div style="width:800px;">' + msg + '</div>');
        };

        /**
         * 导入进度的方法
         */
        W.importProgress = function (progress) {
            $('#progress-id').show().attr('data-percent', progress);
            $('#progress-bar-id').css('width', progress);
        };

        /**
         * 添加分类的ｊｓｏｎｐ回调函数
         */
        W.addUserJsonp = function (id, status) {
            window.__myDialog.modal('hide');
            var msg = '修改失败', color = 'red';
            if (status) msg = '修改成功', color = 'green';
            $('.my-a-' + id).parent().empty().append('<span style="color:' + color + ';">' + msg + '<span>');
            setTimeout(function () {
                jQuery(grid_selector).trigger('reloadGrid');
            }, 1000);
        };

    };
    /**
     * 编辑会员信息
     */
    W.editUserInfo = function (owner, userId, rowJson) {
        var row = JSON.parse(decodeURIComponent(rowJson));
        row.userId = userId;
        row.action = 'user/updateUserInfo';
        $.post('user/getRoles', {userId: userId}, function (result) {
            // console.log(result);
            row.roles = result;
            var html = jade.templates.editUserInfo(row);
            W.__myDialog = bootbox.dialog({
                title: "编辑员工信息",
                message: html,
                buttons: {
                    tiJiao: {
                        label: "保存",
                        className: "btn-success my-submit-btn-id",
                        callback: function () {
                            if ($('#editForm').data('cantSubmit') === 1) {
                                return false;
                            }
                            $('#uName').remove();
                            $('.my-submit-btn-id').hide();
                            $('#editForm').submit();
                            return false;
                        }
                    }
                }
            });

            afterDomReady('#role', function ($dom) {
                $dom.chosen();
                $('#role_chosen').width(165);
            });

        });
    };
})(window);

