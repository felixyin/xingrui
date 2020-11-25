jade.templates = jade.templates || {};
jade.templates['dnaWarehouse'] = (function(){
  return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (action, ids, warehouse_place, warehouser) {
buf.push("<iframe id=\"edit-iframe\" name=\"edit-iframe\" class=\"hide\"></iframe><form id=\"edit-form\" role=\"form\"" + (jade.attr("action", '' + (action) + '', true, false)) + " method=\"post\" target=\"edit-iframe\" style=\"height:400x;overflow-x:hidden;overflow-y:scroll;\" class=\"form-horizontal\"><div class=\"form-group hide\"><label for=\"ff-0\" class=\"col-xs-3 control-label no-padding-right\"></label><div class=\"col-xs-9\"><input id=\"ff-0\" type=\"text\" name=\"ids\"" + (jade.attr("value", '' + (ids || "") + '', true, false)) + " placeholder=\"\" class=\"col-xs-6\"/><span class=\"help-inline col-xs-6\"><span class=\"middle hide\">Inline help text</span></span></div></div><div class=\"space-4\"></div><div class=\"form-group\"><label for=\"ff-20\" class=\"col-xs-3 control-label no-padding-right\">入库位置</label><div class=\"col-xs-9\"><select id=\"ff-20\" name=\"warehouse_place\"" + (jade.attr("value", '' + (warehouse_place || "") + '', true, false)) + " placeholder=\"\" class=\"col-xs-6\"><option value=\"未知\">未知</option>");
var  n = 1;
while (n < 1000)
{
var value = '冻存盒' + n++;
if ( value == warehouse_place)
{
buf.push("<option" + (jade.attr("value", '' + (value) + '', true, false)) + " selected=\"selected\">" + (jade.escape(null == (jade_interp = value) ? "" : jade_interp)) + "</option>");
}
else
{
buf.push("<option" + (jade.attr("value", '' + (value) + '', true, false)) + ">" + (jade.escape(null == (jade_interp = value) ? "" : jade_interp)) + "</option>");
}
}
buf.push("</select><span class=\"help-inline col-xs-6\"><span class=\"middle hide\">Inline help text</span></span></div></div><div class=\"space-4\"></div><div class=\"form-group\"><label for=\"ff-19\" class=\"col-xs-3 control-label no-padding-right\">入库人</label><div class=\"col-xs-9\"><input id=\"ff-19\" type=\"text\" name=\"warehouser\"" + (jade.attr("value", '' + (warehouser || "") + '', true, false)) + " readonly=\"readonly\" placeholder=\"\" class=\"col-xs-6 ipt-person\"/><span class=\"help-inline col-xs-6\"><span class=\"middle hide\">Inline help text</span></span></div></div><div class=\"space-4\"></div><script></script></form>");}.call(this,"action" in locals_for_with?locals_for_with.action:typeof action!=="undefined"?action:undefined,"ids" in locals_for_with?locals_for_with.ids:typeof ids!=="undefined"?ids:undefined,"warehouse_place" in locals_for_with?locals_for_with.warehouse_place:typeof warehouse_place!=="undefined"?warehouse_place:undefined,"warehouser" in locals_for_with?locals_for_with.warehouser:typeof warehouser!=="undefined"?warehouser:undefined));;return buf.join("");
};
})();