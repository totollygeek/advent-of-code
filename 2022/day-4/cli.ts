import * as input from '../../utils/input';

function parseInput(input: string): { pair1: { from: number, to: number }, pair2: { from: number, to: number } }[] {
    const rows = input.split('\n');
    return rows.map(r => {
        const pairs = r.split(',');

        if (pairs.length != 2)
            throw new Error('There must be exactly two pairs per row!');

        return {
            pair1: {
                from: Number(pairs[0].split('-')[0]),
                to: Number(pairs[0].split('-')[1]),
            },
            pair2: {
                from: Number(pairs[1].split('-')[0]),
                to: Number(pairs[1].split('-')[1]),
            },
        }
    });
}

function areRangesContained(pairs: { pair1: { from: number, to: number }, pair2: { from: number, to: number } }): boolean {
    if (pairs.pair1.from <= pairs.pair2.from && pairs.pair1.to >= pairs.pair2.to)
        return true;

    return (pairs.pair2.from <= pairs.pair1.from && pairs.pair2.to >= pairs.pair1.to);
}

function areRangesOverlapping(pairs: { pair1: { from: number, to: number }, pair2: { from: number, to: number } }): boolean {
    return (pairs.pair1.from <= pairs.pair2.to && pairs.pair1.to >= pairs.pair2.from);
}

function getContainedRangeCount(pairs: { pair1: { from: number, to: number }, pair2: { from: number, to: number } }[]): number {
    return pairs.reduce((sum, current) => {
        return sum + (areRangesContained(current) ? 1 : 0);
    }, 0)
}

function getOverlapCount(pairs: { pair1: { from: number, to: number }, pair2: { from: number, to: number } }[]): number {
    return pairs.reduce((sum, current) => {
        return sum + (areRangesOverlapping(current) ? 1 : 0);
    }, 0)
}

(async function run() {
    const data = input.loadInput('2022', 'day-4');
    const pairs = parseInput(data);
    console.log('1) Total contained pairs: ', getContainedRangeCount(pairs));
    console.log('2) Total pairs overlapped: ', getOverlapCount(pairs));
})().catch(e => console.error(e));