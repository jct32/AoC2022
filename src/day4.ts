import * as fs from 'fs';
import * as path from 'path';

function overlapResult(elfSectionRanges: string[], overlaps: number) {
    let elf1 = parseRanges(elfSectionRanges[0]);
    let elf2 = parseRanges(elfSectionRanges[1]);
    if( checkRanges(elf1, elf2) || checkRanges (elf2, elf1)) {
        overlaps += 1;
    }
    return overlaps;
}

function parseRanges(rangeInput: string) {
    let splitRanges = rangeInput.split('-');
    return [Number(splitRanges[0]), Number(splitRanges[1])]
}

function checkRanges(firstRange: number[], secondRange: number[]) {
    if(firstRange[0] <= secondRange[0] && firstRange[1] >= secondRange[0]
        || firstRange[0] <= secondRange[1] && firstRange[1] >= secondRange[1]) {
        return true;
    }
    else {
        return false;
    }
}

let filePath = path.join(__dirname, "../input", "day4");

const inputFile = fs.readFileSync(filePath, 'utf-8');

let overlaps = 0;

inputFile.split(/\r?\n/).forEach(line => {
    overlaps = overlapResult(line.split(','), overlaps);
});

console.log(`Total overlaps is: ${overlaps}`);