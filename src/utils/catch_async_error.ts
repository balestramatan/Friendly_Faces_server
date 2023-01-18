import {NextFunction, Request, Response} from "express";

// gets the function and then executes it with catch block (replacing try catch)
export default fn => (req: Request, res: Response, next: NextFunction) => fn(req, res, next).catch(next);