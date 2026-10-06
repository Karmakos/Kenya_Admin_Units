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

export function notFoundHandler(req, res, next) {

    res.status(404).json({
        success: false,
        status: 404,
        route: req.originalUrl,
        code: "NOT_FOUND",
        message: "The route resource was not found."
    });
}