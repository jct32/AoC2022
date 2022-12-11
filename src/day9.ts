import * as fs from 'fs';
import * as path from 'path'

class Coordinates {
    public x: number;
    public y: number;
    public visitedCoords: Set<String>;
    constructor(x:number, y:number) {
        this.x = x;
        this.y = y;
        this.visitedCoords = new Set();
    }

    moveRight() {
        this.x++;
    }

    moveLeft() {
        this.x--;
    }

    moveUp() {
        this.y++;
    }

    moveDown() {
        this.y--;
    }

    checkNotTouching(head: Coordinates) {
        if((Math.abs(head.x - this.x) > 1)|| (Math.abs(head.y - this.y) > 1)) {
            return true;
        }
        else {
            return false;
        }
    }

    catchHead(head: Coordinates) {
        let xDiff = head.x - this.x;
        let yDiff = head.y - this.y;
        if ((xDiff > 1) && (yDiff == 0)) {
            this.x++;
        }
        else if ((xDiff >= 1) && (yDiff >= 1)) {
            this.x++;
            this.y++;
        }
        else if ((xDiff == 0) && (yDiff > 1)) {
            this.y++;
        }
        else if ((xDiff <= -1) && (yDiff >= 1)) {
            this.x--;
            this.y++;
        }
        else if ((xDiff < -1) && (yDiff == 0)) {
            this.x--;
        }
        else if ((xDiff <= -1) && (yDiff <= -1)) {
            this.x--;
            this.y--;
        }
        else if ((xDiff == 0) && (yDiff < -1)) {
            this.y--;
        }
        else if ((xDiff >= 1) && (yDiff <= -1)) {
            this.x++;
            this.y--;
        }
        this.visitedCoords.add(`${this.x},${this.y}`);
    }
}

let filePath = path.join(__dirname, "../input", "day9");

const inputFile = fs.readFileSync(filePath, 'utf-8');

let movements = inputFile.split('\n');

let headPosition = new Coordinates(0,0);
let tailPosition = new Coordinates(0,0);
tailPosition.visitedCoords.add(`${tailPosition.x},${tailPosition.y}`);
let rope = [];
for(let i = 0; i < 10; i++){
    rope.push(new Coordinates(0,0));
}
rope[rope.length - 1].visitedCoords.add(`${rope[rope.length - 1].x},${rope[rope.length - 1].y}`)
for(let i = 0; i < movements.length; i ++) {
    let parsedinput = movements[i].trim().split(' ');
    let direction = parsedinput[0];
    let value = Number(parsedinput[1]);
    for(let j = 0; j < value; j++) {
        switch(direction){
            case 'R':
                headPosition.moveRight();
                rope[0].moveRight();
                break;
            case 'L':
                headPosition.moveLeft();
                rope[0].moveLeft();
                break;
            case 'D':
                headPosition.moveDown();
                rope[0].moveDown();
                break;
            case 'U':
                headPosition.moveUp();
                rope[0].moveUp();
                break;
        }

        if(tailPosition.checkNotTouching(headPosition)) {
            tailPosition.catchHead(headPosition);
        }

        for(let k = 1; k < rope.length; k++) {
            if(rope[k].checkNotTouching(rope[k-1])) {
                rope[k].catchHead(rope[k-1]);
            }
        }
        
    }
}

console.log(`Unique Positions: ${tailPosition.visitedCoords.size}`);
console.log(`Unique Positions Long Rope: ${rope[rope.length-1].visitedCoords.size}`)