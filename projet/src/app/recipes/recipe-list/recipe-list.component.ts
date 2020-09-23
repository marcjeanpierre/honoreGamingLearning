import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Recipe} from '../recipes.model';
import { RecipesService} from '../recipes.service';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})

export class RecipeListComponent implements OnInit {
  recipes: Recipe[] ;
  constructor(private recipesService: RecipesService,private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.recipes = this.recipesService.getRecipe();
  }
  onNewRecipe()
  { 
    this.router.navigate(['new'], { relativeTo: this.route});
  }
 
}
