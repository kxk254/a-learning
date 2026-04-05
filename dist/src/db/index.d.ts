import 'dotenv/config';
export declare class DatabaseService {
    readonly db: import("drizzle-orm/node-postgres").NodePgDatabase<Record<string, never>> & {
        $client: import("pg").Pool;
    };
}
