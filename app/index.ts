import * as mongoose from "mongoose";
import { HttpError, IRouterOptions, Road, Server, SetRouter } from "spiel-server";
import { globalConfig } from "./config";
import { IError } from "./helpers";
import { People } from "./modules";

const app = new Road();

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
const endpoints = [new People()];

const configRouter: IRouterOptions = {
  connectionMode: true,
  endpoints,
  road: app,
  verbose: true,
};

new SetRouter(configRouter);

mongoose.connect(`mongodb://${globalConfig.mongodb.username}:
${globalConfig.mongodb.password}@${globalConfig.mongodb.host}/${globalConfig.mongodb.database}`)
.then(() => {
    server.listen(globalConfig.service.port, () => {
        console.log(`Server running in port ${globalConfig.service.port}`);
    });
});
