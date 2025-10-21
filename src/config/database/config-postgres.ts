import { Sequelize } from "sequelize";
import { configPostgres } from "./type-config";




const sequelize: Sequelize = new Sequelize(configPostgres.db, configPostgres.user, configPostgres.password, {
    host: configPostgres.host,
    port: configPostgres.port,
    dialect: 'postgres',
    quoteIdentifiers: false,
    define: {
        timestamps: false,
        underscored: true,
        freezeTableName: true,
    }
})

// const sequelize = new Sequelize('postgres://postgres:1234@localhost:5434/auth_api')
sequelize
    .authenticate()
    .then(() => {
        console.info("Connection has been stablis")
    })
    .catch((err) => {
        console.error("Unable to connect to the database")
        console.info(err.message)
    })




export default sequelize