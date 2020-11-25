/**
 * Created by fy on 2016/12/30.
 */

let userService = require('../service/user/index');


userService.getUserByRole('管理员', (err,result)=> {
	console.log(err, result);

	console.log(JSON.stringify(result));
});


userService.getRoles(1, (err, result) => {
	console.log(err, result);
});
