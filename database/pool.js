import Pool from 'pg-pool'
import config from '../config/config.js'


const reader = new Pool({
    database: config.db.name,
    user: config.db.reader.username,
    password: config.db.reader.password,
    port: config.db.port,
    ssl: false,
    max: 20,
    idleTimeoutMillis: 10000,
    connectionTimeoutMillis: 1000,
    maxUses: 7500,
})

const writer = new Pool({
    database: config.db.name,
    user: config.db.writer.username,
    password: config.db.writer.password,
    port: config.db.port,
    ssl: false,
    max: 20,
    idleTimeoutMillis: 10000,
    connectionTimeoutMillis: 1000,
    maxUses: 7500,
})

export { writer, reader };


