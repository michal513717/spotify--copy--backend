import express from "express";
import DatabaseManager from "./managers/dataBaseManager";
import AuthManager from "./managers/authManager";
import FileManager from "./managers/fileManager";
import { CommonRoutesConfig } from "./common/common.routes.config";

import * as http from 'http';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';

import cors from 'cors';
import {AuthRoutes} from './routes/auth.routes.config';
import {UploadRoutes} from './routes/upload.routes.config';
import debug from 'debug';
import { AlbumsRoutes } from "./routes/albums.routes.config";

import bodyParser from 'body-parser';

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = 3000;
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug('app');

export const databaseManager = new DatabaseManager();
export const authManager = new AuthManager();
export const fileManager = new FileManager();

app.use(express.json());
app.use(cors());

const loggerOptions: expressWinston.LoggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({ all: true })
    ),
};

if (!process.env.DEBUG) {
    loggerOptions.meta = false; // when not debugging, log requests as one-liners
}

app.use(expressWinston.logger(loggerOptions));
app.use(bodyParser.urlencoded({ extended: true }))

routes.push(new AuthRoutes(app));
routes.push(new AlbumsRoutes(app));
routes.push(new UploadRoutes(app));

const runningMessage = `Server running at http://localhost:${port}`;

app.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).send(runningMessage)
});

server.listen(port, () => {

    routes.forEach((route: CommonRoutesConfig) => {
        debugLog(`Routes configured for ${route.getName()}`);
    });

    console.log(runningMessage);
});
