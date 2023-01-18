import User from '../../database/dals/user.dal';
import AppError from "../../errors/app.error";

import catchAsyncError from "../../utils/catch_async_error";
import MakeResponse from "../../utils/make.response";

import {Statuses, StatusesCodes} from "../../utils/statuses_codes.enum";


const login = catchAsyncError(async (req, res, next) => {
    const {phone_number} = req?.body;

    if (!phone_number) return next(new AppError('Phone number is required', StatusesCodes.BAD_REQUEST));

    const user = await User.getUserByPhoneNumber(phone_number);

    if (!user) return next(new AppError('User not found', StatusesCodes.NOT_FOUND));

    const token = await User.generateToken(user);
    const data = {
        token, user
    };

    return MakeResponse(res, StatusesCodes.OK, Statuses.SUCCESS, data);
});

const signup = catchAsyncError(async (req, res, next) => {
    const new_user = await User.createUser(req.body);

    if (!new_user) return next(new AppError('User not created', StatusesCodes.BAD_REQUEST));

    const token = await User.generateToken(new_user.dataValues.id);

    if (!token) return next(new AppError('Failed generating token for user', StatusesCodes.BAD_REQUEST));

    const data = {
        token,
        user: new_user
    };

    return MakeResponse(res, StatusesCodes.CREATED, Statuses.SUCCESS, data);
});

export {
    login,
    signup
}