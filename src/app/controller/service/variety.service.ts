import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {VarietyDto} from "../model/VarietyDto.model";

@Injectable({
    providedIn: 'root'
})
export class VarietyService {


    private API = environment.apiUrlVariety

    private _createDialog!: boolean;
    private _editDialog!: boolean;
    private _viewDialog!: boolean;
    private _selectedVariety: VarietyDto = new VarietyDto();
    private _selectedVarieties: Array<VarietyDto> = new Array<VarietyDto>();
    private _varieties: Array<VarietyDto> = new Array<VarietyDto>();
    private _variety: VarietyDto = new VarietyDto();
    private _searchVariety: VarietyDto = new VarietyDto();
    private _errorMessages: Array<string> = new Array<string>();


    constructor(private http: HttpClient) {
    }

    public findAll() {
        return this.http.get<Array<any>>(this.API);
    }

    public save(variety: VarietyDto): Observable<VarietyDto> {
        return this.http.post<VarietyDto>(this.API, variety);
    }

    delete(variety: VarietyDto) {
        return this.http.delete<number>(this.API + '/' + variety.idVariety);
    }


    public edit(variety: VarietyDto): Observable<VarietyDto> {
        return this.http.put<VarietyDto>(this.API + '/' + variety.idVariety, variety);
    }


    public findByCriteria(variety: VarietyDto): Observable<Array<VarietyDto>> {
        return this.http.post<Array<VarietyDto>>(this.API + 'search', variety);
    }

    public findById(variety: VarietyDto): Observable<VarietyDto> {
        return this.http.get<VarietyDto>(this.API + '/' + variety.idVariety);
    }


    get varieties(): Array<VarietyDto> {
        return this._varieties;
    }

    set varieties(value: Array<VarietyDto>) {
        this._varieties = value;
    }

    get variety(): VarietyDto {
        return this._variety;
    }

    set variety(value: VarietyDto) {
        this._variety = value;
    }

    get searchVariety(): VarietyDto {
        return this._searchVariety;
    }

    set searchVariety(value: VarietyDto) {
        this._searchVariety = value;
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


    get selectedVariety(): VarietyDto {
        if (this._selectedVariety == null) {
            this._selectedVariety = new VarietyDto();
        }
        return this._selectedVariety;
    }

    set selectedVariety(value: VarietyDto) {
        this._selectedVariety = value;
    }

    get selectedVarieties(): Array<VarietyDto> {
        return this._selectedVarieties;
    }

    set selectedVarieties(value: Array<VarietyDto>) {
        this._selectedVarieties = value;
    }

    get errorMessages(): Array<string> {
        return this._errorMessages;
    }

    set errorMessages(value: Array<string>) {
        this._errorMessages = value;
    }
}
