import { FILE } from 'dns';
import * as fs from 'fs';
import * as path from 'path';

let filePath = path.join(__dirname, "../input", "day3");

const inputFile = fs.readFileSync(filePath, 'utf-8');

let priority = 0;
let count = 0;
let firstString: string;
let secondString: string;
let thirdString: string;


inputFile.split(/\r?\n/).forEach(line => {
    if(count == 0)
    {
        firstString = line;
        count++;
    }
    else if(count == 1)
    {
        secondString = line;
        count++;
    }
    else
    {
        thirdString = line;
        for(let i = 0; i < firstString.length; i++)
        {
            if(secondString.includes(firstString[i]) && thirdString.includes(firstString[i]))
            {
                let charValue = firstString.charCodeAt(i);
                if(charValue >= 97 )
                {
                    priority += charValue - 96;
                }
                else
                {
                    priority += charValue - 38;
                }
                break;
            }
        }
        count = 0;
    }
});

console.log(`Total priority is: ${priority}`);