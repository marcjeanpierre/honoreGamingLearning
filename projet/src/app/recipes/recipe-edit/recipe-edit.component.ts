import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormControlName, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { cwd } from 'process';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipesSerive: RecipesService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => 
      {this.id = +params['id'];
      this.editMode = params['id'] != null; 
      this.initForm();
      });
  }

  private initForm() {
    
    let recipeName = '';
    let recipeImageUrl = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipesSerive.getRecipes(this.id);
       recipeName = recipe.name;
       recipeImageUrl = recipe.imagePath;
       recipeDescription = recipe.description;
      if ( recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name),
              'amount': new FormControl(ingredient.amount)
            })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'imagePath': new FormControl(recipeImageUrl),
      'description': new FormControl(recipeDescription),
      'ingredients': recipeIngredients
    });
  }

  get controls() {
    console.log((<FormArray>this.recipeForm.get('ingredients')).controls );
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onSubmit() {
    console.log(this.recipeForm);
  }
}
