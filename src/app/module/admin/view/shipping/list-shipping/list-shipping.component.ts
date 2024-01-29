import {Component, OnInit} from '@angular/core';
import {OrderShippingDto} from "../../../../../controller/model/OrderShippingDto.model";
import {DeliveryPersonService} from "../../../../../controller/service/deliveryPerson.service";
import {ConfirmationService, MenuItem, MessageService} from "primeng/api";
import {ShippingService} from "../../../../../controller/service/shipping.service";
import {DeliveryPersonDto} from "../../../../../controller/model/DeliveryPersonDto.model";
import {CommandeService} from "../../../../../controller/service/commande.service";
import {EtatLivraison} from "../../../../../controller/model/enum/etat-livraison";
import {saveAs} from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

@Component({
    selector: 'app-list-shipping',
    templateUrl: './list-shipping.component.html',
    styleUrls: ['./list-shipping.component.css']
})
export class ListShippingComponent implements OnInit {

    findByCriteriaShow: boolean = false;

    // authors!: Array<AuthorDto>;
    // deliveryPersons!: Array<DeliveryPersonDTO>;

    selectedOrderShippings!: OrderShippingDto[] | null;

    submitted: boolean = false;

    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    fileName = 'Livraisons';

    constructor(private shippingService: ShippingService,
                private deliveryPersonService: DeliveryPersonService,
                private commandeService: CommandeService,
                private messageService: MessageService,
                private confirmationService: ConfirmationService) {
    }

    ngOnInit() {
        this.loadOrderShippings();
        this.initExport();
        this.initCol();
        this.prepareColumnExport();
    }

    private initCol() {
        this.cols = [
            {field: 'reference', header: 'Reference'},
            {field: 'this.convertFromStringToObject(e.client)?.fullName', header: 'Client'},
            {field: '(e.deliveryPerson).fullname', header: 'Livreur'},
            {field: 'status', header: 'Etat Livraison'},
            {field: 'etatPaiement', header: 'Etat Paiement'},
            {field: 'methodDePaiement', header: 'Method Paiement'},
        ];
    }

    initExport(): void {
        this.excelPdfButons = [
            {
                label: 'XLS', icon: 'pi pi-file-excel', command: () => {
                    this.exportExcel();
                }
            },
            {
                label: 'PDF', icon: 'pi pi-file-pdf', command: () => {
                    this.exportPdf();
                }
            }
        ];
    }

    exportExcel(): void {
        import('xlsx').then(async xlsx => {
            this.prepareColumnExport();
            const worksheet = xlsx.utils.json_to_sheet(this.exportData);
            const workbook = {Sheets: {'data': worksheet}, SheetNames: ['data']};
            const excelBuffer: any = xlsx.write(workbook, {bookType: 'xlsx', type: 'array'});
            this.saveAsExcelFile(excelBuffer, this.fileName);
        });
    }

    saveAsExcelFile(buffer: any, fileName: string): void {
        import('file-saver').then(FileSaver => {
            const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
            const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
            saveAs(data, fileName + '.xlsx');
        });
    }

    exportPdf(): void {
        this.prepareColumnExport();
        const doc = new jsPDF();
        autoTable(doc, {
            columns: [
                {header: 'Reference', dataKey: 'Reference'},
                {header: 'Client', dataKey: 'Client'},
                {header: 'Livreur', dataKey: 'Livreur'},
                {header: 'Etat Livraison', dataKey: 'Etat Livraison'},
                {header: 'Etat Paiement', dataKey: 'Etat Paiement'},
                {header: 'Method Paiement', dataKey: 'Method Paiement'},
            ],
            body: this.exportData, styles: {fontSize: 5}
        });
        doc.save(this.fileName + '.pdf');
    }

    prepareColumnExport(): void {
        this.exportData = this.orderShippings.map(e => {
            return {
                'Reference': 'ref',
                'Client': this.convertFromStringToObject(e.client)?.fullName,
                'Livreur': e.deliveryPerson?.fullname,
                'Etat Livraison': e.status,
                'Etat Paiement': e.etatPaiement,
                'Method Paiement': e.methodDePaiement,
            };
        });
    }

    openNew() {
        this.selectedOrderShipping = new OrderShippingDto();
        this.submitted = false;
        this.createDialog = true;
    }

    public loadOrderShippings() {
        this.shippingService.findAll().subscribe(data => {
            this.orderShippings = data
        });
    }


    public convertFromStringToObject(value: string) {
        return JSON.parse(value);
    }

    deleteSelectedOrderShippings() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected orderShippings?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.orderShippings = this.orderShippings.filter((val) => !this.selectedOrderShippings?.includes(val));
                this.selectedOrderShippings = null;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'OrderShippings Deleted',
                    life: 3000
                });
            }
        });
    }

    edit(orderShipping: OrderShippingDto) {
        this.shippingService.findById(orderShipping).subscribe(orderShipping => {
            this.editDialog = true;
            this.orderShipping = orderShipping;
        })
    }

    public delete(orderShipping: OrderShippingDto) {
        console.log(orderShipping)
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete this item ?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.shippingService.delete(orderShipping).subscribe({
                    next: (value) => {
                        console.log(value)
                        console.log(this.orderShipping)
                        this.orderShippings = this.orderShippings.filter((os) => os.id !== orderShipping.id);
                        this.orderShipping = new OrderShippingDto();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'OrderShipping Deleted',
                            life: 3000
                        });

                    },
                    error: (err) => {
                        console.log(err)
                    }
                });
            }
        });
    }

    view(orderShipping: OrderShippingDto) {
        this.shippingService.findById(orderShipping).subscribe(orderShipping => {
            this.orderShipping = orderShipping;
            this.viewDialog = true;
        })
    }


    get orderShippings(): Array<OrderShippingDto> {
        return this.shippingService.orderShippings;
    }

    set orderShippings(value: Array<OrderShippingDto>) {
        this.shippingService.orderShippings = value;
    }

    get orderShipping(): OrderShippingDto {
        return this.shippingService.orderShipping;
    }

    set orderShipping(value: OrderShippingDto) {
        this.shippingService.orderShipping = value;
    }

    get searchOrderShipping(): OrderShippingDto {
        return this.shippingService.searchOrderShipping;
    }

    set searchOrderShipping(value: OrderShippingDto) {
        this.shippingService.searchOrderShipping = value;
    }

    get createDialog() {
        return this.shippingService.createDialog
    }

    set createDialog(value: boolean) {
        this.shippingService.createDialog = value
    }

    get editDialog() {
        return this.shippingService.editDialog
    }

    set editDialog(value: boolean) {
        this.shippingService.editDialog = value
    }

    get viewDialog() {
        return this.shippingService.viewDialog
    }

    set viewDialog(value: boolean) {
        this.shippingService.viewDialog = value
    }

    get selectedOrderShipping(): OrderShippingDto {
        return this.shippingService.selectedOrderShipping;
    }

    set selectedOrderShipping(value: OrderShippingDto) {
        this.shippingService.selectedOrderShipping = value;
    }

    get deliveryPersons(): Array<DeliveryPersonDto> {
        return this.deliveryPersonService.deliveryPersons;
    }

    set deliveryPersons(value: Array<DeliveryPersonDto>) {
        this.deliveryPersonService.deliveryPersons = value;
    }

    getSeverity(orderShipping: OrderShippingDto) {
        if (orderShipping.status == EtatLivraison.PENDING) {
            return 'danger';
        } else {
            return 'success';
        }
    }

    ref = 'ref';
    // getOrderRef(orderShipping: OrderShippingDto) {
    //     this.commandeService.findByIdRef(orderShipping.id).subscribe(commande => {
    //             this.ref = commande.reference;
    //         }
    //     );
    //     console.log(this.ref)
    // }
}
