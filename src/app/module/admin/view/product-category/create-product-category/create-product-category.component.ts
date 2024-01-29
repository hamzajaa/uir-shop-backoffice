import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../../../../controller/service/category.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {CategoryDTO} from "../../../../../controller/model/CategoryDTO.model";
import {StringUtils} from "../../../../../utils/StringUtils";

@Component({
    selector: 'app-create-product-category',
    templateUrl: './create-product-category.component.html',
    styleUrls: ['./create-product-category.component.css']
})
export class CreateProductCategoryComponent implements OnInit{

    private _validCategoryNomCategory: boolean = true;

    constructor(private categoryService: CategoryService,
                private confirmationService: ConfirmationService,
                private messageService: MessageService
    ) {
    }

    ngOnInit(): void {
    }

    public save() {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.validateForm()
                console.log(this.errorMessages.length)
                if (this.errorMessages.length === 0) {
                    this.categoryService.save(this.selectedCategory).subscribe({
                        next: (category) => {
                            this.categories.push({...category})
                            this.createDialog = false;
                            this.selectedCategory = new CategoryDTO();
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Success',
                                detail: 'Category Saved Successfully'
                            });

                        }
                        , error: err => {
                            console.log(err);
                        }
                    })
                } else {
                    this.confirmationService.close();
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Errors',
                        detail: 'Please correct the errors on the form'
                    })
                }
            },
            reject: () => {
                this.messageService.add({severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled'});
            }
        })

    }

    public validateForm() {
        this.errorMessages = new Array<string>();
        this.validateCategoryNomCategory();
    }

    public validateCategoryNomCategory() {
        if (StringUtils.isEmpty(this.selectedCategory.nomCategory)) {
            this.errorMessages.push('NomCategory not valid')
            this.validCategoryNomCategory = false;
        } else {
            this.validCategoryNomCategory = true;
        }
    }

    hideCreateDialog() {
        this.createDialog = false;
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
