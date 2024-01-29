import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DeliveryPersonComponent} from './delivery-person.component';
import {CreateDeliveryPersonComponent} from './create-delivery-person/create-delivery-person.component';
import {EditDeliveryPersonComponent} from './edit-delivery-person/edit-delivery-person.component';
import {ListDeliveryPersonComponent} from './list-delivery-person/list-delivery-person.component';
import {ViewDeliveryPersonComponent} from './view-delivery-person/view-delivery-person.component';
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {DropdownModule} from "primeng/dropdown";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {FileUploadModule} from "primeng/fileupload";
import {TableModule} from "primeng/table";
import {RippleModule} from "primeng/ripple";
import {TabViewModule} from "primeng/tabview";
import {DialogModule} from "primeng/dialog";
import {InputTextareaModule} from "primeng/inputtextarea";
import {CheckboxModule} from "primeng/checkbox";
import {TriStateCheckboxModule} from "primeng/tristatecheckbox";


@NgModule({
  declarations: [
    DeliveryPersonComponent,
    CreateDeliveryPersonComponent,
    EditDeliveryPersonComponent,
    ListDeliveryPersonComponent,
    ViewDeliveryPersonComponent
  ],
    imports: [
        CommonModule,
        ConfirmDialogModule,
        FormsModule,
        InputTextModule,
        DropdownModule,
        ToastModule,
        ToolbarModule,
        FileUploadModule,
        TableModule,
        RippleModule,
        TabViewModule,
        DialogModule,
        InputTextareaModule,
        CheckboxModule,
        TriStateCheckboxModule
    ]
})
export class DeliveryPersonModule { }
