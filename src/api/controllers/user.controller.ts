import User from '../../database/dals/user.dal';
import AppError from "../../errors/app.error";
import catchAsyncError from "../../utils/catch_async_error";
import appResponse from "../../utils/make.response";
import {Statuses, StatusesCodes} from "../../utils/statuses_codes.enum";

const get_all_users = catchAsyncError(async (req, res, next) => {
    const users = await User.getAllUsers()
    return appResponse(res, StatusesCodes.OK, Statuses.SUCCESS, users);
});

const get_user_by_id = catchAsyncError(async (req, res, next) => {
    const user = await User.getUserById(req.params.id);

    if (!user) return next(new AppError(`User id not found`, StatusesCodes.NOT_FOUND));

    return appResponse(res, StatusesCodes.OK, Statuses.SUCCESS, user);
});

const create_user = catchAsyncError(async (req, res, next) => {
    const user_to_crate = {
        name: req.body.name,
        phone_number: req.body.phone_number,
        birthday: req.body.birthday,
        city: req.body.city,
        role: req.body.role
    };

    const user_created = User.createUser(user_to_crate);

    if (!user_created) return next(new AppError(`Failed to create user`, StatusesCodes.NOT_FOUND));

    return appResponse(res, StatusesCodes.CREATED, Statuses.SUCCESS, user_created, 'User Created Successfully');
});

const update_user = catchAsyncError(async (req, res, next) => {
    const user_exists = await User.getUserById(req.params.id);
    if (!user_exists) return next(new AppError(`User not found`, StatusesCodes.NOT_FOUND));

    const user = {
        id: req.params.id,
        name: req.body.name,
        phone_number: req.body.phone_number,
        birthday: req.body.birthday,
        city: req.body.city,
        role: req.body.role
    };

    await User.updateUser(user);
    return appResponse(res, StatusesCodes.UPDATED, Statuses.SUCCESS, user, 'User Updated Successfully');
});

const delete_user = catchAsyncError(async (req, res, next) => {
    const user_exists = await User.getUserById(req.params.id);

    if (!user_exists) return next(new AppError(`User not found`, StatusesCodes.NOT_FOUND));

    await User.deleteUser(req.params.id);
    return appResponse(res, StatusesCodes.DELETED, Statuses.SUCCESS, null, 'User Deleted Successfully');
});

export {
    get_all_users,
    get_user_by_id,
    create_user,
    update_user,
    delete_user
}