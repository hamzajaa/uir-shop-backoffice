import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../../../../controller/service/category.service";
import {CategoryDTO} from "../../../../../controller/model/CategoryDTO.model";

@Component({
  selector: 'app-view-product-category',
  templateUrl: './view-product-category.component.html',
  styleUrls: ['./view-product-category.component.css']
})
export class ViewProductCategoryComponent implements OnInit {

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit() {
  }

  get category(): CategoryDTO {
    return this.categoryService.category;
  }

  set category(value: CategoryDTO) {
    this.categoryService.category = value;
  }

  get viewDialog(): boolean {
    return this.categoryService.viewDialog;
  }

  set viewDialog(value: boolean) {
    this.categoryService.viewDialog = value;
  }
}
