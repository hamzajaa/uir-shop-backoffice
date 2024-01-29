import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../../../../controller/service/category.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {CategoryDTO} from "../../../../../controller/model/CategoryDTO.model";
import {StringUtils} from "../../../../../utils/StringUtils";

@Component({
    selector: 'app-list-product-category',
    templateUrl: './list-product-category.component.html',
    styleUrls: ['./list-product-category.component.css']
})
export class ListProductCategoryComponent implements OnInit {
    findByCriteriaShow: boolean = false;

    constructor(private categoryService: CategoryService,
                private confirmationService: ConfirmationService,
                private messageService: MessageService) {
    }

    ngOnInit(): void {
        this.loadCategories();
    }


    deleteSelectedCategories() {

    }

    editCategory(category: CategoryDTO) {
        this.categoryService.findById(category).subscribe(category => {
            this.category = category;
            this.editDialog = true;
        })

    }

    public deleteCategory(category: CategoryDTO) {
        this.confirmationService.confirm({
            message: 'Are you sure to delete this category ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.categoryService.delete(category).subscribe(number => {

                    const position = this.categories.indexOf(category);
                    position > -1 ? this.categories.splice(position, 1) : false;
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Category deleted successfully',
                        life: 3000
                    })

                }, error => {
                    console.log(error);
                })
            }
        })
    }

    viewCategory(category: CategoryDTO) {
        this.categoryService.findById(category).subscribe(category => {
            this.category = category;
            this.viewDialog = true;
        })
    }

    loadCategories() {
        this.categoryService.findAll().subscribe(data => this.categories = data)
    }

    openNew() {
        this.selectedCategory = new CategoryDTO();
        this.createDialog = true;
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

    get createDialog(): boolean {
        return this.categoryService.createDialog;
    }

    set createDialog(value: boolean) {
        this.categoryService.createDialog = value;
    }

    get editDialog(): boolean {
        return this.categoryService.editDialog;
    }

    set editDialog(value: boolean) {
        this.categoryService.editDialog = value;
    }

    get viewDialog(): boolean {
        return this.categoryService.viewDialog;
    }

    set viewDialog(value: boolean) {
        this.categoryService.viewDialog = value;
    }

    get selectedCategory(): CategoryDTO {
        return this.categoryService.selectedCategory;
    }

    set selectedCategory(value: CategoryDTO) {
        this.categoryService.selectedCategory = value;
    }

    get searchCategory(): CategoryDTO {
        return this.categoryService.searchCategory;
    }

    set searchCategory(value: CategoryDTO) {
        this.categoryService.searchCategory = value;
    }

    get selectedCategories(): Array<CategoryDTO> {
        return this.categoryService.selectedCategories;
    }

    set selectedCategories(value: Array<CategoryDTO>) {
        this.categoryService.categories = value;
    }

}
