import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SupplierDTO} from "../model/SupplierDTO.model";

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private API = environment.apiUrlSupplier

  private _createDialog!: boolean;
  private _editDialog!: boolean;
  private _viewDialog!: boolean;
  private _selectedSupplier: SupplierDTO ;
  private _suppliers: Array<SupplierDTO> = new Array<SupplierDTO>();
  private _supplier: SupplierDTO = new SupplierDTO();
  private _searchSupplier: SupplierDTO = new SupplierDTO();
  private _errorMessages: Array<string> = new Array<string>();


  constructor(private http: HttpClient) {
  }

  public findAll() {
    return this.http.get<Array<any>>(this.API);
  }

  public save(Supplier: SupplierDTO): Observable<SupplierDTO> {
    return this.http.post<SupplierDTO>(this.API, Supplier);
  }

  delete(Supplier: SupplierDTO) {
    return this.http.delete<number>(this.API + 'Delete/' + Supplier.idSupplier);
  }


  public edit(Supplier: SupplierDTO): Observable<SupplierDTO> {
    return this.http.put<SupplierDTO>(this.API, Supplier);
  }


  public findByCriteria(Supplier: SupplierDTO): Observable<Array<SupplierDTO>> {
    return this.http.post<Array<SupplierDTO>>(this.API + 'search', Supplier);
  }

  public findById(Supplier: SupplierDTO): Observable<SupplierDTO> {
    return this.http.get<SupplierDTO>(this.API + '/' + Supplier.idSupplier);
  }

  public findByIdS(id: number): Observable<SupplierDTO> {
    return this.http.get<SupplierDTO>(this.API + '/' + id);
  }


  get suppliers(): Array<SupplierDTO> {
    return this._suppliers;
  }

  set suppliers(value: Array<SupplierDTO>) {
    this._suppliers = value;
  }

  get supplier(): SupplierDTO {
    if (this._supplier == null){
      return new SupplierDTO();
    }
    return this._supplier;
  }

  set supplier(value: SupplierDTO) {
    this._supplier = value;
  }

  get searchSupplier(): SupplierDTO {
    return this._searchSupplier;
  }

  set searchSupplier(value: SupplierDTO) {
    this._searchSupplier = value;
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


  get selectedSupplier(): SupplierDTO {
    if (this._selectedSupplier == null) {
      this._selectedSupplier = new SupplierDTO();
    }
    return this._selectedSupplier;
  }

  set selectedSupplier(value: SupplierDTO) {
    this._selectedSupplier = value;
  }


  get errorMessages(): Array<string> {
    return this._errorMessages;
  }

  set errorMessages(value: Array<string>) {
    this._errorMessages = value;
  }
}
