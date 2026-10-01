//Target our extended Error class
import { APIError } from "../utils/helpers.js";


export function errorHandler(err, req, res, next) {
    console.error(err);

    if (err instanceof APIError) {
        return res.status(err.status).json({
            success: err.success,
            code: err.code,
            status: err.status,
            message: err.message
        });
    }

    return res.status(500).json({
        success: false,
        status: 500,
        code: "INTERNAL_ERROR",
        message: "An unexpected error occurred."
    });
}