import * as input from '../../utils/input';

function parseInput(input: string): { compartment1: string, compartment2: string }[] {
    const rows = input.split('\n');
    return rows.map(r => {
        const middle = r.length / 2;
        return {
            compartment1: r.substring(0, middle),
            compartment2: r.substring(middle, r.length)
        }
    });
}

function parseTeams(input: string): { elf1: string, elf2: string, elf3: string }[] {
    const rows = input.split('\n');
    let result: { elf1: string, elf2: string, elf3: string }[] = [];
    for (let i = 0; i <= rows.length - 3; i += 3) {
        result.push({
            elf1: rows[i],
            elf2: rows[i + 1],
            elf3: rows[i + 2]
        });
    }
    return result;
}

function getMatchingType(compartment1: string[], compartment2: string[]): string {
    return compartment1.filter((val1) => {
        return compartment2.find((val2) => val1 === val2);
    })[0];
}

function getMatchingTeamType(team: { elf1: string, elf2: string, elf3: string }): string {
    let result: string = '';
    [...team.elf1].forEach(char => {
        if (team.elf2.includes(char) && team.elf3.includes(char)) {
            result = char;
            return;
        }
    });

    return result;
}

function getCharScore(char: string): number {
    const asciiCode = char.charCodeAt(0);

    if (asciiCode >= 65 && asciiCode <= 90) return asciiCode - 38;
    return asciiCode - 96;
}

function getRowScore(row: { compartment1: string, compartment2: string }): number {
    const sorted1 = [...row.compartment1].sort();
    const sorted2 = [...row.compartment2].sort();

    const sharedType = getMatchingType(sorted1, sorted2);
    const score = getCharScore(sharedType);
    console.log(`\t${sharedType}: ${score}`);
    return score;
}

function getTotalRowsScore(rows: { compartment1: string, compartment2: string }[]): number {
    return rows.reduce((sum, current) => {
        console.log(`${current.compartment1} - ${current.compartment2}:`);
        return sum + getRowScore(current);
    }, 0)
}

function getTotalTeamsScore(teams: { elf1: string, elf2: string, elf3: string }[]): number {
    return teams.reduce((sum, current) => {
        const match = getMatchingTeamType(current);
        return sum + getCharScore(match);
    }, 0)
}

(async function run() {
    const data = input.loadInput('2022', 'day-3');
    const racksacks = parseInput(data);
    console.log('1) Total racksacks score: ', getTotalRowsScore(racksacks));

    const teams = parseTeams(data);
    console.log('2) Total teams score: ', getTotalTeamsScore(teams));
})().catch(e => console.error(e));