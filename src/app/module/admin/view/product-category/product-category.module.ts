import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductCategoryComponent} from "./product-category.component";
import {CreateProductCategoryComponent} from "./create-product-category/create-product-category.component";
import {EditProductCategoryComponent} from "./edit-product-category/edit-product-category.component";
import {ListProductCategoryComponent} from "./list-product-category/list-product-category.component";
import {ViewProductCategoryComponent} from "./view-product-category/view-product-category.component";
import {DialogModule} from "primeng/dialog";
import {TabViewModule} from "primeng/tabview";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {FileUploadModule} from "primeng/fileupload";
import {TableModule} from "primeng/table";



@NgModule({
    declarations: [
        ProductCategoryComponent,
        CreateProductCategoryComponent,
        EditProductCategoryComponent,
        ListProductCategoryComponent,
        ViewProductCategoryComponent,
    ],
    exports: [
        CreateProductCategoryComponent
    ],
    imports: [
        CommonModule,
        DialogModule,
        TabViewModule,
        FormsModule,
        InputTextModule,
        ButtonModule,
        RippleModule,
        ConfirmDialogModule,
        ToastModule,
        ToolbarModule,
        FileUploadModule,
        TableModule
    ]
})
export class ProductCategoryModule { }
