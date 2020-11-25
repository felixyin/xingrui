jade.templates = jade.templates || {};
jade.templates['selectUser'] = (function(){
  return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (roleAndUsers, undefined) {
buf.push("<div class=\"control-group\"><div class=\"my-accordion accordion-style2\">");
// iterate roleAndUsers
;(function(){
  var $$obj = roleAndUsers;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var ru = $$obj[$index];

buf.push("<div class=\"group\">");
// iterate ru
;(function(){
  var $$obj = ru;
  if ('number' == typeof $$obj.length) {

    for (var roleName = 0, $$l = $$obj.length; roleName < $$l; roleName++) {
      var users = $$obj[roleName];

buf.push("<h3 class=\"accordion-header\">" + (jade.escape(null == (jade_interp = roleName) ? "" : jade_interp)) + "</h3><div><!--label.control-label.bolder.blue Radio-->");
// iterate users
;(function(){
  var $$obj = users;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var u = $$obj[$index];

buf.push("<div class=\"radio\"><label><input name=\"form-field-radio\" type=\"radio\"" + (jade.attr("value", '' + (u.realName) + '', true, false)) + " class=\"ace my-select-user-radio\"/><span class=\"lbl\">" + (jade.escape((jade_interp = u.realName) == null ? '' : jade_interp)) + "         (角色:" + (jade.escape((jade_interp = u.role) == null ? '' : jade_interp)) + ")</span></label></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var u = $$obj[$index];

buf.push("<div class=\"radio\"><label><input name=\"form-field-radio\" type=\"radio\"" + (jade.attr("value", '' + (u.realName) + '', true, false)) + " class=\"ace my-select-user-radio\"/><span class=\"lbl\">" + (jade.escape((jade_interp = u.realName) == null ? '' : jade_interp)) + "         (角色:" + (jade.escape((jade_interp = u.role) == null ? '' : jade_interp)) + ")</span></label></div>");
    }

  }
}).call(this);

buf.push("</div>");
    }

  } else {
    var $$l = 0;
    for (var roleName in $$obj) {
      $$l++;      var users = $$obj[roleName];

buf.push("<h3 class=\"accordion-header\">" + (jade.escape(null == (jade_interp = roleName) ? "" : jade_interp)) + "</h3><div><!--label.control-label.bolder.blue Radio-->");
// iterate users
;(function(){
  var $$obj = users;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var u = $$obj[$index];

buf.push("<div class=\"radio\"><label><input name=\"form-field-radio\" type=\"radio\"" + (jade.attr("value", '' + (u.realName) + '', true, false)) + " class=\"ace my-select-user-radio\"/><span class=\"lbl\">" + (jade.escape((jade_interp = u.realName) == null ? '' : jade_interp)) + "         (角色:" + (jade.escape((jade_interp = u.role) == null ? '' : jade_interp)) + ")</span></label></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var u = $$obj[$index];

buf.push("<div class=\"radio\"><label><input name=\"form-field-radio\" type=\"radio\"" + (jade.attr("value", '' + (u.realName) + '', true, false)) + " class=\"ace my-select-user-radio\"/><span class=\"lbl\">" + (jade.escape((jade_interp = u.realName) == null ? '' : jade_interp)) + "         (角色:" + (jade.escape((jade_interp = u.role) == null ? '' : jade_interp)) + ")</span></label></div>");
    }

  }
}).call(this);

buf.push("</div>");
    }

  }
}).call(this);

buf.push("</div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var ru = $$obj[$index];

buf.push("<div class=\"group\">");
// iterate ru
;(function(){
  var $$obj = ru;
  if ('number' == typeof $$obj.length) {

    for (var roleName = 0, $$l = $$obj.length; roleName < $$l; roleName++) {
      var users = $$obj[roleName];

buf.push("<h3 class=\"accordion-header\">" + (jade.escape(null == (jade_interp = roleName) ? "" : jade_interp)) + "</h3><div><!--label.control-label.bolder.blue Radio-->");
// iterate users
;(function(){
  var $$obj = users;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var u = $$obj[$index];

buf.push("<div class=\"radio\"><label><input name=\"form-field-radio\" type=\"radio\"" + (jade.attr("value", '' + (u.realName) + '', true, false)) + " class=\"ace my-select-user-radio\"/><span class=\"lbl\">" + (jade.escape((jade_interp = u.realName) == null ? '' : jade_interp)) + "         (角色:" + (jade.escape((jade_interp = u.role) == null ? '' : jade_interp)) + ")</span></label></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var u = $$obj[$index];

buf.push("<div class=\"radio\"><label><input name=\"form-field-radio\" type=\"radio\"" + (jade.attr("value", '' + (u.realName) + '', true, false)) + " class=\"ace my-select-user-radio\"/><span class=\"lbl\">" + (jade.escape((jade_interp = u.realName) == null ? '' : jade_interp)) + "         (角色:" + (jade.escape((jade_interp = u.role) == null ? '' : jade_interp)) + ")</span></label></div>");
    }

  }
}).call(this);

buf.push("</div>");
    }

  } else {
    var $$l = 0;
    for (var roleName in $$obj) {
      $$l++;      var users = $$obj[roleName];

buf.push("<h3 class=\"accordion-header\">" + (jade.escape(null == (jade_interp = roleName) ? "" : jade_interp)) + "</h3><div><!--label.control-label.bolder.blue Radio-->");
// iterate users
;(function(){
  var $$obj = users;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var u = $$obj[$index];

buf.push("<div class=\"radio\"><label><input name=\"form-field-radio\" type=\"radio\"" + (jade.attr("value", '' + (u.realName) + '', true, false)) + " class=\"ace my-select-user-radio\"/><span class=\"lbl\">" + (jade.escape((jade_interp = u.realName) == null ? '' : jade_interp)) + "         (角色:" + (jade.escape((jade_interp = u.role) == null ? '' : jade_interp)) + ")</span></label></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var u = $$obj[$index];

buf.push("<div class=\"radio\"><label><input name=\"form-field-radio\" type=\"radio\"" + (jade.attr("value", '' + (u.realName) + '', true, false)) + " class=\"ace my-select-user-radio\"/><span class=\"lbl\">" + (jade.escape((jade_interp = u.realName) == null ? '' : jade_interp)) + "         (角色:" + (jade.escape((jade_interp = u.role) == null ? '' : jade_interp)) + ")</span></label></div>");
    }

  }
}).call(this);

buf.push("</div>");
    }

  }
}).call(this);

buf.push("</div>");
    }

  }
}).call(this);

buf.push("</div></div>");}.call(this,"roleAndUsers" in locals_for_with?locals_for_with.roleAndUsers:typeof roleAndUsers!=="undefined"?roleAndUsers:undefined,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined));;return buf.join("");
};
})();