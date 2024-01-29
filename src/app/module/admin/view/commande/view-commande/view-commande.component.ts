import {Component, OnInit} from '@angular/core';
import {CommandeService} from "../../../../../controller/service/commande.service";
import {CommandeDto} from "../../../../../controller/model/CommandeDto.model";
import {CommandeItemDto} from "../../../../../controller/model/CommandeItemDto.model";

@Component({
  selector: 'app-view-commande',
  templateUrl: './view-commande.component.html',
  styleUrls: ['./view-commande.component.css']
})
export class ViewCommandeComponent implements OnInit{

  commandeItems: Array<CommandeItemDto> = [];

  constructor(private commandeService: CommandeService) {
  }


  ngOnInit(): void {
    this.commandeService.findAll().subscribe(data=>this.commandes = data);
    this.commandes.forEach(c=>{
      this.commandeItems = this.convertFromStringToListOfObject(c.commandeItemDtos);
    })

    this.commandeItems.forEach(cis=>{
      // console.log(this.convertFromStringToObject(cis.produit));
      console.log(this.convertFromStringToObject(cis.produit).categorieProduitDto.libele);
    })
  }

  public convertFromStringToObject(value: string) {
    return JSON.parse(value);
  }

  public convertFromStringToListOfObject(value: string) {
    return JSON.parse(value);
  }

  get commande(): CommandeDto {
    return this.commandeService.commande;
  }

  set commande(value: CommandeDto) {
    this.commandeService.commande = value;
  }

  get commandes(): Array<CommandeDto> {
    return this.commandeService.commandes;
  }

  set commandes(value: Array<CommandeDto>) {
    this.commandeService.commandes = value;
  }
  get viewDialog() {
    return this.commandeService.viewDialog
  }

  set viewDialog(value: boolean) {
    this.commandeService.viewDialog = value
  }

}
