import express from 'express';
import * as dotenv from "dotenv";
import initial_base_middleware from "./middlewares/middlewares";
import initial_routes from "./api/routes/routes";
import db_connection from "./database/database";

const port = 3000;

const initial_app = async (): Promise<void> => {
    const app = express();

    // Load environment variables from .env file, where API keys and passwords are configured
    dotenv.config();

    // Initialize app base middleware
    initial_base_middleware(app);

    // Initial app routes
    initial_routes(app);

    await db_connection.authenticate();

    app.listen(port);
}

initial_app()
    .then(() => console.log(`App initialized successfully on port ${process.env.PORT}`))
    .catch((error) => console.log(error));