import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {Recipe} from '../recipes.model';
import { RecipesService} from '../recipes.service';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})

export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] ;
  souscription: Subscription;
  
  constructor(private recipesService: RecipesService,private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.souscription = this.recipesService.recipeChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
    this.recipes = this.recipesService.getRecipe();
  }
  onNewRecipe()
  { 
    this.router.navigate(['new'], { relativeTo: this.route});
  }

  ngOnDestroy() {
    this.souscription.unsubscribe();
  }
 
}
