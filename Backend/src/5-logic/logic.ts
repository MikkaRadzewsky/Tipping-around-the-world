import { ContinentModel, IContinentModel } from "../4-models/continent-model";
import { CountryModel, ICountryModel } from "../4-models/country-model";
import { ResourceNotFoundErrorModel, ValidationErrorModel } from "../4-models/error-models";

// Get all continents types: 
function getAllContinents(): Promise<IContinentModel[]> {
    return ContinentModel.find().exec();
}

// Get all countries: 
function getAllCountries(): Promise<ICountryModel[]> {
    return CountryModel.find().exec();
}

// Get countries by continent: 
async function getCountriesByContinent(continentId: string): Promise<ICountryModel[]> {
    const countries = await CountryModel.find({continentId}).exec()
    return countries;
}

// Add Country: 
function addCountry (country: ICountryModel): Promise<ICountryModel> {
    const error = country.validateSync();
    if(error) throw new ValidationErrorModel(error.message);
    return country.save();
}

// Delete Country: 
async function deleteCountry(_id: string): Promise<void> {
    const deletedCountry = await CountryModel.findByIdAndDelete(_id).exec();
    if (!deletedCountry) throw new ResourceNotFoundErrorModel(_id);
}
export default {
    getAllContinents,
    getAllCountries,
    getCountriesByContinent,
    addCountry,
    deleteCountry
};