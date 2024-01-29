import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';


import { AppComponent } from 'src/app/app.component';
import { AppMainComponent } from 'src/app/template/app.main.component';




@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    roleAdmin = false;

    constructor(public app: AppComponent, public appMain: AppMainComponent, private translateService: TranslateService) {
    }

    useLanguage(language: string): void {
        this.translateService.use(language);
    }
    ngOnInit(): void {

    }




}
