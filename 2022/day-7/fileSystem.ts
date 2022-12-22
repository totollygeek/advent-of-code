export interface IFileSystemElement {
    name: string;
    type: 'directory' | 'file';
    parent?: IFileSystemElement;
    children: IFileSystemElement[];
    addChild(child: IFileSystemElement): void;
    getChild(name: string): IFileSystemElement;
    getSize(): number;
}

export class Directory implements IFileSystemElement {
    public readonly name: string;
    public readonly type: 'directory' | 'file' = 'directory';
    public readonly parent?: IFileSystemElement;
    public children: IFileSystemElement[] = [];

    constructor(name: string, parent?: IFileSystemElement) {
        this.name = name;
        this.parent = parent;
    }
    getSize(): number {
        return this.children.reduce((sum, current) => sum + current.getSize(), 0);
    }

    public addChild(child: IFileSystemElement): void {
        if (this.getChild(child.name) === undefined) {
            this.children.push(child);
        } else {
            throw new Error(`Trying to add "${child.name}" to "${this.name}" again!`);
        }
    }

    public getChild(name: string): IFileSystemElement {
        return this.children.find(c => c.name === name)!;
    }
}

export class File implements IFileSystemElement {
    public readonly name: string;
    public readonly type: 'directory' | 'file' = 'file';
    public readonly parent?: IFileSystemElement;
    public children: IFileSystemElement[] = [];

    private size: number = 0;

    constructor(name: string, size: number, parent?: IFileSystemElement) {
        this.name = name;
        this.size = size;
        this.parent = parent;
    }
    public getSize(): number {
        return this.size
    }

    public addChild(_: IFileSystemElement): void {
        throw new Error('Files cannot have children!');
    }

    public getChild(_: string): IFileSystemElement {
        throw new Error('Files cannot have children!');
    }
}