import * as mongoose from "mongoose";
import { HttpError, IRouterOptions, Road, Server, SetRouter } from "spiel-server";
import { globalConfig } from "./config";
import { IError } from "./helpers";
import { People } from "./modules";

const app = new Road();

const connect = mongoose.connect(`mongodb://${globalConfig.mongodb.username}:` +
`${globalConfig.mongodb.password}@${globalConfig.mongodb.host}/${globalConfig.mongodb.database}`);

const server = new Server(app, (error: IError) => {
    switch (error.code) {
        case 404:
            return new HttpError("Not Found", 404);
        case 405:
            return new HttpError("Not Allowed", 405);
        default:
        case 500:
        return new HttpError(error.message, 500);
    }
});

const cors = {
    requestHeaders: ["content-type"],
    validMethods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
    validOrigins: ["http://localhost:3000"],
};

const endpoints = [new People()];

const configRouter: IRouterOptions = {
  connectionMode: true,
  cors,
  endpoints,
  road: app,
  verbose: true,
};

new SetRouter(configRouter);

connect.then(() => {
    server.listen(globalConfig.service.port, () => {
        console.log(`Server running in port ${globalConfig.service.port}`);
    });
});
