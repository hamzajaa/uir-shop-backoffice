import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CategoryDTO} from "../model/CategoryDTO.model";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    private API = environment.apiUrlCategory

    private _createDialog!: boolean;
    private _editDialog!: boolean;
    private _viewDialog!: boolean;
    private _selectedCategory: CategoryDTO = new CategoryDTO();
    private _selectedCategories: Array<CategoryDTO> = new Array<CategoryDTO>();
    private _categories: Array<CategoryDTO> = new Array<CategoryDTO>();
    private _category: CategoryDTO = new CategoryDTO();
    private _searchCategory: CategoryDTO = new CategoryDTO();
    private _errorMessages: Array<string> = new Array<string>();


    constructor(private http: HttpClient) {
    }

    public findAll() {
        return this.http.get<Array<any>>(this.API);
    }

    public save(Category: CategoryDTO): Observable<CategoryDTO> {
        return this.http.post<CategoryDTO>(this.API, Category);
    }

    delete(Category: CategoryDTO) {
        return this.http.delete<number>(this.API + '/' + Category.idCategory);
    }


    public edit(category: CategoryDTO): Observable<CategoryDTO> {
        return this.http.put<CategoryDTO>(this.API + '/' + category.idCategory, category);
    }


    public findByCriteria(Category: CategoryDTO): Observable<Array<CategoryDTO>> {
        return this.http.post<Array<CategoryDTO>>(this.API + 'search', Category);
    }

    public findById(Category: CategoryDTO): Observable<CategoryDTO> {
        return this.http.get<CategoryDTO>(this.API + '/' + Category.idCategory);
    }


    get categories(): Array<CategoryDTO> {
        return this._categories;
    }

    set categories(value: Array<CategoryDTO>) {
        this._categories = value;
    }

    get category(): CategoryDTO {
        return this._category;
    }

    set category(value: CategoryDTO) {
        this._category = value;
    }

    get searchCategory(): CategoryDTO {
        return this._searchCategory;
    }

    set searchCategory(value: CategoryDTO) {
        this._searchCategory = value;
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


    get selectedCategory(): CategoryDTO {
        if (this._selectedCategory == null) {
            this._selectedCategory = new CategoryDTO();
        }
        return this._selectedCategory;
    }

    set selectedCategory(value: CategoryDTO) {
        this._selectedCategory = value;
    }


    get errorMessages(): Array<string> {
        return this._errorMessages;
    }

    set errorMessages(value: Array<string>) {
        this._errorMessages = value;
    }

    get selectedCategories(): Array<CategoryDTO> {
        return this._selectedCategories;
    }

    set selectedCategories(value: Array<CategoryDTO>) {
        this._selectedCategories = value;
    }

}
