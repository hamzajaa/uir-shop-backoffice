import {Component, OnInit} from '@angular/core';
import {VarietyService} from "../../../../../controller/service/variety.service";
import {VarietyDto} from "../../../../../controller/model/VarietyDto.model";

@Component({
  selector: 'app-view-variety',
  templateUrl: './view-variety.component.html',
  styleUrls: ['./view-variety.component.scss']
})
export class ViewVarietyComponent implements OnInit {

  constructor(private varietyService: VarietyService) {
  }

  ngOnInit() {
  }

  get variety(): VarietyDto {
    return this.varietyService.variety;
  }

  set variety(value: VarietyDto) {
    this.varietyService.variety = value;
  }

  get viewDialog(): boolean {
    return this.varietyService.viewDialog;
  }

  set viewDialog(value: boolean) {
    this.varietyService.viewDialog = value;
  }
}