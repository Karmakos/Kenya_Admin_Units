import { writer, reader } from "../config/pool.js"

async function testWriterPoolConnection() {
    try {
        // Manually acquire a client to verify the connection handshake
        const writerClient = await writer.connect();
        console.log('Writer Successfully connected to Postgres!');

        // Release the client back to the pool immediately
        writerClient.release();
    } catch (error) {
        console.error('Unable to establish database connection:', error.message);
        process.exit(1); // Exit process or trigger alert
    }
}
async function testReaderPoolConnection() {
    try {
        const readerClient = await reader.connect()
        console.log('Reader Successfully connected to Postgres!');

        // Release the client back to the pool immediately
        readerClient.release();
    } catch (error) {
        console.error('Unable to establish database connection:', error.message);
        process.exit(1); // Exit process or trigger alert
    }
}



testWriterPoolConnection();
testReaderPoolConnection(); 