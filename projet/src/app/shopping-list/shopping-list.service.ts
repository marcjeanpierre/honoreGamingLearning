import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredients.model';
@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples',5),
    new Ingredient('Tomatoes',10)
  ];

  constructor() { }
  getIngredients(){
    return this.ingredients.slice();
  }
  
  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(newIngredient: Ingredient){
    this.ingredients.push(newIngredient);
    this.ingredientChanged.next(this.ingredients.slice());
    
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  updateIngrediant(index: number, newIngredient: Ingredient) {
      this.ingredients[index] = newIngredient;
      this.ingredientChanged.next(this.ingredients.slice());
  }
  
  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientChanged.next(this.ingredients.slice());
  }
}