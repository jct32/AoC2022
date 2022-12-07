import { FILE } from 'dns';
import * as fs from 'fs';
import * as path from 'path';

let filePath = path.join(__dirname, "../input", "day2");

const inputFile = fs.readFileSync(filePath, 'utf-8');

let total = 0;

let userChoice = ['X', 'Y', 'Z'];
let opponentChoice = ['A', 'B', 'C'];

inputFile.split(/\r?\n/).forEach(line => {
    let choices = line.split(/ /);
    total += userChoice.indexOf(choices[1]) * 3;

    if((opponentChoice.indexOf(choices[0]) > 0) && (choices[1] == userChoice[0]))
    {
        total += opponentChoice.indexOf(choices[0]);
    }
    else if(userChoice[2] == choices[1] && opponentChoice[2] == choices[0])
    {
        total += opponentChoice.indexOf(choices[0]) - 1;
    }
    else if(choices[1] == userChoice[1])
    {
        total += opponentChoice.indexOf(choices[0]) + 1;
    }
    else if(choices[1] == userChoice[0] && choices[0] == opponentChoice[0])
    {
        total += opponentChoice.indexOf(choices[0]) + 3;
    }
    else
    {
        total += opponentChoice.indexOf(choices[0]) + 2;
    }
});

console.log(`Total is: ${total}`);