

import mongoose from "mongoose";
import { ContinentModel } from "./continent-model";

export interface ICountryModel extends mongoose.Document{
    continentId: mongoose.Schema.Types.ObjectId;
    name: string;
    included: string;
    expected: string;
    amount: string;
    whoGets: string;
}

export const CountrySchema = new mongoose.Schema<ICountryModel>({
    continentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Must choose continent"]
    },
    name: {
        type: String,
        required: [true, "Must enter name"]
    },
    included: {
        type: String,
        required: [true, "Must enter if tip is included"],
    },
    expected: {
        type: String,
        required: [true, "Must enter if tip is expected"],
    },
    amount: {
        type: String,
        required: [true, "Must enter tip amount"],
    },
    whoGets: {
        type: String,
        required: [true, "Must enter who gets the tip"],
    }
}
,{
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
});

CountrySchema.virtual("continents", {
    ref: ContinentModel,
    localField: "continentId",
    foreignField: "_id",
    justOne: true
})

export const  CountryModel = mongoose.model<ICountryModel>("ICountryModel", CountrySchema, "countries");