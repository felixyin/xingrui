/**
 * Created by fy on 2016/12/30.
 */

const db = require('../../config/db');
const util = require('../../lib/utils');


let str = '0、已删除；1、已录入；2、已更换采血管；3、已审批且入库；4、已出库；5、已提取；6、提取合格；7、提取废弃；8、重提取；9、提取已交接；10、已建库；11、建库合格；12、建库废弃；13、重建库；14、建库已交接；15、已上机；16、上机合格；17、上机废弃；18、重上机；19、上机已交接；20、已分析；21、报告已发送';


let statusArray = str.split('；');



for(let idx in statusArray){
	let status = statusArray[idx];
	let  sa = status.split('、');
	let value = sa[0];
	let label = sa[1];
	console.log(`${value}: '${label}',`);
}


for(let idx in statusArray){
	let status = statusArray[idx];
	let  sa = status.split('、');
	let value = sa[0];
	let label = sa[1];
	console.log(`option(value='${value}') ${label}`);
}

console.log('\n\n\n');

for(let idx in statusArray){
	let status = statusArray[idx];
	let  sa = status.split('、');
	let value = sa[0];
	let label = sa[1];
	console.log(`case ${value}:
    text = '${label}';
    break;`);
}