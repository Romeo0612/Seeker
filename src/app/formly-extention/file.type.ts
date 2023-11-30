import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { UntypedFormControl } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { FieldType } from "@ngx-formly/core";
// import { HttpService } from "src/app/services/http.service";
@Component({
  selector: "formly-field-file",
  template: `
        <p-fileUpload 
        name="file[]" 
        accept="image/*" 
        [maxFileSize]=20480000 
        [multiple]="true" 
        [fileLimit]="4"
        class="but_size" 
        [customUpload]="true"
        [cancelLabel]="'Remove All'" 
        (uploadHandler)="uploadFiles($event)">
       </p-fileUpload>
  `,
  styleUrls: ["./file.type.scss"]
})
export class FormlyFieldFile extends FieldType implements OnInit {
  // @ViewChild("fileinput") el: ElementRef;
  @Output('onUploadSuccess') onUploadSuccess = new EventEmitter<any>()
  // @Input('listName') listName: string
  category: any


  data: any
  // selectedFiles: File[];
  // override formControl: UntypedFormControl;
  constructor(
    public sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    // private httpService: HttpService,
    private router: Router,
  ) {
    super();
  }
  ngOnInit(): void {
    // this.uploadFiles(this.form);
  }

  // openFileInput() {
  //   this.el.nativeElement.click();
  // }
  // onDelete(index) {
  //   this.formControl.reset();
  //   console.log(this.selectedFiles);
  //   this.selectedFiles.splice(index, 1);

  //   this.formControl.patchValue(this.selectedFiles);
  //   console.log("Form Control Value", this.formControl.value);
  // }
  // onChange(event) {
  //   this.selectedFiles = Array.from(event.target.files);
  //   console.log(this.selectedFiles);
  // }
  getSanitizedImageUrl(file: File) {
    return this.sanitizer.bypassSecurityTrustUrl(
      window.URL.createObjectURL(file)
    );
  }
  isImage(file: File): boolean {
    return /^image\//.test(file.type);
  }

  //image upload 
  uploadFiles(event: any) {
    const form = new FormData();
    for (let file of event.files) {
      form.append(file["name"], file);
    }
    this.route.params.subscribe(params => {
      if (params['form']) {
        this.category = params['form']

      }
    })
    // this.httpService.fileUpload(this.category, form).subscribe(res => {
    //   if (res.status == "UPLOADED") {
    //     this.field.formControl.setValue(res.body.data)
    //   }
    // })
  }


}
