import { config } from 'dotenv'
config()
export const configPostgres = {
    db: process.env.POSTGRES_DB || 'chat',
    port: process.env.POSTGRES_PORT! as unknown as number || 5432,
    user: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || '',
    host: process.env.POSTGRES_HOST || 'localhost'
}