import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login-component/login.component';
import { SignupComponent } from './auth/signup-component/signup-component';
import { RecipesComponent } from './recipes/recipes.component';
import { AuthGuard } from './guards/auth-guard';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { RecipeComponent } from './recipes/recipe-component/recipe.component';
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'recipes',
    component: RecipesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'recipes/:recipeId',
    component: RecipeComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: '',
    pathMatch: "full",
    redirectTo: 'signup'
    
  },
  {
    path: '**',
    redirectTo: 'signup'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    AuthGuard
  ]
})
export class AppRoutingModule { }
