export class Command {
    public text: string;
    public argument?: string;
    public output: string[] = [];
    constructor(text: string) {
        if (!text.startsWith('$')) {
            console.error('Commands must start with the letter "$"');
            this.text = '';
            this.argument = '';
            return;
        }
        const parsed = Command.parseCommand(text);
        this.text = parsed.text;
        this.argument = parsed.argument;
    }

    private static parseCommand(command: string): { text: string, argument: string | undefined } {
        const trimmed = command.substring(1, command.length).trim();
        const splitted = trimmed.split(' ');
        if (splitted.length < 1 || splitted.length > 2) {
            console.error(`Command cannot be parsed: ${command}`);
            return { text: '', argument: '' };
        }
        const text = splitted[0];
        const argument = splitted.length === 2 ? splitted[1] : undefined;
        return { text, argument };
    }
}