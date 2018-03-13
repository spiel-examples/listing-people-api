import { Model } from "mongoose";
import { InstanceType, ModelType, prop, Typegoose } from "typegoose";

export class People extends Typegoose {
    @prop({required: true})
    public name!: string;

    @prop()
    public superPower!: boolean;

    @prop()
    public rich!: boolean;

    @prop()
    public genius!: boolean;
}

export const peopleModel = new People().getModelForClass(People, {
    schemaOptions: {
        collection: "people",
    },
});
