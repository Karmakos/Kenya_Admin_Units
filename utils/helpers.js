import { appendFile } from 'node:fs'


//Write to File
export function writeError(error) {
    return appendFile("./logs/error.log", error, { flags: "a" }, (err) => {
        if (err)
            console.warn("Error writing the error", err);
    });
}

export function sanitizeNumberInput(input) {
    const sanitizedNumber = input
        .toString()
        .trim()
        .replace(/[^\d]/g, '')
        .replace(/[\s/]/g, '')

    return sanitizedNumber
}

export function sanitizeStringInput(input) {
    const sanitizedString = input
        .toString()
        .trim()
        .replace(/[^a-z||A-Z]/g, '')
        .replace(/\s/g, '')


    return sanitizedString
}


export class APIError extends Error {
    constructor(message, { success, status, code } = {}) {
        super(message)

        this.success = success
        this.status = status
        this.code = code

        Error.captureStackTrace(this, this.constructor);


    }
}
