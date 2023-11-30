import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
formData: any;
formAction:any;
isModalOpen: boolean = true;
myForm: any;
@Output() formSubmitted: EventEmitter<any> = new EventEmitter<any>();
  constructor(public dialogRef: MatDialogRef<ModalComponent>,private formBuilder: FormBuilder,@Inject(MAT_DIALOG_DATA) public data: any) {}
  ngOnInit() {
    this.myForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      contactemail: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
    });
    if (this.data && this.data.editMode) {
      this.formAction="Edit";
      const  {rowData}  = this.data;
      this.myForm.patchValue({
        name: rowData.contact_name,
        phone: rowData.phone_number,
        contactemail: rowData.contact_email,
        role: rowData.event_role
      });
    }else{
      this.formAction="Add";
    }
  }
  
  

  submitForm() {
    if (this.myForm.valid) {
      const formData = this.myForm.value;
      this.formSubmitted.emit(formData);
      console.log(formData);
      this.closeModal(); // Close modal after emitting form values
    }
  }

  editForm() {
    if (this.myForm.valid) {
      const formData = this.myForm.value;
      this.formSubmitted.emit(formData);
      console.log(formData);
      this.closeModal(); // Close modal after emitting form values
    }
  }
  resetForm(){
    this.myForm.reset();
  }
  closeModal(): void {
    this.isModalOpen=false;
    this.dialogRef.close();
  }
 
}
