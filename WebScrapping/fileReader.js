let fs = require('fs')
const cheerio = require('cheerio')

// let f1KaData = fs.readFileSync("./f1.txt","utf-8")

// console.log(f1KaData)

let indexHtmlData =  fs.readFileSync("./index.html")
// console.log(indexHtmlData + "");


let ch = cheerio.load(indexHtmlData);
// let h1Body = ch('h1'); // return object of h1 tag
// let h1Body = ch('h1').text();
// console.log(h1Body); 


// what if 2 p tag is there
// let pData = ch('p')
// console.log(pData);   // gives object of 2 p tags in an array
  // [<p></p>,<p></p>]


// what if i want only 1 p tag (use class or id)
// let pData =  ch('.pa').text();
// console.log(pData);
 // 1st p tag + in ul ptag

//  let pData = ch('.pa.outer').text();
//  console.log(pData);

// let pData = ch('ul .pa').text();
// console.log(pData);

let hData = ch('#abc').text();
console.log(hData);






















