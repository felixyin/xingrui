jade.templates = jade.templates || {};
jade.templates['editUserInfo'] = (function(){
  return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (action, password, realName, roles, status, undefined, userId, username) {
buf.push("<!--Created by fy on 15-12-22.\n 编辑会员信息--><div class=\"row\"><div class=\"col-xs-12\"><iframe id=\"myIframe\" name=\"myIframe\" width=\"0\" height=\"0\" style=\"display: none;\"></iframe><form id=\"editForm\" method=\"post\" role=\"form\"" + (jade.attr("action", '' + (action) + '', true, false)) + " target=\"myIframe\" class=\"form-horizontal\"><input type=\"hidden\" name=\"id\" id=\"userId\"" + (jade.attr("value", '' + (userId) + '', true, false)) + "/><input type=\"hidden\" name=\"uName\" id=\"uName\"" + (jade.attr("value", '' + (username) + '', true, false)) + "/><span id=\"spanName\" style=\"margin-left: 366px; color:red;\"></span><div class=\"form-group\"><label for=\"username\" class=\"col-sm-3 control-label no-padding-right\"> 登陆账号</label><div class=\"col-sm-9\"><input id=\"username\" type=\"text\" name=\"username\" onblur=\"userValidate(this.value)\"" + (jade.attr("value", '' + (username||"") + '', true, false)) + " class=\"col-xs-10 col-sm-5\"/><span class=\"has-warning\"><span class=\"help-block col-xs-12 col-sm-reset inline\">登陆账号长度必须在5到25位之间</span></span></div></div><div class=\"space-4\"></div><div class=\"form-group\"><label for=\"realName\" class=\"col-sm-3 control-label no-padding-right\"> 员工姓名</label><div class=\"col-sm-9\"><input id=\"realName\" type=\"text\" name=\"realName\"" + (jade.attr("value", '' + (realName||"") + '', true, false)) + " class=\"col-xs-10 col-sm-5\"/><span class=\"has-warning\"><span class=\"help-block col-xs-12 col-sm-reset inline\">姓名长度必须在2到7之间</span></span></div></div><div class=\"space-4\"></div><div class=\"form-group\"><label for=\"role\" class=\"col-sm-3 control-label no-padding-right\"> 角色</label><div class=\"col-sm-9\"><select id=\"role\" name=\"role\" multiple=\"multiple\" data-placeholder=\"请选择角色\" class=\"col-xs-10 col-sm-5 chosen-select tag-input-style\"><option value=\"\">全部</option>");
// iterate roles
;(function(){
  var $$obj = roles;
  if ('number' == typeof $$obj.length) {

    for (var flowKey = 0, $$l = $$obj.length; flowKey < $$l; flowKey++) {
      var flowRoles = $$obj[flowKey];

buf.push("<optgroup" + (jade.attr("label", '' + (flowKey) + '', true, false)) + ">");
// iterate flowRoles
;(function(){
  var $$obj = flowRoles;
  if ('number' == typeof $$obj.length) {

    for (var roleKey = 0, $$l = $$obj.length; roleKey < $$l; roleKey++) {
      var roleValue = $$obj[roleKey];

buf.push("<option" + (jade.attr("value", '' + (roleKey) + '', true, false)) + (jade.attr("selected", roleValue ? "selected" : undefined, true, false)) + ">" + (jade.escape(null == (jade_interp = roleKey) ? "" : jade_interp)) + "</option>");
    }

  } else {
    var $$l = 0;
    for (var roleKey in $$obj) {
      $$l++;      var roleValue = $$obj[roleKey];

buf.push("<option" + (jade.attr("value", '' + (roleKey) + '', true, false)) + (jade.attr("selected", roleValue ? "selected" : undefined, true, false)) + ">" + (jade.escape(null == (jade_interp = roleKey) ? "" : jade_interp)) + "</option>");
    }

  }
}).call(this);

buf.push("</optgroup>");
    }

  } else {
    var $$l = 0;
    for (var flowKey in $$obj) {
      $$l++;      var flowRoles = $$obj[flowKey];

buf.push("<optgroup" + (jade.attr("label", '' + (flowKey) + '', true, false)) + ">");
// iterate flowRoles
;(function(){
  var $$obj = flowRoles;
  if ('number' == typeof $$obj.length) {

    for (var roleKey = 0, $$l = $$obj.length; roleKey < $$l; roleKey++) {
      var roleValue = $$obj[roleKey];

buf.push("<option" + (jade.attr("value", '' + (roleKey) + '', true, false)) + (jade.attr("selected", roleValue ? "selected" : undefined, true, false)) + ">" + (jade.escape(null == (jade_interp = roleKey) ? "" : jade_interp)) + "</option>");
    }

  } else {
    var $$l = 0;
    for (var roleKey in $$obj) {
      $$l++;      var roleValue = $$obj[roleKey];

buf.push("<option" + (jade.attr("value", '' + (roleKey) + '', true, false)) + (jade.attr("selected", roleValue ? "selected" : undefined, true, false)) + ">" + (jade.escape(null == (jade_interp = roleKey) ? "" : jade_interp)) + "</option>");
    }

  }
}).call(this);

buf.push("</optgroup>");
    }

  }
}).call(this);

buf.push("</select></div></div><div class=\"space-4\"></div><div class=\"form-group\"><label for=\"password\" class=\"col-sm-3 control-label no-padding-right\"> 请输入新密码</label><div class=\"col-sm-9\"><input id=\"password\" type=\"text\" name=\"password\"" + (jade.attr("value", '' + (password||"") + '', true, false)) + " class=\"col-xs-10 col-sm-5\"/><!--span.help-inline.col-xs-12.col-sm-7span.middle 请填写数字--><span class=\"has-warning\"><span class=\"help-block col-xs-12 col-sm-reset inline\">密码长度在6-25之间</span></span></div></div><div class=\"space-4\"></div><div class=\"form-group\"><label for=\"password1\" class=\"col-sm-3 control-label no-padding-right\"> 请再次输入新密码</label><div class=\"col-sm-9\"><input id=\"password1\" type=\"text\" name=\"password1\"" + (jade.attr("value", '' + (password||"") + '', true, false)) + " class=\"col-xs-10 col-sm-5\"/><!--span.help-inline.col-xs-12.col-sm-7span.middle 请填写数字--><span class=\"has-warning\"><span class=\"help-block col-xs-12 col-sm-reset inline\">密码长度在6-25之间</span></span></div></div><div class=\"space-4\"></div><div class=\"form-group\"><label for=\"status\" class=\"col-sm-3 control-label no-padding-right\"> 是否有效</label><div class=\"col-sm-9\"><select id=\"status\" type=\"text\" name=\"status\"" + (jade.attr("value", '' + (status||"") + '', true, false)) + " class=\"col-xs-10 col-sm-5\"><option value=\"1\"" + (jade.attr("selected", status === 1 ? 'selected' : undefined, true, false)) + ">有效</option><option value=\"0\"" + (jade.attr("selected", status === 0 ? 'selected' : undefined, true, false)) + ">无效</option></select></div></div></form></div></div>");}.call(this,"action" in locals_for_with?locals_for_with.action:typeof action!=="undefined"?action:undefined,"password" in locals_for_with?locals_for_with.password:typeof password!=="undefined"?password:undefined,"realName" in locals_for_with?locals_for_with.realName:typeof realName!=="undefined"?realName:undefined,"roles" in locals_for_with?locals_for_with.roles:typeof roles!=="undefined"?roles:undefined,"status" in locals_for_with?locals_for_with.status:typeof status!=="undefined"?status:undefined,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined,"userId" in locals_for_with?locals_for_with.userId:typeof userId!=="undefined"?userId:undefined,"username" in locals_for_with?locals_for_with.username:typeof username!=="undefined"?username:undefined));;return buf.join("");
};
})();