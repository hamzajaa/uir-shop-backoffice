import {Component, OnInit} from '@angular/core';
import {DeliveryPersonService} from "../../../../../controller/service/deliveryPerson.service";
import {ConfirmationService, MessageService, SelectItem} from "primeng/api";
import {DeliveryPersonDto} from "../../../../../controller/model/DeliveryPersonDto.model";
import {DeliveryPersonStatus} from "../../../../../controller/model/enum/DeliveryPersonStatus";


@Component({
    selector: 'app-list-delivery-person',
    templateUrl: './list-delivery-person.component.html',
    styleUrls: ['./list-delivery-person.component.scss']
})
export class ListDeliveryPersonComponent implements OnInit {
    findByCriteriaShow: boolean = false;
    showArrayFields: boolean = false;
    deliveryPersonStatus: SelectItem[] = [];


    constructor(private deliveryPersonService: DeliveryPersonService,
                private confirmationService: ConfirmationService,
                private messageService: MessageService) {
    }

    selectedShows: any[] = [
        {name: 'Full Name', key: true},
        {name: 'Phone', key: true},
        {name: 'Email', key: true},
        {name: 'Delivery Status', key: true}
    ];

    shows: any[] = [
        {name: 'Full Name', key: true},
        {name: 'Phone', key: true},
        {name: 'Email', key: true},
        {name: 'Delivery Status', key: true}
    ];

    showStatus: any = {
        showFullName: true,
        showPhone: true,
        showEmail: true,
        showDeliveryStatus: true
    };

    ngOnInit(): void {
        this.loadDeliveryPersons();

        // for (let deliveryPersonStatusKey in DeliveryPersonStatus) {
        //     this.deliveryPersonStatus.push({ label: DeliveryPersonStatus[deliveryPersonStatusKey], value: DeliveryPersonStatus[deliveryPersonStatusKey] })
        // }

        Object.keys(DeliveryPersonStatus).forEach(key => {
            this.deliveryPersonStatus.push({label: DeliveryPersonStatus[key], value: DeliveryPersonStatus[key]});
        });
    }

    includesIgnoreCase(mainString: string, searchString: string): boolean {
        return mainString.toLowerCase().includes(searchString.toLowerCase());
    }

    updateValue(name: string) {
        console.log(this.selectedShows)
        var find = this.selectedShows.find(option => option.name === name);
        var split = name.split(" ");
        var nameStatus = 'show';
        split.forEach(n => {
            nameStatus += n;
        })
        if (find != null) {
            this.showStatus[nameStatus] = true;
            console.log(this.showStatus[nameStatus]);

        } else {
            this.showStatus[nameStatus] = false;
        }
    }


    openNew() {
        this.createDialog = true;
    }

    editDeliveryPerson(deliveryPerson: DeliveryPersonDto) {
        this.deliveryPersonService.findById(deliveryPerson).subscribe(deliveryPerson => {
            this.deliveryPerson = deliveryPerson;
            this.editDialog = true;
        })
    }

    deleteDeliveryPerson(deliveryPerson: DeliveryPersonDto) {
        this.confirmationService.confirm({
            message: 'Are you sure to delete this deliveryPerson ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.deliveryPersonService.delete(deliveryPerson).subscribe(number => {

                    const position = this.deliveryPersons.indexOf(deliveryPerson);
                    position > -1 ? this.deliveryPersons.splice(position, 1) : false;
                    this.messageService.add({
                        severity: "success",
                        summary: "Success",
                        detail: 'Auhtor deleted successfully',
                        life: 3000
                    })

                })
            }
        })

    }

    viewDeliveryPerson(deliveryPerson: DeliveryPersonDto) {
        this.deliveryPersonService.findById(deliveryPerson).subscribe(deliveryPerson => {
            this.deliveryPerson = deliveryPerson;
            this.viewDialog = true;
        })
    }

    loadDeliveryPersons() {
        this.deliveryPersonService.findAll().subscribe(data => this.deliveryPersons = data);
    }


    get createDialog(): boolean {
        return this.deliveryPersonService.createDialog;
    }

    set createDialog(value: boolean) {
        this.deliveryPersonService.createDialog = value;
    }

    get editDialog(): boolean {
        return this.deliveryPersonService.editDialog;
    }

    set editDialog(value: boolean) {
        this.deliveryPersonService.editDialog = value;
    }

    get viewDialog(): boolean {
        return this.deliveryPersonService.viewDialog;
    }

    set viewDialog(value: boolean) {
        this.deliveryPersonService.viewDialog = value;
    }

    get selectedDeliveryPerson(): DeliveryPersonDto {
        return this.deliveryPersonService.selectedDeliveryPerson;
    }

    set selectedDeliveryPerson(value: DeliveryPersonDto) {
        this.deliveryPersonService.selectedDeliveryPerson = value;
    }


    get deliveryPerson(): DeliveryPersonDto {
        return this.deliveryPersonService.deliveryPerson;
    }

    set deliveryPerson(value: DeliveryPersonDto) {
        this.deliveryPersonService.deliveryPerson = value;
    }


    get deliveryPersons(): Array<DeliveryPersonDto> {
        return this.deliveryPersonService.deliveryPersons;
    }

    set deliveryPersons(value: Array<DeliveryPersonDto>) {
        this.deliveryPersonService.deliveryPersons = value;
    }


    get errorMessage(): Array<string> {
        return this.deliveryPersonService.errorMessages;
    }

    set errorMessage(value: Array<string>) {
        this.deliveryPersonService.errorMessages = value;
    }


    get searchDeliveryPerson(): DeliveryPersonDto {
        return this.deliveryPersonService.searchDeliveryPerson;
    }

    set searchDeliveryPerson(value: DeliveryPersonDto) {
        this.deliveryPersonService.searchDeliveryPerson = value;
    }

    deleteSelectedDeliveryPersons() {

    }

    get selectedDeliveryPersons(): Array<DeliveryPersonDto> {
        return this.deliveryPersonService.selectedDeliveryPersons;
    }

    set selectedDeliveryPersons(value: Array<DeliveryPersonDto>) {
        this.deliveryPersonService.selectedDeliveryPersons = value;
    }


    protected readonly DeliveryPersonStatus = DeliveryPersonStatus;

    click($event: any) {

    }


}
