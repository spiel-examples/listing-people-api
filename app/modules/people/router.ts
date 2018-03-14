import {Delete, Endpoint, Get, HttpError, IBody, Post, Put, Response} from "spiel-server";
import {peopleModel} from "./model";

@Endpoint("people")
export class People {
    private body: IBody;

    @Get("")
    private async getPeople(url: any) {
        try {
            let query = url.query;
            if (Object.keys(query).length) {
                query = JSON.parse(query.response);
            }
            const response = await peopleModel
                .find(query.filter)
                .sort(query.sort)
                .limit(query.limit);
            return new Response(response, 200);
        } catch (error) {
            console.log(error);
            return new HttpError(error, 500);
        }
    }

    @Post("")
    private async addPerson() {
        try {
            const response = await peopleModel.create(this.body);
            console.log(response);
            return new Response(response, 200);
        } catch (error) {
            return new HttpError(error, 500);
        }
    }

    @Delete("$id")
    private async deletePerson(url: any) {
        const id = url.args.id;
        try {
            const response = await peopleModel.findById(id)
                .remove();
            return new Response(id, 200);
        } catch (error) {
            return new HttpError(error, 500);
        }
    }
}
