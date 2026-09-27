import dotenv from "dotenv"

dotenv.config()

const {
    PORT,
    DATABASE_NAME,
    DATABASE_PORT,
    READER_USERNAME,
    READER_PASSWORD,
    WRITER_USERNAME,
    WRITER_PASSWORD } = process.env;

const config = {
    api: {
        port: PORT
    },
    db: {
        name: DATABASE_NAME,
        port: DATABASE_PORT,
        reader: {
            username: READER_USERNAME,
            password: READER_PASSWORD
        },
        writer: {
            username: WRITER_USERNAME,
            password: WRITER_PASSWORD
        }
    }
}

export default config