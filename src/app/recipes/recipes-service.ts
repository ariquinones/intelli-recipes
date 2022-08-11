import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Recipe } from './models';

@Injectable()
export class RecipesService {

  private AUTH_PATH: string = `http://3.133.94.195`;
  private USER_ID: string = localStorage.getItem('intelli-user');

  constructor(private http: HttpClient) {}

  getRecipeImagesPath(): string {
    return `${this.AUTH_PATH}/recipe-images`;
  }

  async getAllRecipes(): Promise<Recipe[]> {
    const url = `${this.AUTH_PATH}/users/${this.USER_ID}/recipes`;
    return this.http.get(url).toPromise().then((recipes: Recipe[]) => {
      return recipes;
    });
  }

  async getRecipe(recipeId: string): Promise<Recipe> {
    const url = `${this.AUTH_PATH}/users/${this.USER_ID}/recipes/${recipeId}`;
    return this.http.get(url).toPromise().then((recipe: Recipe) => {
      return recipe;
    });
  }

  async createRecipe(recipe: Recipe): Promise<Recipe> {
    const url = `${this.AUTH_PATH}/users/${this.USER_ID}/recipes`;
    return this.http.post(url, recipe).toPromise().then((createdRecipe: Recipe) => {
      return createdRecipe;
    });
  }

  async updateRecipe(recipeId: string, recipe: Recipe): Promise<Recipe> {
    const url = `${this.AUTH_PATH}/users/${this.USER_ID}/recipes/${recipeId}`;
    return this.http.put(url, recipe).toPromise().then((updatedRecipe: Recipe) => {
      return updatedRecipe;
    });
  }

  async deleteRecipe(recipeId: string): Promise<unknown> {
    const url = `${this.AUTH_PATH}/users/${this.USER_ID}/recipes/${recipeId}`;
    return this.http.delete(url).toPromise();
  }

  async uploadImageToRecipe(recipeId: string, image: any): Promise<any> {
    const url = `${this.AUTH_PATH}/users/${this.USER_ID}/recipes/${recipeId}/images`;
    let formData: FormData = new FormData();
    formData.append('file', image);
    return this.http.post(url, formData).toPromise();
  }

}