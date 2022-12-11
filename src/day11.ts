import * as fs from 'fs';
import * as path from 'path';

class Monkey {
    private items: number [];
    private test: number;
    private ifTrueMonkey: number;
    private ifFalseMonkey: number;
    private equationString: string;
    private inspectCount: number;
    private lcm: number;
    constructor() {
        this.items = [];
        this.test = -1;
        this.ifTrueMonkey = -1;
        this.ifFalseMonkey = -1;
        this.equationString = '';
        this.inspectCount = 0;
        this.lcm = 0;
    }

    addItems(item: number) {
        this.items.push(item);
    }

    addTest(test: number) {
        this.test = test;
    }

    addIfTrueMonkey(monkey: number) {
        this.ifTrueMonkey = monkey;
    }

    addIfFalseMonkey(monkey: number) {
        this.ifFalseMonkey = monkey;
    }

    addEquationString(equation: string) {
        this.equationString = equation;
    }

    addlcm(value: number) {
        this.lcm = value;
    }

    getTrueMonkey() {
        return this.ifTrueMonkey;
    }

    getFalseMonkey() {
        return this.ifFalseMonkey;
    }

    getItemsTouched() {
        return this.inspectCount;
    }

    getTest() {
        return this.test;
    }

    inspect() {
        for(let i = 0; i < this.items.length; i++) {
            this.items[i] = this.increaseWorryLevel(this.items[i]);
            this.items[i] = Math.floor(this.items[i] / 3);
            this.inspectCount++;
        }
    }

    part2Inspect() {
        for(let i = 0; i < this.items.length; i++) {
            this.items[i] = this.increaseWorryLevel(this.items[i]);
            this.items[i] %= this.lcm;
            this.inspectCount++;
        }
    }

    increaseWorryLevel(item: number) {
        let leftoperand = 0;
        let rightoperand = 0;
        let character = this.equationString.match(/[+\*\/-]/);
        let operand = '';
        if(character != null) {
            operand = character[0];
        }
        let operands = this.equationString.split(operand);
        if(operands[0].includes('old')) {
            leftoperand = item;
        }
        else {
            leftoperand = Number(operands[0])
        }
        if(operands[1].includes('old')) {
            rightoperand = item;
        }
        else {
            rightoperand = Number(operands[1])
        }
        if(character != null) {
            let operand = character[0];
            switch(operand) {
                case '*':
                    item = leftoperand * rightoperand;
                    break;
                case '/': 
                    item = leftoperand / rightoperand;
                    break;
                case '+':
                    item = leftoperand + rightoperand;
                    break;
                case '-':
                    item = leftoperand - rightoperand;
                    break;
            }
        }
        return item
    }

    itemsIfTrue() {
        return this.items.filter(item => (item % this.test) == 0);
    }

    itemsIfFalse() {
        let itemsToReturn =  this.items.filter(item => (item % this.test) != 0);
        this.items = [];
        return itemsToReturn;
    }
}

function compareNumbers(a: number,b: number) {
    return b-a;
}

let filePath = path.join(__dirname, "../input", "day11");

const inputFile = fs.readFileSync(filePath, 'utf-8');

let monkeyInput = inputFile.split('\r\n');

let monkeyList = [];
let part2MonkeyList = [];

for(let i = 0; i < monkeyInput.length; i += 7) {
    let monkey = new Monkey();
    let part2Monkey = new Monkey();
    
    // Get items
    let items = monkeyInput[i+1].split(':')[1].split(',');
    items.forEach(item => {
        monkey.addItems(Number(item.trim()))
        part2Monkey.addItems(Number(item.trim()))
    })

    // Get equation string
    let equationString = monkeyInput[i+2].split(':')[1].split(' = ')[1];
    monkey.addEquationString(equationString);
    part2Monkey.addEquationString(equationString);

    // Get test divisible value
    let value = monkeyInput[i+3].match(/\d+/);
    monkey.addTest(Number(value));
    part2Monkey.addTest(Number(value));

    // Get if true monkey
    let monkeyToRecieve = monkeyInput[i+4].match(/\d+/);
    monkey.addIfTrueMonkey(Number(monkeyToRecieve));
    part2Monkey.addIfTrueMonkey(Number(monkeyToRecieve));

    // Get if false monkey
    monkeyToRecieve = monkeyInput[i+5].match(/\d+/);
    monkey.addIfFalseMonkey(Number(monkeyToRecieve));
    part2Monkey.addIfFalseMonkey(Number(monkeyToRecieve));

    monkeyList.push(monkey);
    part2MonkeyList.push(part2Monkey);
}

let count = 0;
while(count < 20) {
    for(let i = 0; i < monkeyList.length; i++) {
        monkeyList[i].inspect();
        let trueValues = monkeyList[i].itemsIfTrue();
        let falseValues = monkeyList[i].itemsIfFalse();
        let trueMonkey = monkeyList[i].getTrueMonkey();
        let falseMonkey = monkeyList[i].getFalseMonkey();
        for(let i = 0; i < trueValues.length; i++) {
            monkeyList[trueMonkey].addItems(trueValues[i]);
        }
        for(let i = 0; i < falseValues.length; i++) {
            monkeyList[falseMonkey].addItems(falseValues[i]);
        }
    }
    count++;
}


let itemsTouchedCount = [];
for(let i = 0; i < monkeyList.length; i++) {
    itemsTouchedCount.push(monkeyList[i].getItemsTouched());
}

itemsTouchedCount = itemsTouchedCount.sort(compareNumbers);
console.log(`Part 1 Answer: ${itemsTouchedCount[0] * itemsTouchedCount[1]}`);

let lcm = 1;
for(let i = 0; i < part2MonkeyList.length; i++) {
    lcm *= part2MonkeyList[i].getTest();
}

for(let i = 0; i < part2MonkeyList.length; i++) {
    part2MonkeyList[i].addlcm(lcm);
}

count = 0;
while(count < 10000) {
    for(let i = 0; i < part2MonkeyList.length; i++) {
        part2MonkeyList[i].part2Inspect();
        let trueValues = part2MonkeyList[i].itemsIfTrue();
        let falseValues = part2MonkeyList[i].itemsIfFalse();
        let trueMonkey = part2MonkeyList[i].getTrueMonkey();
        let falseMonkey = part2MonkeyList[i].getFalseMonkey();
        for(let i = 0; i < trueValues.length; i++) {
            part2MonkeyList[trueMonkey].addItems(trueValues[i]);
        }
        for(let i = 0; i < falseValues.length; i++) {
            part2MonkeyList[falseMonkey].addItems(falseValues[i]);
        }
    }
    count++;
}

let part2ItemsTouchedCount = [];
for(let i = 0; i < part2MonkeyList.length; i++) {
    part2ItemsTouchedCount.push(part2MonkeyList[i].getItemsTouched());
}

part2ItemsTouchedCount = part2ItemsTouchedCount.sort(compareNumbers);
console.log(`Part 2 Answer: ${part2ItemsTouchedCount[0] * part2ItemsTouchedCount[1]}`);
