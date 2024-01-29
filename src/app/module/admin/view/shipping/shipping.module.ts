import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShippingComponent } from './shipping.component';
import { CreateShippingComponent } from './create-shipping/create-shipping.component';
import { EditShippingComponent } from './edit-shipping/edit-shipping.component';
import { ListShippingComponent } from './list-shipping/list-shipping.component';
import { ViewShippingComponent } from './view-shipping/view-shipping.component';
import {ButtonModule} from "primeng/button";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {DropdownModule} from "primeng/dropdown";
import {FileUploadModule} from "primeng/fileupload";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {RippleModule} from "primeng/ripple";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {TagModule} from "primeng/tag";
import {DialogModule} from "primeng/dialog";
import {TabViewModule} from "primeng/tabview";
import {InputTextareaModule} from "primeng/inputtextarea";
import {SplitButtonModule} from "primeng/splitbutton";



@NgModule({
    declarations: [
        ShippingComponent,
        CreateShippingComponent,
        EditShippingComponent,
        ListShippingComponent,
        ViewShippingComponent
    ],
    exports: [
        ListShippingComponent
    ],
    imports: [
        CommonModule,
        ButtonModule,
        ConfirmDialogModule,
        DropdownModule,
        FileUploadModule,
        InputNumberModule,
        InputTextModule,
        PaginatorModule,
        RippleModule,
        SharedModule,
        TableModule,
        ToastModule,
        ToolbarModule,
        TagModule,
        DialogModule,
        TabViewModule,
        InputTextareaModule,
        SplitButtonModule
    ]
})
export class ShippingModule { }
