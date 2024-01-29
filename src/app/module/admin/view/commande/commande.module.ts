import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ViewCommandeComponent} from './view-commande/view-commande.component';
import {CommandeComponent} from "./commande.component";
import {CreateCommandeComponent} from "./create-commande/create-commande.component";
import {EditCommandeComponent} from "./edit-commande/edit-commande.component";
import {ListCommandeComponent} from "./list-commande/list-commande.component";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {InputSwitchModule} from "primeng/inputswitch";
import {DropdownModule} from "primeng/dropdown";
import {FileUploadModule} from "primeng/fileupload";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {FormsModule} from "@angular/forms";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {TableModule} from "primeng/table";
import {RippleModule} from "primeng/ripple";
import {TagModule} from "primeng/tag";
import {DialogModule} from "primeng/dialog";
import {TabViewModule} from "primeng/tabview";
import {InputTextareaModule} from "primeng/inputtextarea";
import {SplitButtonModule} from "primeng/splitbutton";

@NgModule({
    declarations: [
        CommandeComponent,
        CreateCommandeComponent,
        EditCommandeComponent,
        ListCommandeComponent,
        ViewCommandeComponent,
    ],
    imports: [
        CommonModule,
        ConfirmDialogModule,
        InputSwitchModule,
        DropdownModule,
        FileUploadModule,
        ToastModule,
        ToolbarModule,
        FormsModule,
        InputNumberModule,
        InputTextModule,
        TableModule,
        RippleModule,
        TagModule,
        DialogModule,
        TabViewModule,
        InputTextareaModule,
        SplitButtonModule
    ]
})
export class CommandeModule {
}
