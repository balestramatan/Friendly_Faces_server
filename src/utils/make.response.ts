import {Response} from "express";

export default (res: Response, status_code: number = 200, status: string = 'success', data: {} = null, message: string = '') => res
    .status(status_code)
    .json({
        status_code,
        status,
        message,
        data
    });