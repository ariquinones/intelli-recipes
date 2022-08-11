import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FuiFileEvent, FuiFileUploadContainerComponent } from '@ferui/components/forms/file-upload';
import { AuthService } from 'src/app/auth/auth-service';
import { Ingredient, Recipe } from '../models';
import { RecipesService } from '../recipes-service';

@Component({
  selector: 'app-recipe-component',
  templateUrl: './recipe.component.html',
  styleUrls: ['../recipes.scss']
})
export class RecipeComponent {
  
  @ViewChild(FuiFileUploadContainerComponent, { static: false }) fileUpload: FuiFileUploadContainerComponent;

  recipe: Recipe;
  mode: RecipeMode = RecipeMode.VIEW;
  modeType: typeof RecipeMode = RecipeMode;
  file: any;

  constructor(private recipesService: RecipesService,
              private authService: AuthService,
              private activedRoute: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe((params) => {
      const id = params.get('recipeId');
      if (id === "new") {
        this.recipe = {} as Recipe;
        this.mode = RecipeMode.NEW
      } else {
        this.recipesService.getRecipe(id).then((recipe) => {
          this.recipe = recipe;
          this.mode = RecipeMode.VIEW;
        });
      }
    });
  }

  getUser(): string {
    return window?.USER;
  }

  addInstructionToRecipe(): void {
    if (this.recipe.instructions) {
      this.recipe.instructions.push('');
    } else {
      this.recipe.instructions = [''];
    }
  }

  deleteInstructionFromRecipe(index: number): void {
    this.recipe.instructions.splice(index, 1);
  }

  addIngredientToRecipe(): void {
    if (this.recipe.ingredients) {
      this.recipe.ingredients.push({} as Ingredient);
    } else {
      this.recipe.ingredients = [{} as Ingredient];
    }
  }

  deleteIngredientFromRecipe(index: number): void {
    this.recipe.ingredients.splice(index, 1);
  }

  trackByFunc(index: any, item: any): any {
    return index;
  }

  getRecipeImageUrl(): string {
    return `${this.recipesService.getRecipeImagesPath()}/${this.recipe.image}`;
  }

  create() {
    if (this.mode === RecipeMode.EDIT) {
      this.recipesService.updateRecipe(this.recipe.id, this.recipe).then((updatedRecipe) => {
        if (this.file) {
          this.recipesService.uploadImageToRecipe(this.recipe.id, this.file[0]).then(() => {
            this.mode = RecipeMode.VIEW;
          });
        } else {
          this.mode = RecipeMode.VIEW;
        }
      });
    } else {
       this.recipesService.createRecipe(this.recipe).then((recipe) => {
        if (this.file) {
          this.recipesService.uploadImageToRecipe(this.recipe.id, this.file[0]).then(() => {
            this.mode = RecipeMode.VIEW;
          });
        } else {
          this.mode = RecipeMode.VIEW;
        }
       });
    }
  }

  delete() {
    this.recipesService.deleteRecipe(this.recipe.id).then(() => {
      this.router.navigate(['/recipes']);
    });
  }

  uploadFile = (file): void => {
    // console.log('upload file', file);
  }

  cancelFile({ file, index }: FuiFileEvent): void {
    this.fileUpload.removeFile(file, index);
  }

  logout(): void {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }
}

export enum RecipeMode {
  VIEW = 'VIEW',
  EDIT = 'EDIT',
  NEW = 'NEW'
}