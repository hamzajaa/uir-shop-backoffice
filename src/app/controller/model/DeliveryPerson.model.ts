import {BaseDto} from "./BaseDto.model";

export class DeliveryPerson extends BaseDto {
    fullname: string;
    email: string;
    phone: string;
    city: string;
    status: string;
}