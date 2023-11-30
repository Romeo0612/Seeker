import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

import { ColDef, FirstDataRenderedEvent, RowDataTransaction } from 'ag-grid-community';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { ActionButtonComponent1 } from 'src/app/admin/jobs/action-button1';
import { DataService } from 'src/app/service/data.service';
import { ApiService } from 'src/app/service/search.service';
import { v4 as uuidv4 } from 'uuid';
import { ModalComponent } from '../modal/modal.component';
import { ButtonRendererComponent } from './button';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent {
 

  value:any
  companyId:any
  context:any
  frameworkComponents:any
  sarlaryrange:any
  showPopup: boolean = false;
  
  dropdownList:any[] = [];
  rolerange:any
  gridOptions:any
  listContact: any[] = [];
  contactDetails:any[] = [];
  startval:number=0
  columnDefs:any
  formgrp!:FormGroup;
  endval:number=1
  companies:any;
  button:boolean=false;
  flag:boolean=false;
  url:any = null;
  url1: any = null;
  flag1: boolean = true;
  flag2: boolean = true;
  update_id:any
  selectedModel: any;
  contact_name: any;
  contact_email: any;
  private rowDataSubscription: Subscription | any;


  constructor(private http: HttpClient,private calendar: NgbCalendar, private api:ApiService,private cdr: ChangeDetectorRef,private dataService:DataService, private router: Router,private dialog: MatDialog,private fb: FormBuilder,)
  {
   this.value=this.api.getdetails()
   console.log(this.value);
   this.companyId=this.value.unique_id
   console.log(this.companyId);
   this.context = { componentParent: this };

   this.frameworkComponents= {
    buttonRenderer: ButtonRendererComponent,
   };

   
   this.context = { componentParent: this };

this.refrsh()
   this.api.GetALL('salary').subscribe((abc2:any)=>{
     this.sarlaryrange=abc2
   })
   this.api.GetALL('education').subscribe((abc3:any)=>{
     this.dropdownList=abc3


   })
 
   this.api.GetALL('role_category').subscribe((abc4:any)=>{
           this.rolerange=abc4
     this.rolerange.sort((a:any, b:any) => a.category.localeCompare(b.category));



   })
   this.formgrp=this.fb.group({
    // _id:[uuidv4()],
    eventName: ['',Validators.required],
    mode:['',[Validators.required]],
    startdate: ['',Validators.required],
    enddate: ['',Validators.required],
    Description:[''],
    isRegisterMandatory: [false],
    address1:[''],
    street:[''],
    area:[''],
    district:[''],
    pincode:[''],
    Location:[''],
    opening:['',[Validators.required,Validators.pattern(/^[0-9]+$/)]],
    status1:['open'],
    contactName: [''],
    email: [''],
    phoneNumber: [''],
    role: [''],
    fullDescription:['']
    
  })

   }
   ngOnInit(): void{
    this.loadConfig();
    this.rowDataSubscription = this.dataService.getRowData().subscribe((data: any) => {
      this.onEditButtonClick(data);
    });
    
   }
   onModeChange(event: Event) {
    const selectedMode = (event.target as HTMLSelectElement).value;
    const street = this.formgrp.get('street');
    const area = this.formgrp.get('area');
    const district = this.formgrp.get('district');
    const pincode = this.formgrp.get('pincode');
  
    if (selectedMode === 'OFFLINE' && street&& area && district && pincode) {
      street.enable();
      area.enable();
      district.enable();
      pincode.enable();
    } else if (street && area&& district && pincode) {
      street.disable();
      area.disable();
      district.disable();
      pincode.disable();
    }
  }

  emptyvalue(){
    this.formgrp.reset();
  }
  refrsh(){
    debugger
    this.endval=1
    this.startval=0
    console.log(this.value);
    const filterValue1: any = [
      {
        clause: "$and",
        conditions: [
          { column: "companyId", operator: "$eq", value:this.value.unique_id },
        ]
      }
    ];
    // this.api.getDataByFilter("event",filterValue1).subscribe((data:any)=>{
  
    //   console.log(data);
    //   if(data!=null){
    
    //     this.companies = data.map((xyz: any) => ({
    //       ...xyz,
    //       validity: this.formatMonthInNumber(xyz.validity)
    //     }));
    //   }
  
  
    // })
  
  }
  eventbanner:any
  eventlogo:any

  handleFileUpload(id: any, type?: any) {
    const fileInput: any = document.getElementById(id);
    const file = fileInput.files[0];
    // let _id:any = this.formgrp.value['_id']
    // console.log(_id);
    
    const formData = new FormData();
    formData.append('file', file);
    // formData.append('event_id', _id); //seekers or company id
    formData.append('category', type);
    // this.api.finalfileUpload(formData, id).subscribe((res: any) => {
    //   console.log(res);
  if(id=="eventLogo"){
this.eventlogo=formData
  }else{
this.eventbanner=formData
  }
    // })  
    // this.api.finalfileUpload(formData,id).subscribe((res:any)=>{
    //   console.log(res);
  
    // })
  }

  public defaultColDef: ColDef = {
    resizable: true,
  };

  loadConfig() {
    debugger
    
        this.columnDefs = [
         

        {
            "headerName": "Contact Name",
            "field": "contact_name",
            "sortable": true,
            "editable": true,
            "filter": "agTextColumnFilter"
          },
          {
            "headerName": "Phone No",
            "field": "phone_number",
            "sortable": true,
            "editable": true,
            "filter": "agTextColumnFilter"
          },
          {
            "headerName": "Email",
            "field": "contact_email",
            "sortable": true,
            "editable": true,
            "filter": "agTextColumnFilter"
          },
          {
            "headerName": "Role",
            "field": "event_role",
            "sortable": true,
            "editable": true,
            "filter": "agTextColumnFilter"
          },
          {
            headerName: 'Actions',
            cellRenderer: 'buttonRenderer',
            cellRendererParams: {
              onClick: this.onEditButtonClick.bind(this)
      
            }
          }
        ]
        this.columnDefs.forEach((e: any) => {
          if (e.type == "datetime") {
            e.valueGetter = (params: any) =>
              moment(params.data[e.field]).format(e.format || "DD-MM-YYYY h:mm a");
          }
        });
    
        
      }
      onEditButtonClick(data:any) {
  
        const rowData = data; 
        console.log(rowData); 
        const dialogRef = this.dialog.open(ModalComponent, {
          data: { rowData, editMode: true } 
        });
    
        dialogRef.componentInstance.formSubmitted.subscribe((formData: any) => {
         
          this.updateEditedData(formData);
        });
      }
      private updateEditedData(formData: any): void {
     
       this.listContact.push(formData);
       console.log(this.listContact,"update");
      }

      onFirstDataRendered1(params: FirstDataRenderedEvent) {
        params.api.sizeColumnsToFit();
    
      }
      onSelectionChanged1(event: any) {
        this.selectedModel = event.api.getSelectedRows()[0]
    
  
      }
      getContactList(){
        const values: any = {
          contact_name:null,
          phone_number:null,
          contact_email:null,
          event_role:null

        }
       this.listContact.push(values); 
      }
      onCellValueChanged(event:any){
        console.log(event.data);
      }
      onRowValueChanged(event:any){
        console.log(event.data);
      }

      onAddButonClick():void{
       
      
        const dialogRef=this.dialog.open(ModalComponent, {
         // Adjust size as needed
          // You can add more configurations here
        });
        dialogRef.componentInstance.formSubmitted.subscribe((formData: any) => {
          this.openDialog(formData);
        });
    
      }
      openDialog(formData: any): void {
        console.log(formData);
        const value=Object.assign({
          contact_name:formData.name,
          contact_email:formData.contactemail,
          event_role:formData.role,
          phone_number:formData.phone

        })
        this.listContact = [...this.listContact,value];
        // this.contactDetails.push(value);
        // console.log(this.contactDetails);
        // Refresh the grid by setting the updated rowData
        this.gridOptions.api?.setRowData(this.listContact);
   

      }
     
      

  
  onSelectFile(event: any, type?: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
  
      reader.readAsDataURL(event.target.files[0]);
      console.log(type);
      
      if (type==true) {
        reader.onload = (event: any) => {
          this.url = event.target.result;
          // this.flag1 = false;
        }
      } else {
        reader.onload = (event: any) => {
          this.url1 = event.target.result;
          // this.flag2 = false;
        }
      }
    }
  }
  logFormValues() {
    debugger
    // console.log('====================================');
    // console.log(this.formgrp.controls);

    // console.log('====================================');
    if(this.formgrp.valid){
      // var job_id=JSON.stringify(this.jobId+1)
      let cn=this.value.CompanyName
      let address:any
      // console.log(this.value.is_branch_available);
  
      if(!this.value.is_branch_available){
         address=(this.value.area +' '+ this.value.districtname + ' '+this.value.statename+ ' '+this.value.pincode)
        this.formgrp.controls['Location'].setValue(address);
      }


    this.formgrp.controls['status1'].setValue('open');
    let formValues:any=this.formgrp.getRawValue()
    formValues.primaryContact = {
      contactName: this.formgrp.get('contactName')?.value,
      email: this.formgrp.get('email')?.value,
      phoneNumber: this.formgrp.get('phoneNumber')?.value,
      role: this.formgrp.get('role')?.value,
    };
          // Remove individual properties from the main formValues object
    if(formValues.Location==''){
      formValues.Location=this.value.area+ this.value.districtname +this.value.statename+ this.value.pincode
          }
    formValues.companyId=this.companyId;
    // const contactDetails = {
    //   contactName: formValues.contactName,
    //   email: formValues.email,
    //   phoneNumber: formValues.phoneNumber,
    //   role: formValues.role,
    // };
    // formValues.contactDetails = contactDetails;
    console.log(formValues.companyId);
    console.log( this.companyId);
    
    console.log(formValues);
    
    // formValues.applied_job=0
    // let days = JSON.parse(formValues.validity);
    // console.log(days);

    // let currentDate = moment();
    // let newDate = moment(currentDate).add(days, 'days');

    // let date: moment.Moment = newDate;
    // console.log(date.format('YYYY-MM-DD')); // Output the formatted date if needed
 
      console.log(formValues);
delete formValues.contactName;
delete formValues.role;
delete formValues.phone;
delete formValues.email;





        this.api.save('event',formValues).subscribe((xyz:any)=>{
          console.log(xyz);
          console.log("uploaded");
          
          this.refrsh()
          this.formgrp.reset()
          // formData.append('event_id', _id); //seekers or company id
          this.eventlogo.append('event_id',xyz.InsertedID)
          this.api.finalfileUpload(this.eventlogo,'eventLogo').subscribe((res:any)=>{
            console.log(res);
            this.eventbanner.append('event_id',xyz.InsertedID)
          
            this.api.finalfileUpload(this.eventbanner,'eventBanner').subscribe((res:any)=>{
                console.log(res);
                this.router.navigate(['admin/event']); 
            
              })
              
          })
        })
    // else{
    //   if(this.formgrp.valid){
    //     console.log(formValues);

    //     this.api.save('jobs',formValues).subscribe((xyz:any)=>{
    //       console.log(xyz);
    //       this.refrsh()
    //       this.formgrp.reset()
    //     })

    //   }

    // }

    }
  }
  updatevalue() {
    debugger
    let formValues: any = this.formgrp.getRawValue();
    console.log(formValues);
   

    let id = this.update_id._id;
    const originalContactName = formValues.contactName;
    const originalEmail = formValues.email;
    const originalPhoneNumber = formValues.phoneNumber;
    const originalRole = formValues.role;
  
    // Remove the properties from the top level
    delete formValues.contactName;
    delete formValues.email;
    delete formValues.phoneNumber;
    delete formValues.role;
  
    // Assign the properties to the primaryContact object
    formValues.primaryContact = {
      contactName: originalContactName,
      email: originalEmail,
      phoneNumber: originalPhoneNumber,
      role: originalRole,
    };
    
    console.log(id);
    // let originalValidity = formValues.validity
    // console.log(originalValidity);

    // console.log(formValues.MinimumExperience);
    // console.log(formValues.MaximumExperience);

    // if (this.validityFlag == true) {

    //   let currentDate = moment();
    //   let newDate = moment(currentDate).add(formValues.validity, 'days');

    //   let formattedDate: string = newDate.format('YYYY-MM-DD');
    //   console.log(formattedDate);
    //   console.log(newDate);

    //   formValues.validity = formattedDate;
    //   console.log(formValues.validity);
    //   this.validityFlag = false;
    // } else{
    //    formValues.validity = originalValidity.format('YYYY-MM-DD')
    //    console.log(formValues.validity);

    // }
    this.api.update('event', id, formValues).subscribe((xyz: any) => {
      console.log("list",xyz)
      this.refrsh();
      this.formgrp.reset();
      
    });
  }
  cancelButtonClick() {
    // Navigate to the event page or the desired route
    this.router.navigate(['admin/event']); // Replace '/event' with the actual route you want to navigate to
  }

}
