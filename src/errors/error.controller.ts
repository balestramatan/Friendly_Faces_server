import AppError from "./app.error";

const handleDBDuplicatesError = ({errors}) => {
    const message = `Invalid value: ${errors[0].value}, must be unique.`;
    return new AppError(message, 400);
};

const handleJWTError = (error) => {
    const message = `Invalid token, please login.`;
    return new AppError(message, 400);
};

const sendErrorDev = (err, res) => res.status(err.statusCode).json({
    error: err, message: err.message, stack: err.stack, status: err.status,
});

const sendErrorProd = (err, res) => {
    // send the error to client
    if (err.isOperational) {
        res.status(err.statusCode).json({
            message: err.message, status: err.status,
        });

        // log the error to the console
    } else {
        console.error('ERROR', err);

        res.status(500).json({
            message: 'Something went wrong!',
        });
    }
}

export default (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'production') {
        let error = {...err};
        if (error.name === 'SequelizeUniqueConstraintError') error = handleDBDuplicatesError(error);
        if (error.name === 'JsonWebTokenError') error = handleJWTError(error);
        sendErrorProd(error, res);
    } else sendErrorDev(err, res);
}