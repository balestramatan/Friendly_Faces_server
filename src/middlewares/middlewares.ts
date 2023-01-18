import express from "express";
import morgan from "morgan";

const initial_base_middleware = (app) => {
    app.use(morgan('dev'));
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
}

export default initial_base_middleware;