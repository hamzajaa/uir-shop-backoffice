import {Component} from '@angular/core';
import {CommandeService} from "../../../../../controller/service/commande.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {StringUtils} from "../../../../../utils/StringUtils";
import {CommandeDto} from "../../../../../controller/model/CommandeDto.model";
import {MethodDePaiement} from "../../../../../controller/model/enum/method-de-paiement";
import {EtatPaiement} from "../../../../../controller/model/enum/etat-paiement";
import {EtatLivraison} from "../../../../../controller/model/enum/etat-livraison";


@Component({
    selector: 'app-edit-commande',
    templateUrl: './edit-commande.component.html',
    styleUrls: ['./edit-commande.component.scss']
})
export class EditCommandeComponent {

    private _validCommandeReference: boolean = true;
    private _validCommandeTotalPaye: boolean = true;
    private _validCommandeMethodPayment: boolean = true;
    private _validCommandeEtatPaiement: boolean = true;
    private _validCommandeDeliveryStatus: boolean = true;


    private methodDePaiements: Array<MethodDePaiement>;
    private etatLivraisons: Array<EtatLivraison>;
    private etatPaiements: Array<EtatPaiement>;


    constructor(private commandeService: CommandeService,
                private confirmationService: ConfirmationService,
                private messageService: MessageService) {
    }

    ngOnInit(): void {
        this.methodDePaiements = Object.values(MethodDePaiement);
        this.etatLivraisons = Object.values(EtatLivraison);
        this.etatPaiements = Object.values(EtatPaiement);

    }

    public edit() {
        this.validateForm();
        if (this.errorMessages.length === 0) {
            this.commandeService.edit(this.commande).subscribe({
                next: (commande) => {
                    console.log(commande)
                    const myIndex = this.commandes.findIndex(b => b.id === commande.id);
                    this.commandes[myIndex] = commande;
                    this.editDialog = false;
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Author Updated Successfully'
                    });
                },
                error: (err) => {
                    console.log(err);
                }
            })
        }
    }


    public validateForm(): void {
        this.errorMessages = new Array<string>();
        this.validateCommandeReference();
        this.validateCommandeTotalPaye();
        this.validateCommandeMethodPayment();
        this.validateCommandeEtatPaiement();
        this.validateCommandeDeliveryStatus();
    }

    public validateCommandeReference() {
        if (StringUtils.isEmpty(this.commande.reference)) {
            this.errorMessages.push('Reference not valid')
            this.validCommandeReference = false;
        } else {
            this.validCommandeReference = true;
        }
    }

    public validateCommandeTotalPaye() {
        if (StringUtils.isEmpty(this.commande.totalPaye)) {
            this.errorMessages.push('TotalPaye not valid')
            this.validCommandeTotalPaye = false;
        } else {
            this.validCommandeTotalPaye = true;
        }
    }

    public validateCommandeMethodPayment() {
        if (StringUtils.isEmpty(this.commande.methodDePaiement)) {
            this.errorMessages.push('MethodPayment not valid')
            this.validCommandeMethodPayment = false;
        } else {
            this.validCommandeMethodPayment = true;
        }
    }

    public validateCommandeEtatPaiement() {
        if (StringUtils.isEmpty(this.commande.etatPaiement)) {
            this.errorMessages.push('etatPaiement not valid')
            this.validCommandeEtatPaiement = false;
        } else {
            this.validCommandeEtatPaiement = true;
        }
    }

    public validateCommandeDeliveryStatus() {
        if (StringUtils.isEmpty(this.commande.etatLivraison)) {
            this.errorMessages.push('etatLivraison not valid')
            this.validCommandeDeliveryStatus = false;
        } else {
            this.validCommandeDeliveryStatus = true;
        }
    }


    hideCreateDialog() {
        this.editDialog = false;
    }


    get commande(): CommandeDto {
        return this.commandeService.commande;
    }

    set commande(value: CommandeDto) {
        this.commandeService.commande = value;
    }

    get commandes(): Array<CommandeDto> {
        return this.commandeService.commandes;
    }

    set commandes(value: Array<CommandeDto>) {
        this.commandeService.commandes = value;
    }

    get errorMessages(): string[] {
        return this.commandeService.errorMessages;
    }

    set errorMessages(value: string[]) {
        this.commandeService.errorMessages = value;
    }

    get editDialog() {
        return this.commandeService.editDialog
    }

    set editDialog(value: boolean) {
        this.commandeService.editDialog = value
    }


    get validCommandeReference(): boolean {
        return this._validCommandeReference;
    }

    set validCommandeReference(value: boolean) {
        this._validCommandeReference = value;
    }

    get validCommandeTotalPaye(): boolean {
        return this._validCommandeTotalPaye;
    }

    set validCommandeTotalPaye(value: boolean) {
        this._validCommandeTotalPaye = value;
    }

    get validCommandeMethodPayment(): boolean {
        return this._validCommandeMethodPayment;
    }

    set validCommandeMethodPayment(value: boolean) {
        this._validCommandeMethodPayment = value;
    }

    get validCommandeDeliveryStatus(): boolean {
        return this._validCommandeDeliveryStatus;
    }

    set validCommandeDeliveryStatus(value: boolean) {
        this._validCommandeDeliveryStatus = value;
    }

    get validCommandeEtatPaiement(): boolean {
        return this._validCommandeEtatPaiement;
    }

    set validCommandeEtatPaiement(value: boolean) {
        this._validCommandeEtatPaiement = value;
    }


    get selectedCommande(): CommandeDto {
        return this.commandeService.selectedCommande;
    }

    set selectedCommande(value: CommandeDto) {
        this.commandeService.selectedCommande = value;
    }

}
