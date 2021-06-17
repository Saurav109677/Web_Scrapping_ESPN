const request = require('request')
const fs = require('fs')
const cheerio = require('cheerio');
const getAllScoreCard = require('./match');

function getAllMatches(Link){
    request(Link,cb);
}

function cb(error, response , html){
    if(response.statusCode == 200 && error == null)
        parseData(html);
    else if(response.statusCode == 404)
        parseData("Page Not Found");
    else    
        console.log(error);
}

function parseData(html){
    let ch = cheerio.load(html);
    let aTagHrefArray = ch('a[data-hover="Scorecard"]')
    for(i=0;i<aTagHrefArray.length;i++){
        let completeNextLink = "https://www.espncricinfo.com"+ch(aTagHrefArray[i]).attr('href');
        getAllScoreCard(completeNextLink)
    }
}

module.exports = getAllMatches;
// module.exports.allMatches = getAllMatches;
// module.exports = { allMathces:getAllMatches}