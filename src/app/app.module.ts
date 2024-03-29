import {Injector, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule, DatePipe} from '@angular/common';
import {AppRoutingModule} from './app-routing.module';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ButtonModule} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import {CardModule} from 'primeng/card';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {MessageModule} from 'primeng/message';
import {PanelModule} from 'primeng/panel';
import {PanelMenuModule} from 'primeng/panelmenu';
import {PasswordModule} from 'primeng/password';
import {RadioButtonModule} from 'primeng/radiobutton';
import {SplitButtonModule} from 'primeng/splitbutton';
import {TabViewModule} from 'primeng/tabview';
import {InputTextareaModule} from 'primeng/inputtextarea';

import {AppComponent} from './app.component';

import {AppMainComponent} from './template/app.main.component';
import {AppConfigComponent} from './template/app.config.component';

import {AppTopBarComponent} from './menu/app.topbar.component';
import {AppRightMenuComponent} from './menu/app.right-menu.component';
import {AppFooterComponent} from './menu/app.footer.component';
import {AppMenuComponent} from './menu/app.menu.component';


import {AccessDeniedComponent} from 'src/app/template/access-denied/access-denied.component';


import {HomeComponent} from './home/home.component';
import {InputSwitchModule} from 'primeng/inputswitch';

import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ToastModule} from 'primeng/toast';
import {DialogModule} from 'primeng/dialog';
import {TableModule} from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar';
import {FileUploadModule} from 'primeng/fileupload';
import {MenuService} from './menu/app.menu.service';
import {AppMenuitemComponent} from './menu/app.menuitem.component';

import {SelectButtonModule} from 'primeng/selectbutton';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';

import {AdminModule} from './module/admin/admin.module';
import {AdminRoutingModule} from './module/admin/admin-routing.module';
import {RouterModule} from "@angular/router";


export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
    imports: [
        ButtonModule,
        PasswordModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        BrowserModule,
        PanelMenuModule,
        RadioButtonModule,
        InputTextModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        DropdownModule,
        TabViewModule,
        SplitButtonModule,
        InputSwitchModule,
        InputTextareaModule,
        CalendarModule,
        PanelModule,
        MessageModule,
        CardModule,
        ToolbarModule,
        TableModule,
        DialogModule,
        ConfirmDialogModule,
        ToastModule,
        FileUploadModule,
        SelectButtonModule,

        AdminModule,
        AdminRoutingModule,
        RouterModule,

        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    declarations: [
        AppComponent,
        AccessDeniedComponent,

        AppMainComponent,
        AppMenuComponent,
        AppMenuitemComponent,
        AppConfigComponent,
        AppRightMenuComponent,
        AppTopBarComponent,
        AppFooterComponent,
        HomeComponent,
        AppFooterComponent

    ],
    providers: [
        /*    { provide: LocationStrategy, useClass: HashLocationStrategy }, */
        MenuService,
        MessageService,
        ConfirmationService,
        DatePipe,
    ],
    bootstrap: [AppComponent],
    exports: []
})
export class AppModule {

}

