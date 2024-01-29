import { Component } from '@angular/core';
import {ProductService} from "../../../../../controller/service/product.service";
import {ProduitDto} from "../../../../../controller/model/ProduitDto.model";

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent {

  constructor(private produitService: ProductService) {
  }

  ngOnInit(): void {
  }

  get produit(): ProduitDto {
    return this.produitService.produit;
  }

  set produit(value: ProduitDto) {
    this.produitService.produit = value;
  }
  get viewDialog() {
    return this.produitService.viewDialog
  }

  set viewDialog(value: boolean) {
    this.produitService.viewDialog = value
  }

}
