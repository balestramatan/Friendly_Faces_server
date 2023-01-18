import express from "express";
import {create_user, delete_user, get_all_users, get_user_by_id, update_user} from "../controllers/user.controller";
import protect_routes from "../../middlewares/protect_routes";

const userRouter = express.Router();

userRouter.route('/api/users')
    .get(protect_routes, get_all_users)

userRouter.route('/api/users/:id')
    .get(protect_routes, get_user_by_id)
    .patch(protect_routes, update_user)
    .delete(protect_routes, delete_user)

userRouter.route('/api/users/create')
    .post(protect_routes, create_user)

export default userRouter;