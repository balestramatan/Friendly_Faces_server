import express from "express";
import {login, signup} from "../controllers/auth.controller";

const authRouter = express.Router();

authRouter.route('/api/users/signup')
    .post(signup)

authRouter.route('/api/users/login')
    .post(login);

export default authRouter;