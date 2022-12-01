import { FILE } from 'dns';
import * as fs from 'fs';
import * as path from 'path';

let filePath = path.join(__dirname, "../input", "day1");

const inputFile = fs.readFileSync(filePath, 'utf-8');

let first : number = 0;
let second: number = 0;
let third : number = 0;
let sum : number = 0;

inputFile.split(/\r?\n/).forEach(line => {
    if(line ==  "") {
        if(sum > first) {
            third = second;
            second = first;
            first = sum;
        }
        else if(sum > second) {
            third = second;
            second = sum;
        }
        else if(sum > third) {
            third = sum;
        }
        sum = 0;
    }
    else {
        sum += Number(line);
    }
});

console.log(`Maximum calories is: ${first}`);
console.log(`Total calories is: ${first+second+third}`);