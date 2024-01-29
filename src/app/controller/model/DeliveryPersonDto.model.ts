import {BaseDto} from "./BaseDto.model";
import {DeliveryPersonStatus} from "./enum/DeliveryPersonStatus";

export class DeliveryPersonDto extends BaseDto {
    fullname: string;
    email: string;
    phone: string;
    city: string;
    status: DeliveryPersonStatus;

}