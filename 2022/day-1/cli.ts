import * as input from '../../utils/input';

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
    const data = input.loadInput('2022', 'day-1');
    console.log('1) Maximum value: ', getMaxCalories(data));
    console.log('2) Top three calories value: ', getTopThreeCalories(data));
})().catch(e => console.error(e));