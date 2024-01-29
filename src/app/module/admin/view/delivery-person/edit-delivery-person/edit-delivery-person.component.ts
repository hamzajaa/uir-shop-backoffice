import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService, SelectItem} from "primeng/api";
import {DeliveryPersonService} from "../../../../../controller/service/deliveryPerson.service";
import {DeliveryPersonStatus} from "../../../../../controller/model/enum/DeliveryPersonStatus";
import {DeliveryPersonDto} from "../../../../../controller/model/DeliveryPersonDto.model";
import {StringUtils} from "../../../../../utils/StringUtils";

@Component({
  selector: 'app-edit-delivery-person',
  templateUrl: './edit-delivery-person.component.html',
  styleUrls: ['./edit-delivery-person.component.scss']
})
export class EditDeliveryPersonComponent implements OnInit {

  private _validDeliveryPersonFullName: boolean = true;
  private _validDeliveryPersonPhone: boolean = true;
  private _validDeliveryPersonDeliveryStatus: boolean = true;
  private _validDeliveryPersonEmail: boolean = true;

  deliveryPersonStatus: SelectItem[] = [];


  constructor(private deliveryPersonService: DeliveryPersonService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) {
  }

  ngOnInit() {
    Object.keys(DeliveryPersonStatus).forEach(key => {
      this.deliveryPersonStatus.push({ label: DeliveryPersonStatus[key], value: DeliveryPersonStatus[key] });
    });
  }

  public edit() {
    this.validateForm();
    if (this.errorMessages.length === 0) {
      this.deliveryPersonService.edit(this.deliveryPerson).subscribe({
            next: (client) => {
              const myIndex = this.deliveryPersons.findIndex(a => a.id === this.deliveryPerson.id);
              this.deliveryPersons[myIndex] = client;
              this.editDialog = false;
              this.messageService.add({severity: 'success', summary: 'Success', detail: 'Client Updated Successfully'});
            },
            error: (err) => {
              console.log(err);
            }
          }
      );
    }
  }


  private validateForm() {
    this.errorMessages = new Array<string>();
    this.validateFullName();
    this.validatePhone();
    this.validateEmail();
    this.validateDeliveryStatus();
    this.confirmationService.close();
  }

  public validateFullName() {
    if (StringUtils.isEmpty(this.selectedDeliveryPerson.fullname)) {
      this.errorMessages.push('Full Name not valid');
      this.validDeliveryPersonFullName = false;
    } else {
      this.validDeliveryPersonFullName = true;
    }
  }

  public validatePhone() {
    if (StringUtils.isEmpty(this.selectedDeliveryPerson.phone)) {
      this.errorMessages.push('Phone not valid');
      this.validDeliveryPersonPhone = false;
    } else {
      this.validDeliveryPersonPhone = true;
    }
  }

  public validateEmail() {
    if (StringUtils.isEmpty(this.selectedDeliveryPerson.email)) {
      this.errorMessages.push('Email not valid');
      this.validDeliveryPersonEmail = false;
    } else {
      this.validDeliveryPersonEmail = true;
    }
  }

  public validateDeliveryStatus() {
    if (StringUtils.isEmpty(this.selectedDeliveryPerson.status)) {
      this.errorMessages.push('Delivery Status not valid');
      this.validDeliveryPersonDeliveryStatus = false;
    } else {
      this.validDeliveryPersonDeliveryStatus = true;
    }
  }

  hideCreateDialog() {
    this.editDialog = false;
  }

  get editDialog() {
    return this.deliveryPersonService.editDialog
  }

  set editDialog(value: boolean) {
    this.deliveryPersonService.editDialog = value
  }


  get validDeliveryPersonFullName(): boolean {
    return this._validDeliveryPersonFullName;
  }

  set validDeliveryPersonFullName(value: boolean) {
    this._validDeliveryPersonFullName = value;
  }

  get validDeliveryPersonPhone(): boolean {
    return this._validDeliveryPersonPhone;
  }

  set validDeliveryPersonPhone(value: boolean) {
    this._validDeliveryPersonPhone = value;
  }

  get validDeliveryPersonDeliveryStatus(): boolean {
    return this._validDeliveryPersonDeliveryStatus;
  }

  set validDeliveryPersonDeliveryStatus(value: boolean) {
    this._validDeliveryPersonDeliveryStatus = value;
  }

  get validDeliveryPersonEmail(): boolean {
    return this._validDeliveryPersonEmail;
  }

  set validDeliveryPersonEmail(value: boolean) {
    this._validDeliveryPersonEmail = value;
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

  get errorMessages(): Array<string> {
    return this.deliveryPersonService.errorMessages;
  }

  set errorMessages(value: Array<string>) {
    this.deliveryPersonService.errorMessages = value;
  }

  get selectedDeliveryPerson(): DeliveryPersonDto {
    return this.deliveryPersonService.selectedDeliveryPerson;
  }

  set selectedDeliveryPerson(value: DeliveryPersonDto) {
    this.deliveryPersonService.selectedDeliveryPerson = value;
  }

}
