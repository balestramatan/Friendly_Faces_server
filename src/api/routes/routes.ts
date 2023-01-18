import userRouter from './user.routes';
import authRouter from "../routes/auth.routes";

import AppError from "../../errors/app.error";

const initial_routes = (app) => {
    app.use(authRouter);
    app.use(userRouter);
    app.all('*', (req, res, next) => next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404)));
}

export default initial_routes;