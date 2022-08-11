import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login-component/login.component';
import { SignupComponent } from './auth/signup-component/signup-component';
import { AuthService } from './auth/auth-service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipesService } from './recipes/recipes-service';
import { RecipesInterceptorService } from './recipes/recipes-interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecipeComponent } from './recipes/recipe-component/recipe.component';
import { FuiDatagridModule } from '@ferui/components/datagrid';
import { FuiWidgetModule } from '@ferui/components/widget';
import { FuiDropdownModule } from '@ferui/components/dropdown';
import { FuiInputModule } from '@ferui/components/forms/input';
import { FuiTextareaModule } from '@ferui/components/forms/textarea';
import { FuiNumberModule } from '@ferui/components/forms/number';
import { FuiFileUploadModule } from '@ferui/components/forms/file-upload';
import { FuiTooltipModule } from '@ferui/components/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    RecipesComponent,
    RecipeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FuiWidgetModule,
    FuiDatagridModule,
    FuiDropdownModule,
    FuiInputModule,
    FuiTextareaModule,
    FuiNumberModule,
    FuiFileUploadModule,
    FuiTooltipModule
  ],
  providers: [
    AuthService,
    RecipesService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RecipesInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
