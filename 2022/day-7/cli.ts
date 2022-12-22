import * as input from '../../utils/input';
import { Command } from './command';
import { Directory, File, IFileSystemElement } from './fileSystem';

function splitByCommand(output: string[]): Command[] {
    let result: Command[] = [];
    let lastCommand: Command | undefined = undefined;
    for (let i = 0; i < output.length; i++) {
        const o = output[i];
        if (o.startsWith('$')) {
            if (lastCommand !== undefined) {
                result.push(lastCommand);
            }
            lastCommand = new Command(o);
        }
        else {
            if (lastCommand === undefined) {
                throw new Error(`Unexpected output "${o}", while no previous command was found!`);
            }
            lastCommand.output.push(o);
        }
    }

    return result;
}

function parseOutput(output: string[], parent: IFileSystemElement): IFileSystemElement[] {
    return output.map(o => {
        const splitted = o.split(' ');
        if (splitted.length !== 2) {
            throw new Error(`Command output was not expected: ${o}`);
        } else {
            if (splitted[0] === 'dir') return new Directory(splitted[1], parent);

            return new File(splitted[1], Number(splitted[0]), parent);
        }
    });
}

function parseInput(input: string): IFileSystemElement {
    const rootDirectory: IFileSystemElement = new Directory('/');
    let currentDirectory: IFileSystemElement = rootDirectory;
    const commands = splitByCommand(input.split('\n'));

    for (let i = 0; i < commands.length; i++) {
        const c = commands[i];
        switch (c.text) {
            case 'cd': {
                if (c.argument === '/') {
                    currentDirectory = rootDirectory;
                    break;
                }

                if (c.argument === '..') {
                    currentDirectory = currentDirectory.parent!;
                    break;
                }

                const nextDirectory = currentDirectory.getChild(c.argument!);
                currentDirectory = nextDirectory;
                break;
            }
            case 'ls': {
                const contents = parseOutput(c.output, currentDirectory);
                contents.forEach(c => {
                    currentDirectory.addChild(c);
                });
                break;
            }
            default: {
                throw new Error(`Unsupported command: ${c.text}`);
            }
        }
    }

    return rootDirectory;
}

function getDirectories(root: IFileSystemElement): IFileSystemElement[] {
    let result: IFileSystemElement[] = [root];

    for (let i = 0; i < root.children.length; i++) {
        const child = root.children[i];

        if (child.type === 'directory') {
            result.push(...getDirectories(child));
        }
    }

    return result;
}

function calculateDirectoriesSizeSum(directories: IFileSystemElement[], threshold: number): number {
    return directories.reduce((sum, current) => {
        const c: number = (current.getSize() <= threshold ? current.getSize() : 0);
        return sum + c;
    }, 0)
}

function calculateSmallestPossibleDirectory(directories: IFileSystemElement[], sizeNeeded: number): number {
    const filteredList = directories.filter(d => d.getSize() >= sizeNeeded);
    filteredList.sort((a, b) => a.getSize() - b.getSize());
    console.log(filteredList.map((f, i) => `${i}) ${f.name} - ${f.getSize()}`));
    const smallest = filteredList[0];
    console.log(`Smallest: ${smallest.name} - ${smallest.getSize()}`);
    return smallest.getSize();
}

(async function run() {
    const data = input.loadInput('2022', 'day-7');
    const root = parseInput(data);
    const directories = getDirectories(root);
    console.log('1) Sum of sizes: ', calculateDirectoriesSizeSum(directories, 100000));
    const totalAmountFree = 70000000 - root.getSize();
    const sizeNeeded = 30000000 - totalAmountFree;
    console.log('2) Directory size to delete: ', calculateSmallestPossibleDirectory(directories, sizeNeeded));
})().catch(e => console.error(e));