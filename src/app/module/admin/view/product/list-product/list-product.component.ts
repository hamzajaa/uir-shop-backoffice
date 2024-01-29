import {Component} from '@angular/core';
import {ProduitDto} from "../../../../../controller/model/ProduitDto.model";
import {ConfirmationService, MenuItem, MessageService} from "primeng/api";
import {ProductService} from "../../../../../controller/service/product.service";
import {CategoryDTO} from "../../../../../controller/model/CategoryDTO.model";
import {CategoryService} from "../../../../../controller/service/category.service";
import {SupplierDTO} from "../../../../../controller/model/SupplierDTO.model";
import {SupplierService} from "../../../../../controller/service/supplier.service";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {saveAs} from 'file-saver';


@Component({
    selector: 'app-list-product',
    templateUrl: './list-product.component.html',
    styleUrls: ['./list-product.component.css']
})
export class ListProductComponent {

    findByCriteriaShow: boolean = false;

    // authors!: Array<AuthorDto>;
    // deliveryPersons!: Array<CategoryDTO>;

    selectedProduits!: ProduitDto[] | null;

    submitted: boolean = false;

    showDialog = false;
    selectedImage: string | undefined;

    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    fileName = 'Produits';

    constructor(private produitService: ProductService,
                private categoryService: CategoryService,
                private supplierService: SupplierService,
                private messageService: MessageService,
                private confirmationService: ConfirmationService) {
    }

    ngOnInit() {
        this.loadProduits();
        this.loadCategories()
        this.loadSuppliers()
        this.initExport();
        this.initCol();
        this.prepareColumnExport();
    }


    private initCol() {
        this.cols = [
            {field: 'reference', header: 'Reference'},
            {field: 'name', header: 'Nom Produit'},
            {field: 'prixProduct', header: 'Prix Produit'},
            {field: '(e.category)?.nomCategory', header: 'Categorie'},
            {field: '(e.supplier)?.nomSupplier', header: 'Fourniseur'},
        ];
    }

    initExport(): void {
        this.excelPdfButons = [
            {
                label: 'XLS', icon: 'pi pi-file-excel', command: () => {
                    this.exportExcel();
                }
            },
            {
                label: 'PDF', icon: 'pi pi-file-pdf', command: () => {
                    this.exportPdf();
                }
            }
        ];
    }

    exportExcel(): void {
        import('xlsx').then(async xlsx => {
            this.prepareColumnExport();
            const worksheet = xlsx.utils.json_to_sheet(this.exportData);
            const workbook = {Sheets: {'data': worksheet}, SheetNames: ['data']};
            const excelBuffer: any = xlsx.write(workbook, {bookType: 'xlsx', type: 'array'});
            this.saveAsExcelFile(excelBuffer, this.fileName);
        });
    }

    saveAsExcelFile(buffer: any, fileName: string): void {
        import('file-saver').then(FileSaver => {
            const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
            const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
            saveAs(data, fileName + '.xlsx');
        });
    }

    exportPdf(): void {
        this.prepareColumnExport();
        const doc = new jsPDF();
        autoTable(doc, {
            columns: [
                {header: 'Reference', dataKey: 'Reference'},
                {header: 'Nom Produit', dataKey: 'Nom Produit'},
                {header: 'Prix', dataKey: 'Prix'},
                {header: 'Categorie', dataKey: 'Categorie'},
                {header: 'Fourniseur', dataKey: 'Fourniseur'},
            ],
            body: this.exportData, styles: {fontSize: 5}
        });
        doc.save(this.fileName + '.pdf');
    }

    prepareColumnExport(): void {
        this.exportData = this.produits.map(e => {
            return {
                'Reference': e.reference,
                'Nom Produit': e.name,
                'Prix': e.prixProduct,
                'Categorie': e.category.nomCategory,
                'Fourniseur': e.supplier.nomSupplier,
            };
        });
    }


    showImageDialog(imageUrl: string) {
        this.selectedImage = imageUrl;
        this.showDialog = true;
    }

    closeImageDialog() {
        this.showDialog = false;
    }

    openNew() {
        this.selectedProduit = new ProduitDto();
        this.submitted = false;
        this.createDialog = true;
    }

    public loadProduits() {
        this.produitService.findAll().subscribe(data => {
            this.produits = data;
            this.produits.forEach(p => {
                var product = data.find(d => d.idProduct === p.idProduct);
                p.name = product.nomProduct;
            })
        });
    }

    public loadSuppliers() {
        this.supplierService.findAll().subscribe(data => {
            this.suppliers = data;
        });
    }


    private loadCategories() {
        this.categoryService.findAll().subscribe(data => this.categories = data);
    }

    public convertFromStringToObject(value: string) {
        return JSON.parse(value);
    }

    deleteSelectedProduits() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected produits?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.produits = this.produits.filter((val) => !this.selectedProduits?.includes(val));
                this.selectedProduits = null;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Produits Deleted',
                    life: 3000
                });
            }
        });
    }

    editProduit(produit: ProduitDto) {
        this.produitService.findById(produit).subscribe(produit => {
            this.produit = produit;
            this.produit.name = produit.nomProduct
            this.editDialog = true;

        })
    }

    public deleteProduit(produit: ProduitDto) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + produit.name + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.produitService.delete(produit).subscribe({
                    next: (number) => {

                        this.produits = this.produits.filter((b) => b.idProduct !== produit.idProduct);
                        this.produit = new ProduitDto();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Produit Deleted',
                            life: 3000
                        });

                    },
                    error: (err) => {
                        console.log(err)
                    }
                });
            }
        });
    }

    viewProduit(produit: ProduitDto) {
        this.produitService.findById(produit).subscribe(produit => {
            this.produit = produit;
            this.viewDialog = true;
        })
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

    get searchProduit(): ProduitDto {
        return this.produitService.searchProduit;
    }

    set searchProduit(value: ProduitDto) {
        this.produitService.searchProduit = value;
    }

    get createDialog() {
        return this.produitService.createDialog
    }

    set createDialog(value: boolean) {
        this.produitService.createDialog = value
    }

    get editDialog() {
        return this.produitService.editDialog
    }

    set editDialog(value: boolean) {
        this.produitService.editDialog = value
    }

    get viewDialog() {
        return this.produitService.viewDialog
    }

    set viewDialog(value: boolean) {
        this.produitService.viewDialog = value
    }

    get selectedProduit(): ProduitDto {
        return this.produitService.selectedProduit;
    }

    set selectedProduit(value: ProduitDto) {
        this.produitService.selectedProduit = value;
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
