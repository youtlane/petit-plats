import { recipes } from "../../data/recipes.js"
import { Recipe } from "../models/recipe.js"
/**
 * Class service pour gérer les données
 */
export class GetData {
    /*
    permet et type les recipes
    */
    async getRecipesData() {
        const recipesData = recipes.map(data => new Recipe(data));
        return recipesData;
    }
}