import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {OrderShippingDto} from "../model/OrderShippingDto.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ShippingService {

    private API = environment.apiUrlShipping

    private _createDialog!: boolean;
    private _editDialog!: boolean;
    private _viewDialog!: boolean;
    private _selectedOrderShipping: OrderShippingDto = new OrderShippingDto();
    private _orderShippings: Array<OrderShippingDto> = new Array<OrderShippingDto>();
    private _orderShipping: OrderShippingDto = new OrderShippingDto();
    private _searchOrderShipping: OrderShippingDto = new OrderShippingDto();
    private _errorMessages: Array<string> = new Array<string>();


    constructor(private http: HttpClient) {
    }

    public findAll() {
        return this.http.get<Array<any>>(this.API);
    }

    public save(orderShippings: OrderShippingDto): Observable<OrderShippingDto> {
        return this.http.post<OrderShippingDto>(this.API, orderShippings);
    }

    delete(orderShipping: OrderShippingDto) {
        return this.http.delete(this.API + '/' + orderShipping.id, { responseType: 'text' });
    }


    public edit(orderShippings: OrderShippingDto): Observable<OrderShippingDto> {
        return this.http.put<OrderShippingDto>(this.API + "/" + orderShippings.deliveryPerson.id + '/' + orderShippings.id,orderShippings);
    }


    public findByCriteria(orderShippings: OrderShippingDto): Observable<Array<OrderShippingDto>> {
        return this.http.post<Array<OrderShippingDto>>(this.API + 'search', orderShippings);
    }

    public findById(orderShippings: OrderShippingDto): Observable<any> {
        return this.http.get<any>(this.API + '/' + orderShippings.id);
    }


    get orderShippings(): Array<OrderShippingDto> {
        return this._orderShippings;
    }

    set orderShippings(value: Array<OrderShippingDto>) {
        this._orderShippings = value;
    }

    get orderShipping(): OrderShippingDto {
        return this._orderShipping;
    }

    set orderShipping(value: OrderShippingDto) {
        this._orderShipping = value;
    }

    get searchOrderShipping(): OrderShippingDto {
        return this._searchOrderShipping;
    }

    set searchOrderShipping(value: OrderShippingDto) {
        this._searchOrderShipping = value;
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


    get selectedOrderShipping(): OrderShippingDto {
        if (this._selectedOrderShipping == null) {
            this._selectedOrderShipping = new OrderShippingDto();
        }
        return this._selectedOrderShipping;
    }

    set selectedOrderShipping(value: OrderShippingDto) {
        this._selectedOrderShipping = value;
    }


    get errorMessages(): Array<string> {
        return this._errorMessages;
    }

    set errorMessages(value: Array<string>) {
        this._errorMessages = value;
    }
}
