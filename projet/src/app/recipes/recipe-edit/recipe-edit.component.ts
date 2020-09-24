import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  recipeImg: string;

  constructor(private route: ActivatedRoute, private recipesSerive: RecipesService, private router: Router) { }

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
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount,  [Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)] )
            })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImageUrl, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
    this.recipeImg=recipeImageUrl;
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onSubmit() {
    console.log(this.recipeForm);
    if (this.editMode) {
      this.recipesSerive.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipesSerive.addRecipe(this.recipeForm.value);
    }
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  onCancelRecipe() {
    this.router.navigate(['../']);
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
}
