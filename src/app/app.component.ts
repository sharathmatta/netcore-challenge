import { AfterViewChecked, Component, OnInit } from '@angular/core';
import carsJson from '../assets/json-data/Cars.json';
import partsJson from '../assets/json-data/ListOfAutoParts.json'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
declare var $ : any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewChecked {
  carsForm: FormGroup;
  fullName = new FormControl(null, [Validators.required,Validators.pattern('^[a-zA-Z ]*$')]);
  brand = new FormControl(null);
  autoParts = new FormControl([], Validators.required);
  color = new FormControl(null, Validators.required);
  carsList: any[] = carsJson ;
  partsList: any[] = partsJson;
  brandChaneInit = false
  partChaneInit = false
  constructor(
    private fb: FormBuilder
  ) {
    this.carsForm = this.fb.group({
      fullName: this.fullName,
      brand: this.brand,
      autoParts: this.autoParts,
      color: this.color
    });
  }
  ngOnInit(): void {

  }
  ngAfterViewChecked(): void {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
    $('.brand-select').chosen({
      width: '250px',
    });
    if (!this.brandChaneInit) {
      $('.brand-select').on('change', (e: any, parms: any) => {
        this.changeBrand(e, parms);
      });
      this.brandChaneInit = true;
    }
    $('.part-select').chosen({
      width: '250px',
    });
    if (!this.partChaneInit) {
      $('.part-select').on('change', (e: any, parms: any) => {
        this.changeParts(e, parms);
      });
      this.partChaneInit = true;
    }
  }

  changeBrand(evt: any, params: any) {
    this.brand.setValue(params.selected)
  }
  changeParts(evt: any, params: any) {
    if (params['selected']) {
      let parts = [
        ...this.autoParts.value,
        params['selected']
      ];
      this.autoParts.setValue(parts);
    }
  }
  onSubmit() {
    console.log(this.color)
  }
}
