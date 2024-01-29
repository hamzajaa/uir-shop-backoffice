import {BaseDto} from "./BaseDto.model";
import {MethodDePaiement} from "./enum/method-de-paiement";
import {EtatLivraison} from "./enum/etat-livraison";
import {EtatPaiement} from "./enum/etat-paiement";
import {CommandeItemDto} from "./CommandeItemDto.model";
import {ClientDto} from "./ClientDto.model";

export class CommandeDto extends BaseDto {
    reference: string;
    totalPaye: number;
    dateCommande: Date;
    client: string;
    methodDePaiement: MethodDePaiement;
    etatLivraison: EtatLivraison;
    etatPaiement: EtatPaiement;
    commandeItemDtos: string;
}