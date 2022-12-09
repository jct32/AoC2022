import * as fs from 'fs';
import * as path from 'path';

function checkTreesToBorder(tree: number[], rows: string[]) {
    let row = tree[0];
    let column = tree[1];
    let targetTree = Number(rows[row].trim()[column]);
    let isTaller = true;
    // Check left
    let index = column - 1;
    while(index >= 0) {
        if(targetTree <= Number(rows[row].trim()[index])) {
            isTaller = false;
            break
        }
        index--;
    }
    if (isTaller) {
        return true;
    }
    // Check right
    index = column + 1;
    isTaller = true;
    while(index < rows[row].trim().length) {
        if(targetTree <= Number(rows[row].trim()[index])) {
            isTaller = false;
            break
        }
        index++;
    }
    if (isTaller) {
        return true;
    }
    // Check top
    index = row - 1;
    isTaller = true;
    while(index >= 0) {
        if(targetTree <= Number(rows[index].trim()[column])) {
            isTaller = false;
            break
        }
        index--;
    }
    if (isTaller) {
        return true;
    }
    // Check Bottom
    index = row + 1;
    isTaller = true;
    while(index < rows.length) {
        if(targetTree <= Number(rows[index].trim()[column])) {
            isTaller = false;
            break
        }
        index++;
    }
    if(isTaller) {
        return true;
    }
    else {
        return false;
    }
}

function calculateViewScore(tree: number[], rows: string[]) {
    let row = tree[0];
    let column = tree[1];
    let targetTree = Number(rows[row].trim()[column]);
    let leftTrees = 0;
    let rightTrees = 0;
    let topTrees = 0;
    let bottomTrees = 0;
    // Check left
    let index = column - 1;
    while(index >= 0) {
        if(targetTree <= Number(rows[row].trim()[index])) {
            leftTrees++;
            break
        }
        leftTrees++;
        index--;
    }
    // Check right
    index = column + 1;
    while(index < rows[row].trim().length) {
        if(targetTree <= Number(rows[row].trim()[index])) {
            rightTrees++;
            break
        }
        rightTrees++;
        index++;
    }
    // Check top
    index = row - 1;
    while(index >= 0) {
        if(targetTree <= Number(rows[index].trim()[column])) {
            topTrees++;
            break
        }
        topTrees++;
        index--;
    }
    // Check Bottom
    index = row + 1;
    while(index < rows.length) {
        if(targetTree <= Number(rows[index].trim()[column])) {
            bottomTrees++;
            break
        }
        bottomTrees++;
        index++;
    }
    return (leftTrees * rightTrees * topTrees * bottomTrees)
}

let filePath = path.join(__dirname, "../input", "day8");

const inputFile = fs.readFileSync(filePath, 'utf-8');

let rows = inputFile.split('\n');

let tallTrees = 0;

// Part 1
for(let i = 0; i < rows.length; i++) {
    let row = rows[i].trim()
    if(i == 0 || i == row.length - 1) {
        tallTrees += row.length;
    }
    else {
        for(let j = 0; j < row.length; j++) {
            if (j == 0 || j == row.length - 1) {
                tallTrees += 1;
            }
            else {
                if(checkTreesToBorder([i, j], rows)) {
                    tallTrees += 1;
                }
            }
        }
    }
}

// Part 2
let maxScore = 0;
for(let i = 0; i < rows.length; i++) {
    for(let j = 0; j < rows[i].trim().length; j++) {
        let viewScore = calculateViewScore([i, j], rows);
        if(viewScore > maxScore) {
            maxScore = viewScore;
        }
    }
}
console.log(`Tall Trees Count: ${tallTrees}`);
console.log(`Max View Score: ${maxScore}`);