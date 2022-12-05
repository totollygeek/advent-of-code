#!/usr/bin/env node
import * as input from '../../utils/input';

function convertShape(shapeSign: string): string {
    switch (shapeSign) {
        case "X": return "A";
        case "Y": return "B";
        case "Z": return "C";
        default:
            throw new Error(`${shapeSign} - Unknown shape sign!`);
    }
}

function convertDecryptedShape(opponentShape: string, yourRoundOutcome: string): string {
    if (yourRoundOutcome === "Y")
        return opponentShape;

    switch (opponentShape) {
        case "A": {
            if (yourRoundOutcome === "X") return "C";
            return "B";
        }
        case "B": {
            if (yourRoundOutcome === "X") return "A";
            return "C";
        }
        case "C": {
            if (yourRoundOutcome === "X") return "B";
            return "A";
        }
        default:
            throw new Error(`${opponentShape} - Unknown shape sign!`);
    }
}

function getShapeScore(shapeSign: string): number {
    switch (shapeSign) {
        // Rock - 1 point
        case "A":
            return 1;
        // Paper - 2 points
        case "B":
            return 2;
        // Scissor - 3 points
        case "C":
            return 3;
        default:
            throw new Error(`${shapeSign} - Unknown shape sign!`);
    }
}

function getRoundScore(opponentShape: string, yourShape: string): number {
    if (opponentShape === yourShape)
        return 3;

    switch (opponentShape) {
        case "A":
            if (yourShape === "B") return 6;
            break;
        case "B":
            if (yourShape === "C") return 6;
            break;
        case "C":
            if (yourShape === "A") return 6;
            break;
        default:
            throw new Error(`${opponentShape} - Unknown shape sign!`);
    }

    return 0;
}

function parseInput(input: string): { opponent: string, you: string }[] {
    const rows = input.split('\n');
    return rows.map(r => {
        return {
            opponent: r[0],
            you: r[2]
        };
    });
}

function calculateResult(rounds: { opponent: string, you: string }[]): number {
    return rounds.reduce((sum, current) => {
        const yours = convertShape(current.you);
        return sum + getRoundScore(current.opponent, yours) + getShapeScore(yours);
    }, 0)
}

function calculateDecryptedResult(rounds: { opponent: string, you: string }[]): number {
    return rounds.reduce((sum, current) => {
        const yours = convertDecryptedShape(current.opponent, current.you);
        return sum + getRoundScore(current.opponent, yours) + getShapeScore(yours);
    }, 0)
}

(async function run() {
    const data = input.loadInput('2022', 'day-2');
    const rounds = parseInput(data);
    console.log('1) Your total score is: ', calculateResult(rounds));
    console.log('2) Your total second score is: ', calculateDecryptedResult(rounds));
})().catch(e => console.error(e));