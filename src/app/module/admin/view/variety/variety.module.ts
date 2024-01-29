import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VarietyComponent } from './variety.component';
import { CreateVarietyComponent } from './create-variety/create-variety.component';
import { EditVarietyComponent } from './edit-variety/edit-variety.component';
import { ListVarietyComponent } from './list-variety/list-variety.component';
import { ViewVarietyComponent } from './view-variety/view-variety.component';
import {ButtonModule} from "primeng/button";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {FileUploadModule} from "primeng/fileupload";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {ProductCategoryModule} from "../product-category/product-category.module";
import {RippleModule} from "primeng/ripple";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {DialogModule} from "primeng/dialog";
import {TabViewModule} from "primeng/tabview";



@NgModule({
  declarations: [
    VarietyComponent,
    CreateVarietyComponent,
    EditVarietyComponent,
    ListVarietyComponent,
    ViewVarietyComponent
  ],
    imports: [
        CommonModule,
        ButtonModule,
        ConfirmDialogModule,
        FileUploadModule,
        InputTextModule,
        PaginatorModule,
        ProductCategoryModule,
        RippleModule,
        SharedModule,
        TableModule,
        ToastModule,
        ToolbarModule,
        DialogModule,
        TabViewModule
    ]
})
export class VarietyModule { }
