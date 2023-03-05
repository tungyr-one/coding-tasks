import { CategoryService } from './../_services/category.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../_models/Category';
import { DocService } from '../_services/doc.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit{
  newCategoryForm: FormGroup;
  Categories:Category[] = [];
  isChecked:boolean = true;
  prefix = "-- ";

  constructor(private docService:DocService,
    private categoryService:CategoryService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.loadCategories();
    this.newCategoryForm = this.fb.group({
      categoryName: ['!exampleCat', [Validators.required]],
      subcategoryNameOne: ['!exsubcat1'],
      subcategoryNameTwo: ['!exsubcat2'],
      subcategoryNameThree: ['!exsubcat3'],
    });
  }

  onSubmit(form: FormGroup) {
    const values = {...this.newCategoryForm.value};
    let categoryChildren:Category[] = [
      {name:this.newCategoryForm.get('subcategoryNameOne')?.value},
      {name:this.newCategoryForm.get('subcategoryNameTwo')?.value},
      {name:this.newCategoryForm.get('subcategoryNameThree')?.value},
    ];

    if(this.newCategoryForm.get('categoryName')?.value.substring(0,3) == this.prefix)
    {
      this.toastr.warning("Name of category can't start from '--' sign!", 'Achtung!');
      return;
    }

    categoryChildren.forEach(child => {
      if(child.name.substring(0,3) == this.prefix)
      this.toastr.error("Name of category can't start from '--' sign!", 'Achtung!');
      return;
    });

    let newCategory:Category = {
      name: this.newCategoryForm.get('categoryName')?.value,
      children:categoryChildren
    }

    this.categoryService.createCategory(newCategory).subscribe({
      next: () => {
        this.router.navigateByUrl('');
      },
    });

  }

  loadCategories(){
    this.categoryService.getCategories().subscribe({
      next: response => {
          this.Categories = response;
      }
    })
  }

  cancel(){
    this.router.navigateByUrl('');
  }
}
