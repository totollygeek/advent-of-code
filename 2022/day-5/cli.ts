import * as input from '../../utils/input';

class Movement {
    constructor(
        public readonly count: number,
        public readonly from: number,
        public readonly to: number
    ) { }
}

class CrateStorage {
    crates: string[][] = [];
    moves: Movement[] = [];

    moveCratesAndGetTopResult(): string {
        this.moves.forEach(move => {
            const from = move.from - 1;
            const to = move.to - 1;

            for (let i = 1; i <= move.count; i++) {
                const crate = this.crates[from].pop();

                if (this.crates[to] === undefined)
                    this.crates[to] = [];

                this.crates[to].push(crate!);
            }
        });

        return this.crates.reduce((sum, current) => {
            return sum + current[current.length - 1];
        }, '')
    }

    moveCratesInBatchAndGetTopResult(): string {
        this.moves.forEach(move => {
            const from = move.from - 1;
            const to = move.to - 1;

            let movingPart: string[] = [];
            for (let i = 1; i <= move.count; i++) {
                const crate = this.crates[from].pop();

                if (this.crates[to] === undefined)
                    this.crates[to] = [];

                movingPart.unshift(crate!);
            }
            this.crates[to].push(...movingPart!);
        });

        return this.crates.reduce((sum, current) => {
            return sum + current[current.length - 1];
        }, '')
    }
}

function getMovement(row: string): Movement {
    const regex = /move (?<count>\d+) from (?<from>\d+) to (?<to>\d+)/g;
    const match = regex.exec(row);

    return new Movement(
        Number(match?.groups!['count']),
        Number(match?.groups!['from']),
        Number(match?.groups!['to'])
    )
}

function parseInput(input: string): CrateStorage {
    const storage: CrateStorage = new CrateStorage();

    const rows = input.split('\n');

    let i = 0;
    for (i = 0; i < rows.length; i++) {
        let row = rows[i];

        if (row === undefined || row === '') continue;

        if (row.startsWith('move')) break;
        if (!row.endsWith(' ')) row += ' ';

        const columnsCount = (row.length) / 4;
        for (let c = 0; c < columnsCount; c++) {
            const stringPosition = c * 4;
            const crate = row.substring(stringPosition, stringPosition + 3);

            if (crate === '   ') continue;

            if (!crate.startsWith('[')) continue;

            if (storage.crates[c] === undefined) {
                storage.crates[c] = [];
            }

            storage.crates[c].unshift(crate[1]);
        }
    }

    for (i; i < rows.length; i++) {
        let row = rows[i];

        storage.moves.push(getMovement(row));
    }

    return storage;
}

(async function run() {
    const data = input.loadInput('2022', 'day-5');
    let storage = parseInput(data);
    console.log('1) Top crates: ', storage.moveCratesAndGetTopResult());
    storage = parseInput(data);
    console.log('2) Top crates moved in batch: ', storage.moveCratesInBatchAndGetTopResult());
})().catch(e => console.error(e));