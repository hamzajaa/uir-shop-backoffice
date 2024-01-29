import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {StringUtils} from "../../../../../utils/StringUtils";
import {ShippingService} from "../../../../../controller/service/shipping.service";
import {OrderShippingDto} from "../../../../../controller/model/OrderShippingDto.model";
import {DeliveryPersonDto} from "../../../../../controller/model/DeliveryPersonDto.model";
import {DeliveryPersonService} from "../../../../../controller/service/deliveryPerson.service";
import {dA} from "@fullcalendar/core/internal-common";
import {MethodDePaiement} from "../../../../../controller/model/enum/method-de-paiement";
import {EtatLivraison} from "../../../../../controller/model/enum/etat-livraison";
import {EtatPaiement} from "../../../../../controller/model/enum/etat-paiement";

@Component({
    selector: 'app-edit-shipping',
    templateUrl: './edit-shipping.component.html',
    styleUrls: ['./edit-shipping.component.css']
})
export class EditShippingComponent implements OnInit {

    private _validOrderShippingStatus: boolean = true;
    private _validOrderShippingTotalPaye: boolean = true;
    private _validOrderShippingMethodDePaiement: boolean = true;
    private _validOrderShippingEtatPaiement: boolean = true;

    deliveryPersons: Array<DeliveryPersonDto>

    methodDePaiements: Array<MethodDePaiement>;
    etatDePaiements: Array<EtatPaiement>;
    deliveryStatus: Array<EtatLivraison>;

    constructor(private orderShippingService: ShippingService,
                private deliveryPersonService: DeliveryPersonService,
                private confirmationService: ConfirmationService,
                private messageService: MessageService
    ) {
    }

    ngOnInit() {
        this.methodDePaiements = Object.values(MethodDePaiement);
        this.etatDePaiements = Object.values(EtatPaiement);
        this.deliveryStatus = Object.values(EtatLivraison);
        this.deliveryPersonService.findAll().subscribe(data => this.deliveryPersons = data);
    }


    edit() {
        this.validateForm();
        if (this.errorMessages.length === 0) {
            this.orderShippingService.edit(this.orderShipping).subscribe({
                next: (orderShipping) => {
                    const index = this.orderShippings.findIndex(os => os.id === orderShipping.id);
                    this.orderShippings[index] = orderShipping;
                    this.editDialog = false;
                },
                error: (err) => {
                    console.log(err)
                }
            })
        }
    }


    public validateForm() {
        this.errorMessages = new Array<string>();
        this.validateOrderShippingTotalPaye();
        this.validateOrderShippingEtatPaiement();
        this.validateOrderShippingStatus();
        this.validateOrderShippingMethodDePaiement();
    }

    public validateOrderShippingTotalPaye() {
        if (StringUtils.isEmpty(this.orderShipping.totalPaye)) {
            this.errorMessages.push('totalPaye not valid')
            this.validOrderShippingTotalPaye = false;
        } else {
            this.validOrderShippingTotalPaye = true;
        }
    }

    public validateOrderShippingStatus() {
        if (StringUtils.isEmpty(this.orderShipping.status)) {
            this.errorMessages.push('status not valid')
            this.validOrderShippingStatus = false;
        } else {
            this.validOrderShippingStatus = true;
        }
    }

    public validateOrderShippingMethodDePaiement() {
        if (StringUtils.isEmpty(this.orderShipping.methodDePaiement)) {
            this.errorMessages.push('methodDePaiement not valid')
            this.validOrderShippingMethodDePaiement = false;
        } else {
            this.validOrderShippingMethodDePaiement = true;
        }
    }

    public validateOrderShippingEtatPaiement() {
        if (StringUtils.isEmpty(this.orderShipping.etatPaiement)) {
            this.errorMessages.push('etatPaiement not valid')
            this.validOrderShippingEtatPaiement = false;
        } else {
            this.validOrderShippingEtatPaiement = true;
        }
    }

    hideEditDialog() {
        this.editDialog = false;
    }

    get orderShipping(): OrderShippingDto {
        return this.orderShippingService.orderShipping;
    }

    set orderShipping(value: OrderShippingDto) {
        this.orderShippingService.orderShipping = value;
    }

    get orderShippings(): Array<OrderShippingDto> {
        return this.orderShippingService.orderShippings;
    }

    set orderShippings(value: Array<OrderShippingDto>) {
        this.orderShippingService.orderShippings = value;
    }

    get editDialog(): boolean {
        return this.orderShippingService.editDialog;
    }

    set editDialog(value: boolean) {
        this.orderShippingService.editDialog = value;
    }

    get selectedOrderShipping(): OrderShippingDto {
        return this.orderShippingService.selectedOrderShipping;
    }

    set selectedOrderShipping(value: OrderShippingDto) {
        this.orderShippingService.selectedOrderShipping = value;
    }

    get errorMessages(): string[] {
        return this.orderShippingService.errorMessages;
    }

    set errorMessages(value: string[]) {
        this.orderShippingService.errorMessages = value;
    }


    get validOrderShippingStatus(): boolean {
        return this._validOrderShippingStatus;
    }

    set validOrderShippingStatus(value: boolean) {
        this._validOrderShippingStatus = value;
    }

    get validOrderShippingTotalPaye(): boolean {
        return this._validOrderShippingTotalPaye;
    }

    set validOrderShippingTotalPaye(value: boolean) {
        this._validOrderShippingTotalPaye = value;
    }

    get validOrderShippingMethodDePaiement(): boolean {
        return this._validOrderShippingMethodDePaiement;
    }

    set validOrderShippingMethodDePaiement(value: boolean) {
        this._validOrderShippingMethodDePaiement = value;
    }

    get validOrderShippingEtatPaiement(): boolean {
        return this._validOrderShippingEtatPaiement;
    }

    set validOrderShippingEtatPaiement(value: boolean) {
        this._validOrderShippingEtatPaiement = value;
    }

    openDeliveryPerson(deliveryPerson: string) {
        // this.selectedOrderShipping = new OrderShippingDto();
        this.deliveryPersonService.createDialog = true;
    }
}
