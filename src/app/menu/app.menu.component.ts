import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {
    trigger,
    state,
    style,
    transition,
    animate,
} from '@angular/animations';

import {AppComponent} from 'src/app/app.component';

import {AppMainComponent} from 'src/app/template/app.main.component';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
    animations: [
        trigger('inline', [
            state(
                'hidden',
                style({
                    height: '0px',
                    overflow: 'hidden',
                })
            ),
            state(
                'visible',
                style({
                    height: '*',
                })
            ),
            state(
                'hiddenAnimated',
                style({
                    height: '0px',
                    overflow: 'hidden',
                })
            ),
            state(
                'visibleAnimated',
                style({
                    height: '*',
                })
            ),
            transition(
                'visibleAnimated => hiddenAnimated',
                animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')
            ),
            transition(
                'hiddenAnimated => visibleAnimated',
                animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')
            ),
        ]),
    ],
})
export class AppMenuComponent implements OnInit {
    model: any[];
    modelanonymous: any[];
    modelAdmin: any[];

    constructor(public app: AppComponent, public appMain: AppMainComponent, private router: Router) {
    }

    ngOnInit() {
        this.modelAdmin =
            [
                {
                    label: 'Commandes',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                            label: 'Liste Commandes',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/commande/list']
                        },
                    ]
                },
                {
                    label: 'Produits',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                            label: 'Liste Produits',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/product/list']
                        },
                    ]
                },
                {
                    label: 'Categories',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                            label: 'Liste Categories',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/category/list']
                        },
                    ]
                },
                {
                    label: 'Varieties',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                            label: 'Liste Varieties',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/variety/list']
                        },
                    ]
                },
                {
                    label: 'Livraisons',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                            label: 'Liste Livraisons',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/shipping/list']
                        },
                        {
                            label: 'Livreurs',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/shipping/person/list']
                        },
                    ]
                }

            ];
        // if (this.authService.authenticated) {
        //     if (this.authService.authenticatedUser.roles) {
        //         this.authService.authenticatedUser.roles.forEach(role => {
        //             const roleName: string = this.getRole(role);
        //             this.roleService._role.next(roleName.toUpperCase());
        //             eval('this.model = this.model' + this.getRole(role));
        //         })
        //     }
        // }
    }

    getRole(text) {
        const [role, ...rest] = text.split('_');
        return this.upperCaseFirstLetter(rest.join(''));
    }

    upperCaseFirstLetter(word: string) {
        if (!word) {
            return word;
        }
        return word[0].toUpperCase() + word.substr(1).toLowerCase();
    }

    onMenuClick(event: any) {
        this.appMain.onMenuClick(event);
    }
}
