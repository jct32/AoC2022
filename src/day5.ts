import * as fs from 'fs';
import * as path from 'path';

let filePath = path.join(__dirname, "../input", "day5");

const inputFile = fs.readFileSync(filePath, 'utf-8');

let overlaps = 0;

let lines = inputFile.split(/\r?\n/);

let inputStack = new Array();

let i = 0;

// Get all the initial stack info
while(lines[i] != '') {
    inputStack.push(lines[i]);
    i++;
}

// Find out how many stacks there are
let numberOfStacks = (inputStack[inputStack.length - 1].length + 1) / 4;

// Create the main data structure
let lineStacks = new Array(numberOfStacks);
let part2Stack = new Array(numberOfStacks);
for(let d = 0; d < numberOfStacks; d++) {
    lineStacks[d] = new Array();
    part2Stack[d] = new Array();
}

// Place the data where it should be.
for(let b = inputStack.length - 2; b >= 0; b--) {
    for(let c = 0; c < inputStack[b].length; c += 4) {
        let value = inputStack[b].substring(c, c+3);
        if(/[A-Z]/.test(value)) {
            lineStacks[c/4].push(value[1]);
            part2Stack[c/4].push(value[1]);
        }
    }
}

for(i; i < lines.length; i++)
{
    let part2tempStack = new Array();
    let numberToMove = 0;
    let subjectStack = 0;
    let targetStack = 0;
    let values = lines[i].match(/\d+/g);
    if (values != null) {
        numberToMove = Number(values[0]);
        subjectStack = Number(values[1]);
        targetStack = Number(values[2]);
        for(let j = 0; j < numberToMove; j++) {
            if(lineStacks[subjectStack - 1].length > 0) {
                let value = lineStacks[subjectStack - 1].pop();
                lineStacks[targetStack - 1].push(value);

                part2tempStack.push(part2Stack[subjectStack - 1].pop());
            }        
        }
        for(let j = 0; j < numberToMove; j++) {
            part2Stack[targetStack - 1].push(part2tempStack.pop());
        }
    } 
    
}

let outputstring = '';
let outputStringPart2 = '';
for(let i = 0; i < lineStacks.length; i++) {
    outputstring += lineStacks[i][lineStacks[i].length - 1];
    outputStringPart2 += part2Stack[i][part2Stack[i].length - 1];
}
console.log(`Top of each stack (part 1): ${outputstring}`);
console.log(`Top of each stack (part 2): ${outputStringPart2}`);