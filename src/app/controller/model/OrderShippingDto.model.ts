import {BaseDto} from "./BaseDto.model";
import {DeliveryPerson} from "./DeliveryPerson.model";

export class OrderShippingDto extends BaseDto {
    totalPaye: number;
    client: string;
    commandItems: string;
    deliveryPerson: DeliveryPerson;
    status: string;
    methodDePaiement: string;
    etatPaiement: string;
}