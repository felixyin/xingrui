#!/usr/bin/env node

/**
 * Created by fy on 2017/2/8.
 */

'use strict';
const fs = require('fs');

debugger;

console.log('hello world!');

let stream = fs.createReadStream('workout.js');

stream.setEncoding('utf8');

stream.on('data', (chunk) => {
    console.log(chunk);
});

// stream.pipe(process.stdout);

// stream.on('readable', () => {
//     let chunk;
//     while (null != (chunk = stream.read(900))) {
//         console.log(chunk);
//     }
// });
//
// stream.on('error', (e) => {
//     console.error('---->');
//     console.error(e);
// });
//
// stream.on('end', () => {
//     console.log('end');
// });


// console.log('---------------------------');
//
//  fs.readFileSync('workout.js', 'utf8',(error,data)=>{
//      console.log(data);
//  });



// console.log('---------------------------');
//
let writeStream = fs.createWriteStream('copy.txt');
stream.pipe(writeStream);
