import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {ProduitDto} from "../model/ProduitDto.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private API = environment.apiUrlProduit

    private _createDialog!: boolean;
    private _editDialog!: boolean;
    private _viewDialog!: boolean;
    private _selectedProduit: ProduitDto = new ProduitDto();
    private _produits: Array<ProduitDto> = new Array<ProduitDto>();
    private _produit: ProduitDto = new ProduitDto();
    private _searchProduit: ProduitDto = new ProduitDto();
    private _errorMessages: Array<string> = new Array<string>();


    constructor(private http: HttpClient) {
    }

    public findAll() {
        return this.http.get<Array<any>>(this.API);
    }

    public save(produit: ProduitDto): Observable<any> {
        return this.http.post<any>(this.API, {
            reference: produit.reference,
            name: produit.name,
            description: produit.description,
            prixProduct: produit.prixProduct,
            categoryID: produit.category.idCategory,
            supplierID: produit.supplier.idSupplier,
            varietyIDs:[],
            imgs:produit.imgs
        });
    }

    delete(produit: ProduitDto) {
        return this.http.delete<number>(this.API + '/' + produit.idProduct);
    }


    public edit(produit: ProduitDto): Observable<any> {
        return this.http.put<any>(this.API + "/" + produit.idProduct, {
            idProduct: produit.idProduct,
            reference: produit.reference,
            name: produit.name,
            description: produit.description,
            prixProduct: produit.prixProduct,
            categoryID: produit.category.idCategory,
            supplierID: produit.supplier.idSupplier,
            varietyIDs:[],
            imgs:[]
        });
    }


    public findByCriteria(produit: ProduitDto): Observable<Array<ProduitDto>> {
        return this.http.post<Array<ProduitDto>>(this.API + 'search', produit);
    }

    public findById(produit: ProduitDto): Observable<any> {
        return this.http.get<any>(this.API + '/' + produit.idProduct);
    }


    get produits(): Array<ProduitDto> {
        return this._produits;
    }

    set produits(value: Array<ProduitDto>) {
        this._produits = value;
    }

    get produit(): ProduitDto {
        return this._produit;
    }

    set produit(value: ProduitDto) {
        this._produit = value;
    }

    get searchProduit(): ProduitDto {
        return this._searchProduit;
    }

    set searchProduit(value: ProduitDto) {
        this._searchProduit = value;
    }

    get createDialog(): boolean {
        return this._createDialog;
    }

    set createDialog(value: boolean) {
        this._createDialog = value;
    }


    get editDialog(): boolean {
        return this._editDialog;
    }

    set editDialog(value: boolean) {
        this._editDialog = value;
    }


    get viewDialog(): boolean {
        return this._viewDialog;
    }

    set viewDialog(value: boolean) {
        this._viewDialog = value;
    }


    get selectedProduit(): ProduitDto {
        if (this._selectedProduit == null) {
            this._selectedProduit = new ProduitDto();
        }
        return this._selectedProduit;
    }

    set selectedProduit(value: ProduitDto) {
        this._selectedProduit = value;
    }


    get errorMessages(): Array<string> {
        return this._errorMessages;
    }

    set errorMessages(value: Array<string>) {
        this._errorMessages = value;
    }
}
