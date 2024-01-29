import {Component} from '@angular/core';
import {ShippingService} from "../../../../../controller/service/shipping.service";
import {OrderShippingDto} from "../../../../../controller/model/OrderShippingDto.model";

@Component({
    selector: 'app-view-shipping',
    templateUrl: './view-shipping.component.html',
    styleUrls: ['./view-shipping.component.css']
})
export class ViewShippingComponent {

    constructor(private shippingService: ShippingService) {
    }


    get orderShipping(): OrderShippingDto {
        return this.shippingService.orderShipping;
    }

    set orderShipping(value: OrderShippingDto) {
        this.shippingService.orderShipping = value;
    }

    get viewDialog() {
        return this.shippingService.viewDialog;
    }

    set viewDialog(value: boolean) {
        this.shippingService.viewDialog = value;
    }
}
