#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function calculate(elfCalories: string): number {
    const food = elfCalories.split('\n');
    return food.reduce((sum, current) => {
        return sum + Number(current);
    }, 0);
}

function getMaxCalories(allCalories: string): number {
    const elves = allCalories.split('\n\n');

    const calculated = elves.map(c => calculate(c));
    return Math.max(...calculated);
}

function getTopThreeCalories(allCalories: string): number {
    const elves = allCalories.split('\n\n');

    const calculated = elves.map(c => calculate(c));
    const sorted = calculated.sort((x, y) => y - x);
    return sorted[0] + sorted[1] + sorted[2];
}

(async function run() {
    const absolutePath = path.resolve("./2022/day-1/input.txt");
    console.log(absolutePath);

    fs.readFile(absolutePath, 'utf-8', (err: any, data: string) => {
        if (err) {
            console.log('ERROR:', err);
        }

        console.log('Maximum value: ', getMaxCalories(data));
        console.log('Top three calories value: ', getTopThreeCalories(data));
    });
})().catch(e => console.error(e));