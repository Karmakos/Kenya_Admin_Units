import { appendFile } from 'node:fs'


//Write to File
export function writeError(error) {
    return appendFile("./logs/error.log", error, { flags: "a" }, (err) => {
        if (err)
            console.warn("Error writing the error", err);
    });
}


//sanitize number input
export function sanitizeNumberInput(input) {
    const sanitizedNumber = input
        .toString()
        .trim()
        .replace(/[^\d]/g, '')
        .replace(/[\s/]/g, '')

    return sanitizedNumber
}


//sanitize string input
export function sanitizeStringInput(input) {
    const sanitizedString = input
        .toString()
        .trim()
        .replace(/[^a-z||A-Z || ']/g, '')
        .replace(/\s/g, '')


    return sanitizedString
}

// Extend the Error class to create a custom APIError class
export class APIError extends Error {
    constructor(message, { success, status, code } = {}) {
        super(message)

        this.success = success
        this.status = status
        this.code = code

        Error.captureStackTrace(this, this.constructor);


    }
}

