import {Component, OnInit} from '@angular/core';
import {VarietyService} from "../../../../../controller/service/variety.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {VarietyDto} from "../../../../../controller/model/VarietyDto.model";
import {StringUtils} from "../../../../../utils/StringUtils";

@Component({
  selector: 'app-create-variety',
  templateUrl: './create-variety.component.html',
  styleUrls: ['./create-variety.component.scss']
})
export class CreateVarietyComponent implements OnInit{

  private _validVarietyVarietyName: boolean = true;
  private _validVarietyVarietyValue: boolean = true;

  constructor(private varietyService: VarietyService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
  }

  public save() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.validateForm()
        console.log(this.errorMessages.length)
        if (this.errorMessages.length === 0) {
          this.varietyService.save(this.selectedVariety).subscribe({
            next: (variety) => {
              this.varieties.push({...variety})
              this.createDialog = false;
              this.selectedVariety = new VarietyDto();
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Variety Saved Successfully'
              });

            }
            , error: err => {
              console.log(err);
            }
          })
        } else {
          this.confirmationService.close();
          this.messageService.add({
            severity: 'error',
            summary: 'Errors',
            detail: 'Please correct the errors on the form'
          })
        }
      },
      reject: () => {
        this.messageService.add({severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled'});
      }
    })

  }

  public validateForm() {
    this.errorMessages = new Array<string>();
    this.validateVarietyVarietyName();
    this.validateVarietyVarietyValue();
  }

  public validateVarietyVarietyName() {
    if (StringUtils.isEmpty(this.selectedVariety.varietyName)) {
      this.errorMessages.push('VarietyName not valid')
      this.validVarietyVarietyName = false;
    } else {
      this.validVarietyVarietyName = true;
    }
  }

  public validateVarietyVarietyValue() {
    if (StringUtils.isEmpty(this.selectedVariety.varietyValue)) {
      this.errorMessages.push('VarietyValue not valid')
      this.validVarietyVarietyValue = false;
    } else {
      this.validVarietyVarietyValue = true;
    }
  }

  hideCreateDialog() {
    this.createDialog = false;
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

  get selectedVariety(): VarietyDto {
    return this.varietyService.selectedVariety;
  }

  set selectedVariety(value: VarietyDto) {
    this.varietyService.selectedVariety = value;
  }

  get errorMessages(): string[] {
    return this.varietyService.errorMessages;
  }

  set errorMessages(value: string[]) {
    this.varietyService.errorMessages = value;
  }

  get validVarietyVarietyName(): boolean {
    return this._validVarietyVarietyName;
  }

  set validVarietyVarietyName(value: boolean) {
    this._validVarietyVarietyName = value;
  }

  get validVarietyVarietyValue(): boolean {
    return this._validVarietyVarietyValue;
  }

  set validVarietyVarietyValue(value: boolean) {
    this._validVarietyVarietyValue = value;
  }


}
