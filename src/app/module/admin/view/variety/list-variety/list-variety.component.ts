import {Component, OnInit} from '@angular/core';
import {VarietyService} from "../../../../../controller/service/variety.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {VarietyDto} from "../../../../../controller/model/VarietyDto.model";
import {OrderShippingDto} from "../../../../../controller/model/OrderShippingDto.model";

@Component({
  selector: 'app-list-variety',
  templateUrl: './list-variety.component.html',
  styleUrls: ['./list-variety.component.scss']
})
export class ListVarietyComponent implements OnInit {
  findByCriteriaShow: boolean = false;

  selectedVarieties!: VarietyDto[] | null;


  constructor(private varietyService: VarietyService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.loadVarieties();
  }


  deleteSelectedVarieties() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.varieties = this.varieties.filter((val) => !this.selectedVarieties?.includes(val));
        this.selectedVarieties = null;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Varieties Deleted', life: 3000 });
      }
    });
  }

  editVariety(variety: VarietyDto) {
    this.varietyService.findById(variety).subscribe(variety => {
      this.variety = variety;
      this.editDialog = true;
    })

  }

  public deleteVariety(variety: VarietyDto) {
    this.confirmationService.confirm({
      message: 'Are you sure to delete this variety ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.varietyService.delete(variety).subscribe(number => {

          const position = this.varieties.indexOf(variety);
          position > -1 ? this.varieties.splice(position, 1) : false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Variety deleted successfully',
            life: 3000
          })

        }, error => {
          console.log(error);
        })
      }
    })
  }

  viewVariety(variety: VarietyDto) {
    this.varietyService.findById(variety).subscribe(variety => {
      this.variety = variety;
      this.viewDialog = true;
    })
  }

  loadVarieties() {
    this.varietyService.findAll().subscribe(data => this.varieties = data)
  }

  openNew() {
    this.selectedVariety = new VarietyDto();
    this.createDialog = true;
  }


  get variety(): VarietyDto {
    return this.varietyService.variety;
  }

  set variety(value: VarietyDto) {
    this.varietyService.variety = value;
  }

  get varieties(): Array<VarietyDto> {
    return this.varietyService.varieties;
  }

  set varieties(value: Array<VarietyDto>) {
    this.varietyService.varieties = value;
  }

  get createDialog(): boolean {
    return this.varietyService.createDialog;
  }

  set createDialog(value: boolean) {
    this.varietyService.createDialog = value;
  }

  get editDialog(): boolean {
    return this.varietyService.editDialog;
  }

  set editDialog(value: boolean) {
    this.varietyService.editDialog = value;
  }

  get viewDialog(): boolean {
    return this.varietyService.viewDialog;
  }

  set viewDialog(value: boolean) {
    this.varietyService.viewDialog = value;
  }

  get selectedVariety(): VarietyDto {
    return this.varietyService.selectedVariety;
  }

  set selectedVariety(value: VarietyDto) {
    this.varietyService.selectedVariety = value;
  }

  get searchVariety(): VarietyDto {
    return this.varietyService.searchVariety;
  }

  set searchVariety(value: VarietyDto) {
    this.varietyService.searchVariety = value;
  }

  // get selectedVarieties(): Array<VarietyDto> {
  //   return this.varietyService.selectedVarieties;
  // }
  //
  // set selectedVarieties(value: Array<VarietyDto>) {
  //   this.varietyService.varieties = value;
  // }

}
