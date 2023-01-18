import catchAsyncError from "../utils/catch_async_error";
import AppError from "../errors/app.error";
import jwt from "jsonwebtoken";

import {promisify} from "util";

export default catchAsyncError(async (req, res, next) => {
    const {authorization} = req.headers;

    if (!authorization) return next(new AppError("Please login to get access", 401));

    const token = authorization.startsWith("Bearer") && authorization.split(" ")[1];

    if (!token) return next(new AppError("Please login to get access", 401));

    try {
        // @ts-ignore
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        console.log('decoded ::');
        console.log(decoded);
    } catch (e) {
        console.log('e ::');
        console.log(e);
        return next(new AppError("Please login to get access", 401));
    }
    // next();
});