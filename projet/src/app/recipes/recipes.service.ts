import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';
import { Recipe } from './recipes.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import { Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  recipeChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe('A test recipe', 
    'A test',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSwaoFOAC_rVC6HZ60N6z88fCon2aM7sJyGVw&usqp=CAU', 
    [new Ingredient('meat', 1)]),
    new Recipe('A test recipe', 
    'A test',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSL0hZMiqeZaAEsSJiohRuOarkERymbEZD8zw&usqp=CAU', 
    [new Ingredient('meat', 2)]),
    new Recipe('A test recipe', 
    'A test',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSwaoFOAC_rVC6HZ60N6z88fCon2aM7sJyGVw&usqp=CAU', 
    [new Ingredient('meat', 3)]),
    new Recipe('A test recipe', 
    'A test',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSL0hZMiqeZaAEsSJiohRuOarkERymbEZD8zw&usqp=CAU', 
    [new Ingredient('meat', 4)])
  ] ;
  constructor(private shoppingListService: ShoppingListService) { }

  getRecipes(index: number){
    return this.recipes[index];
  }

  getRecipe(){
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
      this.shoppingListService.addIngredients(ingredients);
  }
  
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index,1);
    this.recipeChanged.next(this.recipes.slice());
  }

  deletedIngredientsToShoppingList(index: number){
    this.shoppingListService.deleteIngredient(index);
}
} 
