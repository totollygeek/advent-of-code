import * as input from '../../utils/input';

function hasDuplicates(marker: string, length: number): boolean {
    if (marker.length !== length) {
        console.error('Expected exactly ' + length + ' characters, but found: ', marker.length);
        return false;
    }

    const sorted = [...marker].sort();
    for (let i = 0; i < sorted.length - 1; i++) {
        if (sorted[i] === sorted[i + 1]) {
            return true;
        }
    }

    return false;
}

function getMarkerPosition(input: string, length: number): Number {
    for (let i = 0; i < input.length - length; i++) {
        if (!hasDuplicates(input.substring(i, i + length), length)) {
            return i + length;
        }
    }

    return -1;
}

(async function run() {
    const data = input.loadInput('2022', 'day-6');
    console.log('1) First sequence start after: ', getMarkerPosition(data, 4));
    console.log('2) Message sequence start after: ', getMarkerPosition(data, 14));
})().catch(e => console.error(e));