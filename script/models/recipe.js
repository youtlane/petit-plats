
export class Recipe {
    constructor(data) {
      this.id = data.id;
      this.image = data.image;
      this.name = data.name;
      this.servings = data.servings;
      this.ingredients = data.ingredients;
      this.time = data.time;
      this.description = data.description;
      this.appliance = data.appliance;
      this.ustensils = data.ustensils;
    }
  }