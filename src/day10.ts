import * as fs from 'fs';
import * as path from 'path';

let filePath = path.join(__dirname, "../input", "day10");

const inputFile = fs.readFileSync(filePath, 'utf-8');

let instructions = inputFile.split('\r\n');

let cycle = 1;
let register = 1;

let targetCycle = 20;

let signalStrengthSum = 0;

let display = ``;

for(let i = 0; i < instructions.length; i++) {
    let column = (cycle%40) - 1;
    if(column < 0) {
        column = 39;
    }
    if((column >= (register - 1)) && (column <= (register + 1))) {
        display += '#';
    }
    else {
        display += '.';
    }
    if(instructions[i].includes('noop')) {
        cycle += 1;
    }
    else{
        let valueAdded = Number(instructions[i].split(' ')[1]);
        cycle += 1;
        if (targetCycle == cycle) {
            signalStrengthSum += register*targetCycle;
            targetCycle += 40;
        }
        column = (cycle%40) - 1;
        if(column < 0) {
        column = 39;
        }
        if((column >= (register - 1)) && (column <= (register + 1))) {
            display += '#';
        }
        else {
            display += '.';
        }
        register += valueAdded;
        cycle += 1;
    }
    if (targetCycle == cycle) {
        signalStrengthSum += register*targetCycle;
        targetCycle += 40;
    } 
}

console.log(`Cycle: ${cycle}`);

console.log(`Signal Strength Sum: ${signalStrengthSum}`);

console.log(`Letters:`);
for(let i = 0; i < display.length; i+=40) {
    console.log(`${display.substring(i, i+40)}`)
}