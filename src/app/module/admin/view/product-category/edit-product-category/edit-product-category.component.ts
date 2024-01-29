import {Component, OnInit} from '@angular/core';
import {CategoryDTO} from "../../../../../controller/model/CategoryDTO.model";
import {StringUtils} from "../../../../../utils/StringUtils";
import {CategoryService} from "../../../../../controller/service/category.service";
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
  selector: 'app-edit-product-category',
  templateUrl: './edit-product-category.component.html',
  styleUrls: ['./edit-product-category.component.css']
})
export class EditProductCategoryComponent implements OnInit {

  private _validCategoryNomCategory: boolean = true;

  constructor(private categoryService: CategoryService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService
  ) {
  }

  ngOnInit() {
  }

  edit() {
    this.validateForm();
    if (this.errorMessages.length === 0) {
      this.categoryService.edit(this.category).subscribe({
        next: (category) => {
          const index = this.categories.findIndex(c => c.idCategory === category.idCategory);
          this.categories[index] = category;
          this.editDialog = false;
        },
        error: (err) => {
          console.log(err)
        }
      })
    }
  }


  public validateForm() {
    this.errorMessages = new Array<string>();
    this.validateCategoryNomCategory();
  }

  public validateCategoryNomCategory() {
    if (StringUtils.isEmpty(this.category.nomCategory)) {
      this.errorMessages.push('NomCategory not valid')
      this.validCategoryNomCategory = false;
    } else {
      this.validCategoryNomCategory = true;
    }
  }

  hideEditDialog() {
    this.editDialog = false;
  }
  get category(): CategoryDTO {
    return this.categoryService.category;
  }

  set category(value: CategoryDTO) {
    this.categoryService.category = value;
  }

  get categories(): Array<CategoryDTO> {
    return this.categoryService.categories;
  }

  set categories(value: Array<CategoryDTO>) {
    this.categoryService.categories = value;
  }

  get editDialog(): boolean {
    return this.categoryService.editDialog;
  }

  set editDialog(value: boolean) {
    this.categoryService.editDialog = value;
  }

  get selectedCategory(): CategoryDTO {
    return this.categoryService.selectedCategory;
  }

  set selectedCategory(value: CategoryDTO) {
    this.categoryService.selectedCategory = value;
  }

  get errorMessages(): string[] {
    return this.categoryService.errorMessages;
  }

  set errorMessages(value: string[]) {
    this.categoryService.errorMessages = value;
  }

  get validCategoryNomCategory(): boolean {
    return this._validCategoryNomCategory;
  }

  set validCategoryNomCategory(value: boolean) {
    this._validCategoryNomCategory = value;
  }

}
