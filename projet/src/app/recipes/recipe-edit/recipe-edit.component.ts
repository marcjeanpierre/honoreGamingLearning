import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
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
    if (this.editMode) {
      const recipe = this.recipesSerive.getRecipes(this.id);
       recipeName = recipe.name;
       recipeImageUrl = recipe.imagePath;
       recipeDescription = recipe.description;
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'imagePath': new FormControl(recipeImageUrl),
      'description': new FormControl(recipeDescription)
    });
  }

  onSubmit() {
    console.log(this.recipeForm);
  }
}
