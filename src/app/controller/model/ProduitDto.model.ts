import {CategoryDTO} from "./CategoryDTO.model";
import {SupplierDTO} from "./SupplierDTO.model";

export class ProduitDto {
    idProduct: number;
    reference: string;
    name: string;
    description: string;
    prixProduct: number;
    category: CategoryDTO;
    supplier: SupplierDTO ;
    imgs: Array<string>;
}