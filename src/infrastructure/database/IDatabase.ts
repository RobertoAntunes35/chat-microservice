import { Sequelize } from "sequelize";

export interface IDatabase {
    connect(): Promise<void> ;
    disconnect(): Promise<void>;
    getConnection(): Sequelize;
}