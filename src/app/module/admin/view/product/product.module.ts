import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreateProductComponent} from './create-product/create-product.component';
import {ListProductComponent} from './list-product/list-product.component';
import {EditProductComponent} from './edit-product/edit-product.component';
import {ViewProductComponent} from './view-product/view-product.component';
import {ProductComponent} from "./product.component";
import {ButtonModule} from "primeng/button";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {FileUploadModule} from "primeng/fileupload";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {RippleModule} from "primeng/ripple";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {ProductCategoryModule} from "../product-category/product-category.module";
import {InputTextareaModule} from "primeng/inputtextarea";
import {DialogModule} from "primeng/dialog";
import {TabViewModule} from "primeng/tabview";
import {SplitButtonModule} from "primeng/splitbutton";


@NgModule({
    declarations: [
        ProductComponent,
        CreateProductComponent,
        ListProductComponent,
        EditProductComponent,
        ViewProductComponent
    ],
    imports: [
        CommonModule,
        ButtonModule,
        ConfirmDialogModule,
        FileUploadModule,
        InputNumberModule,
        InputTextModule,
        PaginatorModule,
        RippleModule,
        SharedModule,
        TableModule,
        TagModule,
        ToastModule,
        ToolbarModule,
        ProductCategoryModule,
        InputTextareaModule,
        DialogModule,
        TabViewModule,
        SplitButtonModule
    ]
})
export class ProductModule {
}
