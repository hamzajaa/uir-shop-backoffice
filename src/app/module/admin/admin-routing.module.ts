// const root = environment.rootAppUrl;

import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommandeComponent} from "./view/commande/commande.component";
import {ProductComponent} from "./view/product/product.component";
import {ProductCategoryComponent} from "./view/product-category/product-category.component";
import {ShippingComponent} from "./view/shipping/shipping.component";
import {DeliveryPersonModule} from "./view/delivery-person/delivery-person.module";
import {DeliveryPersonComponent} from "./view/delivery-person/delivery-person.component";
import {VarietyComponent} from "./view/variety/variety.component";


@NgModule({
    imports: [
        RouterModule.forChild(
            [
                {
                    path: 'commande',
                    children: [
                        {
                            path: 'list',
                            component: CommandeComponent
                        }
                    ]
                },
                {
                    path: 'product',
                    children: [
                        {
                            path: 'list',
                            component: ProductComponent
                        }
                    ]
                },
                {
                    path: 'category',
                    children: [
                        {
                            path: 'list',
                            component: ProductCategoryComponent
                        }
                    ]
                },
                {
                    path: 'shipping',
                    children: [
                        {
                            path: 'list',
                            component: ShippingComponent
                        },
                        {
                            path: 'person/list',
                            component: DeliveryPersonComponent
                        }
                    ]
                },
                {
                    path: 'variety',
                    children: [
                        {
                            path: 'list',
                            component: VarietyComponent
                        }
                    ]
                },

            ]
        ),
    ],
    exports: [RouterModule],
})
export class AdminRoutingModule {
}
