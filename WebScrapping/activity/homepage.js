const request = require('request')
const fs = require('fs')
const cheerio = require('cheerio')
const getAllMatches = require('./allMatches')

let link ="https://www.espncricinfo.com/series/icc-cricket-world-cup-2019-1144415"

request(link, cb)

function cb(error, response , html){
    if(response.statusCode == 200 && error == null)
        parseData(html);
    else if(response.statusCode == 404)
        parseData("Page Not Found");
    else    
        console.log(error);
}

function parseData(html){
    //fs.writeFileSync('./home.html',html);
    let ch = cheerio.load(html);
    let aTagHref = ch('.widget-items.cta-link a').attr('href');
    // completeNextLink = "https://www.espncricinfo.com/series/icc-cricket-world-cup-2019-1144415/match-results"
    let completeNextLink = "https://www.espncricinfo.com"+aTagHref;
    console.log(completeNextLink);
    //allMatches(completeNextLink)
    getAllMatches(completeNextLink);
}

