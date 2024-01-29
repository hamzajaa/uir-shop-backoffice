import {Component} from '@angular/core';
import {ProductService} from "../../../../../controller/service/product.service";
import {CategoryService} from "../../../../../controller/service/category.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {ProduitDto} from "../../../../../controller/model/ProduitDto.model";
import {StringUtils} from "../../../../../utils/StringUtils";
import {CategoryDTO} from "../../../../../controller/model/CategoryDTO.model";
import {SupplierDTO} from "../../../../../controller/model/SupplierDTO.model";
import {SupplierService} from "../../../../../controller/service/supplier.service";

@Component({
    selector: 'app-edit-product',
    templateUrl: './edit-product.component.html',
    styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent {

    private _submitted!: boolean;

    private _validProduitReference: boolean = true;
    private _validProduitNomProduit: boolean = true;
    private _validProduitDescription: boolean = true;
    private _validProduitPrixProduit: boolean = true;

    constructor(private produitService: ProductService,
                private categoryService: CategoryService,
                private supplierService: SupplierService,
                private confirmationService: ConfirmationService,
                private messageService: MessageService,
    ) {
    }

    ngOnInit(): void {
        this.loadCategories();
        this.loadSuppliers();
    }

    public edit() {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.validateForm()
                if (this.errorMessages.length === 0) {
                    this.produitService.edit(this.produit).subscribe({
                        next: (produit) => {
                            var product = new ProduitDto();
                            product.idProduct = produit.idProduct;
                            product.reference = produit.reference;
                            product.name = produit.name;
                            product.prixProduct = produit.prixProduct;
                            product.description = produit.description;
                            product.imgs = produit.imgs;
                            var category = this.categories.find(c => c.idCategory === produit.categoryID);
                            product.category = category;
                            var supplier = this.suppliers.find(s => s.idSupplier === produit.supplierID);
                            product.supplier = supplier;
                            const myIndex = this.produits.findIndex(p => p.idProduct === produit.idProduct);
                            this.produits[myIndex] = product;
                            this.editDialog = false;
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Success',
                                detail: 'Produit Updated Successfully'
                            });
                        }
                        , error: err => {
                            console.log(err);
                        }
                    })
                } else {
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


    public loadCategories() {
        this.categoryService.findAll().subscribe(data => this.categories = data);
    }
    public loadSuppliers() {
        this.supplierService.findAll().subscribe(data => this.suppliers = data);
    }

    public validateForm(): void {
        this.errorMessages = new Array<string>();
        this.validateProduitReference();
        this.validateProduitDescription();
        this.validateProduitPrixProduit();
        this.validateProduitNomProduit();
    }

    public validateProduitReference() {
        if (StringUtils.isEmpty(this.produit.reference)) {
            this.errorMessages.push('Reference not valid')
            this.validProduitReference = false;
        } else {
            this.validProduitReference = true;
        }
    }

    public validateProduitDescription() {
        if (StringUtils.isEmpty(this.produit.description)) {
            this.errorMessages.push('Description not valid')
            this.validProduitDescription = false;
        } else {
            this.validProduitDescription = true;
        }
    }

    public validateProduitPrixProduit() {
        if (StringUtils.isEmpty(this.produit.prixProduct)) {
            this.errorMessages.push('Prix Product not valid')
            this.validProduitPrixProduit = false;
        } else {
            this.validProduitPrixProduit = true;
        }
    }

    public validateProduitNomProduit() {
        if (StringUtils.isEmpty(this.produit.name)) {
            this.errorMessages.push('Nom Product not valid')
            this.validProduitNomProduit = false;
        } else {
            this.validProduitNomProduit = true;
        }
    }


    openCreateCategory(category: string) {
        this.selectedCategory = new CategoryDTO();
        this.createCategoryDialog = true;
    }

    openCreateSupplier(supplier: string) {
        this.selectedSupplier = new SupplierDTO();
        this.createSupplierDialog = true;
    }

    hideCreateDialog() {
        this.editDialog = false;
    }


    get produits(): Array<ProduitDto> {
        return this.produitService.produits;
    }

    set produits(value: Array<ProduitDto>) {
        this.produitService.produits = value;
    }

    get produit(): ProduitDto {
        return this.produitService.produit;
    }

    set produit(value: ProduitDto) {
        this.produitService.produit = value;
    }

    get errorMessages(): string[] {
        return this.produitService.errorMessages;
    }

    set errorMessages(value: string[]) {
        this.produitService.errorMessages = value;
    }

    get editDialog() {
        return this.produitService.editDialog
    }

    set editDialog(value: boolean) {
        this.produitService.editDialog = value
    }

    get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }

    get validProduitReference(): boolean {
        return this._validProduitReference;
    }

    set validProduitReference(value: boolean) {
        this._validProduitReference = value;
    }

    get validProduitDescription(): boolean {
        return this._validProduitDescription;
    }

    set validProduitDescription(value: boolean) {
        this._validProduitDescription = value;
    }

    get validProduitPrixProduit(): boolean {
        return this._validProduitPrixProduit;
    }

    set validProduitNomProduit(value: boolean) {
        this._validProduitNomProduit = value;
    }

    get validProduitNomProduit(): boolean {
        return this._validProduitNomProduit;
    }

    set validProduitPrixProduit(value: boolean) {
        this._validProduitPrixProduit = value;
    }


    get createCategoryDialog(): boolean {
        return this.categoryService.createDialog;
    }

    set createCategoryDialog(value: boolean) {
        this.categoryService.createDialog = value;
    }

    get createSupplierDialog(): boolean {
        return this.supplierService.createDialog;
    }

    set createSupplierDialog(value: boolean) {
        this.supplierService.createDialog = value;
    }

    get selectedProduit(): ProduitDto {
        return this.produitService.selectedProduit;
    }

    set selectedProduit(value: ProduitDto) {
        this.produitService.selectedProduit = value;
    }

    get selectedCategory(): CategoryDTO {
        return this.categoryService.selectedCategory;
    }

    set selectedCategory(value: CategoryDTO) {
        this.categoryService.selectedCategory = value;
    }

    get selectedSupplier(): SupplierDTO {
        return this.supplierService.selectedSupplier;
    }

    set selectedSupplier(value: SupplierDTO) {
        this.supplierService.selectedSupplier = value;
    }

    get categories(): Array<CategoryDTO> {
        return this.categoryService.categories;
    }

    set categories(value: Array<CategoryDTO>) {
        this.categoryService.categories = value;
    }

    get suppliers(): Array<SupplierDTO> {
        return this.supplierService.suppliers;
    }

    set suppliers(value: Array<SupplierDTO>) {
        this.supplierService.suppliers = value;
    }

}
