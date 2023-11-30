import { DatePipe } from '@angular/common';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';
import { DataService } from '../services/data.service';
import { environment } from '../../environments/environment';
import { DialogService } from '../services/dialog.service';
import { Pipe, PipeTransform } from '@angular/core';
import { transform } from 'lodash';


@Component({
    selector: 'formly-imageupload',
    template: `

<div style="display: flex;">

  <input
    #myInput
    type="file"
    multiple
    (change)="onFileSelected($event.target)"
    accept=".jpg, .png" 
  />

  <br />
  <button
  style="height: 25px;"
  mat-raised-button color="warn"  
    (click)="uploadFiles()"
    [disabled]="!imageList.length">
    <span class="glyphicon glyphicon-upload"></span> Upload
  </button>


 
  </div>
 
  <div style="display:flex;flex-direction: row;">
  <div style="flex:1 0 auto;width:100px;border: 1px solid #dddd;height:50%" *ngFor="let image of imageLists;let index = index">
    <span>
    <img [src]="image" alt="Image" style="aspect-ratio: auto;">
      <mat-icon (click)="removeSelectedFile(index)">delete</mat-icon>
    </span>
  </div>
</div>


<div style="display:flex;flex-direction: row;" *ngIf="files.length>0">
<span>Uploaded Images</span>
<div *ngFor="let data of files" style="margin: 2px; display:flex">
<span style="display:inline-block;"><img src={{docBasePath}}{{data.path}} alt="Image" ></span>
</div>
</div>

`,
})
export class FormlyImageUpload extends FieldType implements AfterViewInit, OnInit {

    fileData: any[] = [];
    imageList: any[] = [];
    imageLists: any[] = [];
    data: any
    opt: any;
    files: any[] = [];
    docBasePath = environment.docBaseUrl
    ngAfterViewInit(): void {
    }

    constructor(private datePipe: DatePipe,
        private dataservice: DataService,
        private dialogService: DialogService
    ) {
        super();
    }

    ngOnInit(): void {
        this.opt = this.field.props || {};
        this.opt.fileType
        this.getImages()
    }

   

    public onFileSelected(event: any) {
        
        //upload files to the server
        // Call API
        for (const file of event.files) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            this.imageList.push(file)
            this.imageLists.push(reader.result)
            // reader.result
            
          }
        }
    
      }

    



    uploadFiles() {
        debugger
        var formData = new FormData();
        for (const file of this.imageList) {
            formData.append("file", file);
        }
        // this.field.model["model_no"]
        this.dataservice.postData(this.opt.endPoint + "/" + "AC001", formData).subscribe((res: any) => {
            if (res.success == 1) {
                // this.files = this.files.concat(res.data)
                // this.files = [...this.files]
                this.dialogService.openSnackBar("Image has been uploaded successfully", "OK")

            } else {
                alert('Error')
            }
        })

    }

  
    getImages() {
        // this.dataservice.getDataById(this.opt.endPoint, this.field.model["id"]).subscribe((res: any) => {
        //     this.files = [...res?.data]
        // });
        debugger
        this.dataservice.getDataById(this.opt.endPoint, "AC001").subscribe((res: any) => {
          this.files = [...res?.data]
      });
    }

    removeSelectedFile(index: any) {
      debugger
      this.imageList.splice(index, 0);
    }

    formatFileSize(bytes: number, decimalPoint: number) {
        if (bytes == 0) return '0 Bytes';
        var k = 1000,
            dm = decimalPoint || 2,
            sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
    
}
