import {Component, OnInit} from '@angular/core';
import {CommandeDto} from "../../../../../controller/model/CommandeDto.model";
import {CommandeService} from "../../../../../controller/service/commande.service";
import {ConfirmationService, MenuItem, MessageService} from "primeng/api";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {DatePipe} from "@angular/common";
import {saveAs} from 'file-saver';


@Component({
    selector: 'app-list-commande',
    templateUrl: './list-commande.component.html',
    styleUrls: ['./list-commande.component.scss']
})
export class ListCommandeComponent implements OnInit {

    findByCriteriaShow: boolean = false;

    // authors!: Array<AuthorDto>;
    // categories!: Array<CategoryDto>;

    selectedCommandes!: CommandeDto[] | null;

    submitted: boolean = false;

    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    fileName = 'Commande';
    yesno: any[] = [];


    constructor(private commandeService: CommandeService,
                private messageService: MessageService,
                private datePipe: DatePipe,
                private confirmationService: ConfirmationService) {
    }

    ngOnInit() {
        this.loadCommandes();
        this.initExport();
        this.initCol();
        this.prepareColumnExport();

    }

    private initCol() {
        this.cols = [
            {field: 'reference', header: 'Reference'},
            {field: 'dateCommande', header: 'Date Commande'},
            {field: 'totalPaye', header: 'Total paye'},
            {field: 'this.convertFromStringToObject(e.client)?.fullName', header: 'Client'},
            {field: 'methodDePaiement', header: 'Method De Paiement'},
            {field: 'etatLivraison', header: 'Etat Livraison'},
            {field: 'etatPaiement', header: 'Etat Paiement'},
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
                {header: 'Date Commande', dataKey: 'Date Commande'},
                {header: 'Total Paye', dataKey: 'Total Paye'},
                {header: 'Client', dataKey: 'Client'},
                {header: 'Method De Paiement', dataKey: 'Method De Paiement'},
                {header: 'Etat Livraison', dataKey: 'Etat Livraison'},
                {header: 'Etat De Paiement', dataKey: 'Etat De Paiement'},
            ],
            body: this.exportData, styles: {fontSize: 5}
        });
        doc.save(this.fileName + '.pdf');
    }

    // exportCSV() {
    //     this.prepareColumnExport();
    //     const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
    //     const header = Object.keys(this.exportData[0]);
    //     let csv = this.exportData.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(';'));
    //     csv.unshift(header.join(';'));
    //     let csvArray = csv.join('\r\n');
    //     var blob = new Blob([csvArray], {type: 'text/csv'});
    //     FileSaver.saveAs(blob, this.fileName + '.csv');
    // }


    prepareColumnExport(): void {
        this.exportData = this.commandes.map(e => {
            return {
                'Reference': e.reference,
                'Date Commande': this.datePipe.transform(e.dateCommande,'dd-MM-yyyy'),
                'Total Paye': e.totalPaye,
                'Client': this.convertFromStringToObject(e.client)?.fullName,
                'Method De Paiement': e.methodDePaiement,
                'Etat Livraison': e.etatLivraison,
                'Etat De Paiement': e.etatPaiement,
            };
        });
    }
    openNew() {
        this.selectedCommande = new CommandeDto();
        this.submitted = false;
        this.createDialog = true;
    }

    public loadCommandes() {
        this.commandeService.findAll().subscribe(data => this.commandes = data);
    }

    public convertFromStringToObject(value: string) {
        return JSON.parse(value);
    }

    deleteSelectedCommandes() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected products?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.commandes = this.commandes.filter((val) => !this.selectedCommandes?.includes(val));
                this.selectedCommandes = null;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
            }
        });
    }

    editCommande(commande: CommandeDto) {
        this.commandeService.findById(commande).subscribe(commande => {
            this.commande = commande;
            this.editDialog = true;
        })
    }

    public deleteCommande(commande: CommandeDto) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + commande.reference + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.commandeService.delete(commande).subscribe({
                    next: (number) => {

                        this.commandes = this.commandes.filter((b) => b.id !== commande.id);
                        this.commande = new CommandeDto();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Commande Deleted',
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

    viewCommande(commande: CommandeDto) {
        this.commandeService.findById(commande).subscribe(commande => {
            this.commande = commande;
            this.viewDialog = true;
        })
    }


    get commandes(): Array<CommandeDto> {
        return this.commandeService.commandes;
    }

    set commandes(value: Array<CommandeDto>) {
        this.commandeService.commandes = value;
    }

    get commande(): CommandeDto {
        return this.commandeService.commande;
    }

    set commande(value: CommandeDto) {
        this.commandeService.commande = value;
    }

    get searchCommande(): CommandeDto {
        return this.commandeService.searchCommande;
    }

    set searchCommande(value: CommandeDto) {
        this.commandeService.searchCommande = value;
    }

    get createDialog() {
        return this.commandeService.createDialog
    }

    set createDialog(value: boolean) {
        this.commandeService.createDialog = value
    }

    get editDialog() {
        return this.commandeService.editDialog
    }

    set editDialog(value: boolean) {
        this.commandeService.editDialog = value
    }

    get viewDialog() {
        return this.commandeService.viewDialog
    }

    set viewDialog(value: boolean) {
        this.commandeService.viewDialog = value
    }

    get selectedCommande(): CommandeDto {
        return this.commandeService.selectedCommande;
    }

    set selectedCommande(value: CommandeDto) {
        this.commandeService.selectedCommande = value;
    }
}
