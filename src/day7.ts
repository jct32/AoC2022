import * as fs from 'fs';
import * as path from 'path';

class TreeNode {
    public parent: any;
    public name: string;
    public children: any[];
    constructor(name: string) {
        this.name = name;
        this.parent = null;
        this.children = [];
    }
}

class TreeLeaf {
    public value: number;
    public parent: any;
    public name: string;
    constructor(value: number, parent: any, name: string) {
        this.value = value;
        this.parent = parent;
        this.name = name;
    }
}

function sumTree(node: TreeNode) {
    let sum = 0;
    for(let i = 0; i < node.children.length; i++) {
        if(node.children[i] instanceof TreeNode) {
            sum += sumTree(node.children[i]);
        }
        else {
            sum += node.children[i].value;
        }
    }
    return sum
}

function parseTree(node: TreeNode) {
    let sum = 0;
    let total = sumTree(node);
    if(total < 100000) {
        sum += total
    }
    for(let i = 0; i < node.children.length; i++)
    {
        if(node.children[i] instanceof TreeNode) {
            sum += parseTree(node.children[i]);
        }
    }
    return sum
}

function parseTreePart2(node: TreeNode) {
    let sum: number[] = [];
    let total = sumTree(node);
    sum.push(total);
    for(let i = 0; i < node.children.length; i++)
    {
        if(node.children[i] instanceof TreeNode) {
            let folders: number[] = parseTreePart2(node.children[i]);
            for(let j = 0; j < folders.length; j++) {
                sum.push(folders[j]);
            }
        }
    }
    return sum
}

function compareNumbers(a: number,b: number) {
    return a-b;
}

let filePath = path.join(__dirname, "../input", "day7");

const inputFile = fs.readFileSync(filePath, 'utf-8');

let terminalLines = inputFile.split('\n');

let baseNode = new TreeNode('/');

let currentNode = baseNode;

// Parse input
for(let i = 1; i < terminalLines.length; i++){
    let line = terminalLines[i].trim();
    if(line.startsWith('$')) {
        let command = line.trim().split(' ');
        if(command[1] == 'ls') {
            while(i < (terminalLines.length - 1)) {
                i++;
                if(!terminalLines[i].trim().startsWith('$')) {
                    let target = terminalLines[i].trim().split(' ');
                    if(target[0].includes('dir')) {
                        let node = new TreeNode(target[1]);
                        node.parent = currentNode;
                        currentNode.children.push(node);
                    }
                    else {
                        let leaf = new TreeLeaf(Number(target[0]), currentNode, target[1]);
                        currentNode.children.push(leaf);
                    }
                }
                else {
                    i--;
                    break;
                }
            }
        }
        else if(command[2].includes('..')) {
            currentNode = currentNode.parent;
        }
        else {
            for(let j = 0; j < currentNode.children.length; j++) {
                if(command[2] == currentNode.children[j].name) {
                    currentNode = currentNode.children[j];
                    break;
                }
            }
        }
    }
}

let filesToDelete = 0;
let node = baseNode;
// Part 1
filesToDelete = parseTree(node);
console.log(`Total Size to Delete: ${filesToDelete}`);

// Part 2
let maxSize = 70000000;
let requiredFreeSize = 30000000;
let spaceToDelete = requiredFreeSize - (maxSize  - sumTree(baseNode))
let folders = parseTreePart2(baseNode);
let sortedFolders = folders.sort(compareNumbers);
let deletedFolderSize = 0;
for(let i = 0; i < sortedFolders.length; i++) {
    if(sortedFolders[i] > spaceToDelete) {
        deletedFolderSize = sortedFolders[i];
        break;
    }
}
console.log(`Deleted Folder Size: ${deletedFolderSize}`);