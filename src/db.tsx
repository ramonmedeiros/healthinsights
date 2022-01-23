import Dexie, { Table } from 'dexie';
import { HEARTBEAT_SERIES } from './manipulations'
import HeartBeatSerie from './models'

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

    async upsertHeartbeat(series: HeartBeatSerie[]) {
        try {
            if (await db.exports.get(HEARTBEAT_SERIES)) {
                await db.exports.delete(HEARTBEAT_SERIES)
            }
        } catch (error) {
            console.error(`Failed to retrieve heartbeat data: ${error}`);
        }

        try {
            await db.exports.add({
                id: HEARTBEAT_SERIES,
                value: JSON.stringify(series),
            })
        } catch (error) {
            console.error(`Failed to add heartbeat data: ${error}`);
        }
    }
}

export const db = new Database();