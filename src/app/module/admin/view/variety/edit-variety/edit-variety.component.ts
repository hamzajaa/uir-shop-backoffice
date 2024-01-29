import {Component, OnInit} from '@angular/core';
import {VarietyService} from "../../../../../controller/service/variety.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {VarietyDto} from "../../../../../controller/model/VarietyDto.model";
import {StringUtils} from "../../../../../utils/StringUtils";

@Component({
    selector: 'app-edit-variety',
    templateUrl: './edit-variety.component.html',
    styleUrls: ['./edit-variety.component.scss']
})
export class EditVarietyComponent implements OnInit {

    private _validVarietyVarietyName: boolean = true;
    private _validVarietyVarietyValue: boolean = true;

    constructor(private varietyService: VarietyService,
                private confirmationService: ConfirmationService,
                private messageService: MessageService
    ) {
    }

    ngOnInit(): void {
    }

    edit() {
        this.validateForm();
        if (this.errorMessages.length === 0) {
            console.log(this.variety)
            this.varietyService.edit(this.variety).subscribe({
                next: (variety) => {
                    console.log(variety)
                    const index = this.varieties.findIndex(c => c.idVariety === variety.idVariety);
                    this.varieties[index] = variety;
                    console.log(this.varieties[index])
                    this.editDialog = false;
                },
                error: (err) => {
                    console.log(err)
                }
            })
        }
    }

    public validateForm() {
        this.errorMessages = new Array<string>();
        this.validateVarietyVarietyName();
        this.validateVarietyVarietyValue();
    }

    public validateVarietyVarietyName() {
        if (StringUtils.isEmpty(this.variety.varietyName)) {
            this.errorMessages.push('VarietyName not valid')
            this.validVarietyVarietyName = false;
        } else {
            this.validVarietyVarietyName = true;
        }
    }

    public validateVarietyVarietyValue() {
        if (StringUtils.isEmpty(this.variety.varietyValue)) {
            this.errorMessages.push('VarietyValue not valid')
            this.validVarietyVarietyValue = false;
        } else {
            this.validVarietyVarietyValue = true;
        }
    }

    hideCreateDialog() {
        this.editDialog = false;
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

    get editDialog(): boolean {
        return this.varietyService.editDialog;
    }

    set editDialog(value: boolean) {
        this.varietyService.editDialog = value;
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