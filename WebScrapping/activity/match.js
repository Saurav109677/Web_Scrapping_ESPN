const request = require('request')
const fs = require('fs')
const cheerio = require('cheerio')

// let link ="https://www.espncricinfo.com/series/icc-cricket-world-cup-2019-1144415/australia-vs-south-africa-45th-match-1144527/full-scorecard"

function getAllScoreCard(Link){
    request(Link, cb)
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
    let bothInnings = ch(".card.content-block.match-scorecard-table .Collapsible");
    // console.log(bothInnings);
    // fs.writeFileSync("./both.html",bothInnings);

    for(i=0;i<bothInnings.length;i++){
        let teamName = ch(bothInnings[i]).find('h5').text();
        teamName = teamName.split("INNINGS")[0].trim();
        // console.log(teamName);

        let allTrs =  ch(bothInnings[i]).find(".table.batsman tbody tr");
        // console.log(allTrs.length);
        for(j=0;j<allTrs.length-1;j++){
            let allTds = ch(allTrs[j]).find('td');
            if(allTds.length >1){
                let batsmanName = ch(allTds[0]).find('a').text().trim();
                let runs = ch(allTds[2]).text().trim();
                let bowl = ch(allTds[3]).text().trim();
                let four = ch(allTds[5]).text().trim();
                let sixes = ch(allTds[6]).text().trim();
                let strikeR = ch(allTds[7]).text().trim();
                // console.log(`Batsman: ${batsmanName} Runs : ${runs} Bows: ${bowl} Fours: ${four} Sixes: ${sixes} StrikeRate: ${strikeR}`);
                processDetails(teamName,batsmanName , runs, bowl,four, sixes,strikeR)
            }      
           
        }
         console.log("####################################################");
    }
}

function processDetails(teamName, batsmanName , runs, bowl,four, sixes,strikeR){
    let isTeamName = checkTeamName(teamName);
    if(isTeamName){
        let isBatsman = checkBatsmanFile(teamName, batsmanName);
        if(isBatsman){
            updateBatsmanFile(teamName, batsmanName , runs, bowl,four, sixes,strikeR);
        }
        else{
            createBatsmanFile(teamName, batsmanName , runs, bowl,four, sixes,strikeR);
        }
    }
    else{
        createTeamFolder(teamName);
        createBatsmanFile(teamName, batsmanName , runs, bowl,four, sixes,strikeR);

    }
}

function checkTeamName(teamName){
    return fs.existsSync(teamName);
}

function checkBatsmanFile(teamName, batsmanName){
    return fs.existsSync(`${teamName}/${batsmanName}.json`)
}

function updateBatsmanFile(teamName, batsmanName , runs, bowl,four, sixes,strikeR){
    let batsmanPath = `${teamName}/${batsmanName}.json`;
    let batsmanFile = fs.readFileSync(batsmanPath);
    batsmanFile = JSON.parse(batsmanFile);
    let innings = {
        Runs: runs,
        Bowls: bowl,
        Fours: four,
        Sixes: sixes,
        StrikeRate: strikeR
    }
    batsmanFile.push(innings);
    
    batsmanFile = JSON.stringify(batsmanFile);
    fs.writeFileSync(batsmanPath,batsmanFile);
}

function createBatsmanFile(teamName, batsmanName , runs, bowl,four, sixes,strikeR){
    let batsmanPath = `${teamName}/${batsmanName}.json`;
    let batsmanFile = [];
    // /batsmanFile = JSON.stringify(batsmanFile);
    let innings = {
        Runs: runs,
        Bowls: bowl,
        Fours: four,
        Sixes: sixes,
        StrikeRate: strikeR
    }
    batsmanFile.push(innings);
    batsmanFile = JSON.stringify(batsmanFile);
    fs.writeFileSync(batsmanPath,batsmanFile);
}

function createTeamFolder(teamName){
    fs.mkdirSync(teamName);
}

module.exports = getAllScoreCard