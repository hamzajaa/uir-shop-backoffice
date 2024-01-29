import {BaseDto} from "./BaseDto.model";

export class ClientDto extends BaseDto{
    fullName:string;
    email:string;
    address:string;
    phoneNumber:string;
}