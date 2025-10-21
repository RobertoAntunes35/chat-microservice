import { Sequelize } from "sequelize";
import { IDatabase } from "./IDatabase";



interface IConnectionSequelize {
    db: string, 
    user: string, 
    password: string, 
    host: string, 
    port: number;
}

export class SequelizeDatabase implements IDatabase {
    private sequelize: Sequelize; 

    constructor(config: IConnectionSequelize) {
    this.sequelize = new Sequelize(config.db, config.user, config.password, {
      host: config.host,
      port: config.port,
      dialect: 'postgres',
      quoteIdentifiers: false,
      define: {
        timestamps: false,
        underscored: true,
        freezeTableName: true,
      }
    });
  }

    async connect(): Promise<void> {
        try {
            await this.sequelize.authenticate();
            console.info('Connection has been established.')
        } catch(err: any) {
            console.error("Unable to connecto to the database.");
            console.info((err as Error).message);
            throw err; 
        }
    }
    async disconnect(): Promise<void> {
        await this.sequelize.close();
    }
    getConnection(): Sequelize {
        return this.sequelize;
    }

}