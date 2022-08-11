import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Recipe } from './models';
import { RecipesService } from './recipes-service';
import {
  FuiColumnDefinitions,
  CsvExportParams,
  FuiDatagridBodyCellContext
} from '@ferui/components/datagrid';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth-service';


@Component({
  selector: 'app-recipes-component',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.scss']
})
export class RecipesComponent {

  @ViewChild('idRenderer', { static: true }) idRenderer: TemplateRef<FuiDatagridBodyCellContext>;
  
  columnDefs: FuiColumnDefinitions[];
  defaultColumnDefs: FuiColumnDefinitions = {
    sortable: true,
    filter: true
  };
  itemPerPage = 10;
  showHeaderAndNavigator: boolean;
  exportParams: CsvExportParams = {
    suppressQuotes: false,
    columnSeparator: ','
  };
  recipes: Array<any> = [];

  constructor(private recipesService: RecipesService,
              private authService: AuthService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.columnDefs = [
      { headerName: 'Name', field: 'name', cellRenderer: this.idRenderer },
      { headerName: 'Description', field: 'description' },
      { headerName: 'Price', field: 'price' },
      { headerName: 'Yields', field: 'yield' }
    ];
    this.recipesService.getAllRecipes().then((recipes) => {
      this.recipes = recipes;
    });
  }

  newRecipe(): Promise<boolean> {
    return this.router.navigate(['/recipes/new'], { relativeTo: this.activatedRoute.parent });
  }

  getUser(): string {
    return window?.USER;
  }

  logout(): void {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }

}
