import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';
import { DataService } from '../services/data.service';

@Component({
    selector: 'formly-field-video',
    template: `

    <div>
    <!-- PASSING URL -->
    
    <form [formGroup]="appForm" style="display:flex; ">
    <mat-form-field  style=" width: 33%;
    padding: 10px;
    " appearance="outline">
      <mat-label>Url</mat-label>
      <input type="text" matInput  placeholder="Url" formControlName="url" >
    </mat-form-field>
    
    <!-- DROUP DOWN -->
    
    <mat-form-field style="width: 33%;padding: 10px;" appearance="outline">
      <mat-label>Language</mat-label>
      <!-- <mat-select [(ngModel)]="lang"> -->
        <mat-select formControlName="lang">
        <mat-option *ngFor="let data of langList" [value]="data.lang_code">{{ data.label }}</mat-option>
      </mat-select>
    </mat-form-field>
    </form>
    <button mat-stroked-button style="color: white;background-color: grey;text-align: center; " (click)="addVideo()">
      View Video
    </button>
    
    <!--IFRAME-->
    <div style="padding: 20px;" *ngFor="let data of langList">
      <div><h4>{{data.label}}</h4></div>
        <span style="display:inline-block;" *ngFor="let v of getData(data.lang_code)">
            <!-- {{v.lang}} -->
            <iframe [src]="url"></iframe>
           
        </span>
    
    
    </div>
    </div>

    
  `,
})
export class FormlyFieldVideoInput extends FieldType {
    lang: any
    appForm!: FormGroup
    opt: any;
    url: any
    urlArr: any = []
    languagecode: any
    result: any
    groups: any
    langList: any;
    langArr: any;



    constructor(private sanitizer: DomSanitizer,
       private dataservice:DataService,
       private formBuilder: FormBuilder,) {
        super();
    }
    ngOnInit(): void {
        
        this.getList()
        this.appForm = this.formBuilder.group({
            lang: new FormControl(''),
            url: new FormControl(''),

        })

        //* IMAGE
        this.opt = this.field.props || {};
        this.opt.fileType
    }

    getList() {
        debugger
        this.dataservice.getDataList('language').subscribe((res: any) => {
    
          this.langList = res.data;
          this.langArr = this.langList.filter((a: any) => a.label != "English")
          console.log(this.langArr, "language")
    
        });
      }


    changeValue(value: any) {
        debugger
        this.lang = value.label
        console.log(value.id)
    }



    addVideo() {
        debugger
        var formData = {
            // url:'',
            // lang:'EN'
            url: this.appForm.value.url,
            lang: this.appForm.value.lang
        }
        this.appForm.value
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(formData.url);
        this.urlArr.push(formData)
    }
    


    getData(langCode: string) {
        return this.urlArr.filter((v: any) => v.lang == langCode)
    }

}








