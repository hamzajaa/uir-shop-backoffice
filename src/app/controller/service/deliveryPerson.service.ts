import {environment} from "../../../environments/environment";
import {DeliveryPersonDto} from "../model/DeliveryPersonDto.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class DeliveryPersonService {

    private API = environment.apiUrlDelivryPerson

    private _createDialog!: boolean;
    private _editDialog!: boolean;
    private _viewDialog!: boolean;
    private _selectedDeliveryPerson: DeliveryPersonDto = new DeliveryPersonDto();
    private _selectedDeliveryPersons: Array<DeliveryPersonDto> = new Array<DeliveryPersonDto>();
    private _deliveryPersons: Array<DeliveryPersonDto> = new Array<DeliveryPersonDto>();
    private _deliveryPerson: DeliveryPersonDto = new DeliveryPersonDto();
    private _searchDeliveryPerson: DeliveryPersonDto = new DeliveryPersonDto();
    private _errorMessages: Array<string> = new Array<string>();


    constructor(private http: HttpClient) {
    }

    public findAll() {
        return this.http.get<Array<any>>(this.API);
    }

    public save(DeliveryPerson: DeliveryPersonDto): Observable<DeliveryPersonDto> {
        return this.http.post<DeliveryPersonDto>(this.API + 'all', DeliveryPerson);
    }

    delete(DeliveryPerson: DeliveryPersonDto) {
        return this.http.delete<number>(this.API + '/' + DeliveryPerson.id);
    }


    public edit(deliveryPerson: DeliveryPersonDto): Observable<DeliveryPersonDto> {
        return this.http.put<DeliveryPersonDto>(this.API + '/' + deliveryPerson.id, deliveryPerson);
    }


    public findByCriteria(deliveryPerson: DeliveryPersonDto): Observable<Array<DeliveryPersonDto>> {
        return this.http.post<Array<DeliveryPersonDto>>(this.API + 'search', deliveryPerson);
    }

    public findById(deliveryPerson: DeliveryPersonDto): Observable<DeliveryPersonDto> {
        return this.http.get<DeliveryPersonDto>(this.API + deliveryPerson.id);
    }


    get deliveryPersons(): Array<DeliveryPersonDto> {
        return this._deliveryPersons;
    }

    set deliveryPersons(value: Array<DeliveryPersonDto>) {
        this._deliveryPersons = value;
    }

    get deliveryPerson(): DeliveryPersonDto {
        return this._deliveryPerson;
    }

    set deliveryPerson(value: DeliveryPersonDto) {
        this._deliveryPerson = value;
    }

    get searchDeliveryPerson(): DeliveryPersonDto {
        return this._searchDeliveryPerson;
    }

    set searchDeliveryPerson(value: DeliveryPersonDto) {
        this._searchDeliveryPerson = value;
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


    get selectedDeliveryPerson(): DeliveryPersonDto {
        if (this._selectedDeliveryPerson == null) {
            this._selectedDeliveryPerson = new DeliveryPersonDto();
        }
        return this._selectedDeliveryPerson;
    }

    set selectedDeliveryPerson(value: DeliveryPersonDto) {
        this._selectedDeliveryPerson = value;
    }


    get errorMessages(): Array<string> {
        return this._errorMessages;
    }

    set errorMessages(value: Array<string>) {
        this._errorMessages = value;
    }

    get selectedDeliveryPersons(): Array<DeliveryPersonDto> {
        return this._selectedDeliveryPersons;
    }

    set selectedDeliveryPersons(value: Array<DeliveryPersonDto>) {
        this._selectedDeliveryPersons = value;
    }

}
