import {ProduitDto} from "./ProduitDto.model";

export class SupplierDTO {
    idSupplier: number;
    nomSupplier: string;
    mail: string;
    phoneNumber: string
    rib:string;
    products:Array<ProduitDto>;
}