import {BaseDto} from "./BaseDto.model";

export class CommandeItemDto extends BaseDto {
    prix: number;
    produit: string;
    quantity: number;
}