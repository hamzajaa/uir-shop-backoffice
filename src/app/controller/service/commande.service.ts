import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {CommandeDto} from "../model/CommandeDto.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CommandeService {

    private API = environment.apiUrlCommande

    private _createDialog!: boolean;
    private _editDialog!: boolean;
    private _viewDialog!: boolean;
    private _selectedCommande: CommandeDto = new CommandeDto();
    private _commandes: Array<CommandeDto> = new Array<CommandeDto>();
    private _commande: CommandeDto = new CommandeDto();
    private _searchCommande: CommandeDto = new CommandeDto();
    private _errorMessages: Array<string> = new Array<string>();


    constructor(private http: HttpClient) {
    }

    public findAll() {
        return this.http.get<Array<any>>(this.API + 'All');
    }

    public save(commande: CommandeDto): Observable<CommandeDto> {
        return this.http.post<CommandeDto>(this.API, commande);
    }

    delete(commande: CommandeDto) {
        return this.http.delete<number>(this.API + 'Delete/' + commande.id);
    }


    public edit(commande: CommandeDto): Observable<CommandeDto> {
        return this.http.put<CommandeDto>(this.API + 'Update/' + commande.id, commande);
    }


    public findByCriteria(commande: CommandeDto): Observable<Array<CommandeDto>> {
        return this.http.post<Array<CommandeDto>>(this.API + 'search', commande);
    }

    public findById(commande: CommandeDto): Observable<CommandeDto> {
        return this.http.get<CommandeDto>(this.API + 'Commande/' + commande.id);
    }

    public findByIdRef(id: number): Observable<CommandeDto> {
        return this.http.get<CommandeDto>(this.API + 'Commande/' + id);
    }


    get commandes(): Array<CommandeDto> {
        return this._commandes;
    }

    set commandes(value: Array<CommandeDto>) {
        this._commandes = value;
    }

    get commande(): CommandeDto {
        return this._commande;
    }

    set commande(value: CommandeDto) {
        this._commande = value;
    }

    get searchCommande(): CommandeDto {
        return this._searchCommande;
    }

    set searchCommande(value: CommandeDto) {
        this._searchCommande = value;
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


    get selectedCommande(): CommandeDto {
        if (this._selectedCommande == null) {
            this._selectedCommande = new CommandeDto();
        }
        return this._selectedCommande;
    }

    set selectedCommande(value: CommandeDto) {
        this._selectedCommande = value;
    }


    get errorMessages(): Array<string> {
        return this._errorMessages;
    }

    set errorMessages(value: Array<string>) {
        this._errorMessages = value;
    }
}
