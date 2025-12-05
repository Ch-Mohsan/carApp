const { ZodError } = require('zod');

const errorHandler = (err, req, res, next) => { 
    // Zod validation errors
    if (err instanceof ZodError) {
        const issues = (err.errors || []).map(e => ({ path: e.path, code: e.code, message: e.message }));
        return res.status(400).json({ message: 'Validation error', issues });
    }

    // Mongoose CastError
    if (err.name === 'CastError') {
        return res.status(400).json({ message: 'Invalid ID format', path: err.path, value: err.value });
    }

    // Mongoose ValidationError
    if (err.name === 'ValidationError') {
        const details = Object.values(err.errors || {}).map(e => ({ path: e.path, message: e.message }));
        return res.status(400).json({ message: 'Validation error', issues: details });
    }

    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    if (status >= 500) console.error(err.stack || err);
    return res.status(status).json({ message });
}
module.exports = errorHandler;