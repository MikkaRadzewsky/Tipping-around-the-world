import mongoose from "mongoose";

export interface IContinentModel extends mongoose.Document{
    name: string;
}

export const ContinentSchema = new mongoose.Schema<IContinentModel>({
    name: {
        type: String,
        required: [true, "Required Continent"]
    }
})

export const  ContinentModel = mongoose.model<IContinentModel>("IContinentModel", ContinentSchema, "continents");