import fs from 'fs';
import path from 'path';

export function loadInput(yearPath: string, dayPath: string): string {
    console.log('Current dir: ', __dirname);
    const absolutePath = path.resolve(`${__dirname}/../${yearPath}/${dayPath}/input.txt`);
    console.log('Loading input from: ', absolutePath);

    return fs.readFileSync(absolutePath, 'utf-8');
}