import {Component, OnInit} from '@angular/core';
import {DeliveryPersonService} from "../../../../../controller/service/deliveryPerson.service";
import {DeliveryPersonDto} from "../../../../../controller/model/DeliveryPersonDto.model";

@Component({
  selector: 'app-view-delivery-person',
  templateUrl: './view-delivery-person.component.html',
  styleUrls: ['./view-delivery-person.component.scss']
})
export class ViewDeliveryPersonComponent implements OnInit {

  constructor(private deliveryPersonService: DeliveryPersonService) {
  }


  ngOnInit(): void {
  }

  hideEditDialog() {
    this.viewDialog = false;
  }

  get deliveryPerson(): DeliveryPersonDto {
    return this.deliveryPersonService.deliveryPerson;
  }

  set deliveryPerson(value: DeliveryPersonDto) {
    this.deliveryPersonService.deliveryPerson = value;
  }

  get viewDialog(): boolean {
    return this.deliveryPersonService.viewDialog;
  }

  set viewDialog(value: boolean) {
    this.deliveryPersonService.viewDialog = value;
  }
}
