import express, { Request, Response, NextFunction } from "express";
import { CountryModel } from "../4-models/country-model";

import logic from "../5-logic/logic";

const router = express.Router(); // Capital R

// GET http://localhost:3001/api/continents
router.get("/continents", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const continents = await logic.getAllContinents();
        response.json(continents);
    }
    catch (err: any) {
        next(err);
    }
});

// GET http://localhost:3001/api/countries
router.get("/countries", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const countries = await logic.getAllCountries();
        response.json(countries);
    }
    catch (err: any) {
        next(err);
    }
});

// GET http://localhost:3001/api/countries-by-continent/:continentId
router.get("/countries-by-continent/:continentId", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const continentId = request.params.continentId;
        const countries = await logic.getCountriesByContinent(continentId);
        response.json(countries);
    }
    catch (err: any) {
        next(err);
    }
});

// POST http://localhost:3001/api/countries
router.post("/countries", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const country = new CountryModel(request.body);
        const addedCountry = await logic.addCountry(country);
        response.status(201).json(addedCountry);
    }
    catch (err: any) {
        next(err);
    }
});

// DELETE http://localhost:3001/api/countries/:_id
router.delete("/countries/:_id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id;
        await logic.deleteCountry(_id);
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});



export default router;

