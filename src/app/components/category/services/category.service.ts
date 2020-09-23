import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { systemSettings } from '../../../app-config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  form: FormGroup;
  title: string;
  constructor(private http: HttpClient) {
    this.form = new FormGroup({
      Category_Name: new FormControl("",[Validators.required]),
      Category_Description: new FormControl(""),
      Category_IsActive: new FormControl(""),
      
    });
  }

  getCategories() {
    return this.http.get(`${systemSettings.serverURL}/categories/getAll`)
  }
  addCategory(category) {
    console.log("added", category);
    return this.http
      .post(`${systemSettings.serverURL}/categories/addCategory`, {
        Category_Name: category.Category_Name,
        Category_Description: category.Category_Description,
      })
      .pipe(
        map((response: any) => {
          if (response.message == true) return true;
          return false;
        })
      );
      
  }
  updateCategory(updatedCategory,id) {
    console.log("updated", updatedCategory);

   return this.http
      .post(`${systemSettings.serverURL}/categories/editCategoryById`, {
        _id: id,
        Category_Name: updatedCategory.Category_Name,
        Category_Description: updatedCategory.Category_Description,
        Category_IsActive: updatedCategory.Category_IsActive,
        
      })
      .pipe(
        map((response: any) => {
          if (response.message == true) return true;
          return false;
        })
      );
  }
  popualteForm(category) {
    console.log("category", category);
    this.form.setValue({
      Category_Name: category.Category_Name || "",
      Category_Description: category.Category_Description,
      Category_IsActive: category.Category_IsActive || "", 
    });
  }
}
