import Dexie, { Table } from 'dexie';

export interface Exports {
    id?: string;
    value: string;
}

const DB_NAME = "health_insights"

export class Database extends Dexie {
    exports!: Table<Exports>;

    constructor() {
        super(DB_NAME);
        this.version(1).stores({
            exports: '++id'
        });
    }
}

export const db = new Database();