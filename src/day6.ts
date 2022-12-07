import * as fs from 'fs';
import * as path from 'path';

let filePath = path.join(__dirname, "../input", "day6");

const inputFile = fs.readFileSync(filePath, 'utf-8');

for(let i = 0; i < inputFile.length; i++){
    let duplicates = 0;
    let target = inputFile.substring(i, i+4);
    for(let j = 0; j < target.length; j++) {
        let retest = new RegExp(target[j], 'g');
        let matches = target.match(retest);
        if(matches != null) {
            if(matches.length > 1) {
                duplicates += 1;
            }
        }
    }
    if(duplicates < 1) {
        console.log(`The index is at: ${i + 4}`);
        break
    }
}

for(let i = 0; i < inputFile.length; i++){
    let duplicates = 0;
    let target = inputFile.substring(i, i+14);
    for(let j = 0; j < target.length; j++) {
        let retest = new RegExp(target[j], 'g');
        let matches = target.match(retest);
        if(matches != null) {
            if(matches.length > 1) {
                duplicates += 1;
            }
        }
    }
    if(duplicates < 1) {
        console.log(`The index for part 2 is at: ${i + 14}`);
        break
    }
}