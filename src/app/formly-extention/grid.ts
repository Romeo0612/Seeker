

import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ColDef } from 'ag-grid-community';
import * as moment from 'moment';
import { ApiService } from '../service/search.service';


@Component({
    selector: 'formly-imageupload',
    template: `

    <div style=" width: 100%;">
    <div 
    style="
      height: 30px;
      margin: 30px;
      text-align: center;
      display: flex;
      flex-direction: row;
    "
  >
    <h2 style="font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-weight:bold;
    font-size: xx-large;
    flex: 1 1 auto">{{ pageHeading }} List</h2>
    <div>
      <button style="  background-color: transparent;"
        class="icon"
        matTooltip="Add"
        mat-mini-fab
        (click)="onAddButonClick()"
        style="
          margin-right: 20px;
          background-color: rgb(237, 28, 36);
          color: white;
        "
      >
        <mat-icon>add</mat-icon>
      </button>
    </div>
  </div>


    <ag-grid-angular
    #agGrid
    style="width: auto; height: calc(100vh - 250px); flex: 1 1 auto"
    class="ag-theme-alpine"
    [defaultColDef]="defaultColDef"
    [columnDefs]="columnDefs"
    [rowData]="listData"
    [rowSelection]="'single'"
    [pagination]="true"
    [paginationPageSize]="15"
    [context]="context"
    (firstDataRendered)="onFirstDataRendered($event)"
    [components]="frameworkComponents"
    (selectionChanged)="onSelectionChanged($event)"
    
  ></ag-grid-angular>
  </div>

  <ng-template
  #editViewPopup
  class="example-sidenav"
  mode="over"
  style="height: auto"
>
<div class="page">
  <div style="text-align-last: end">
    <mat-icon (click)="close_icon()">close</mat-icon>
  </div>
 
</div>
  <div class="center" style="width: 100%" *ngIf="formAction == 'view'">
    <h2 class="page-title">{{ pageHeading }}</h2>
    <formly-form [model]="selectedModel" [fields]="fields"></formly-form>
  </div>
</ng-template>

`,
})
export class FormlyFieldGrid extends FieldType implements AfterViewInit, OnInit {
    selectionChanged: any;
    frameworkComponents: any;
    firstDataRendered: any;

    context: any;
    listData: any;
    columnDefs: any;

    selectedModel: any = {}
    formAction: string = "add"
    listName!: string;
    collectionName!: string;

    config: any;
    pageHeading: any;


    lagnguage: any
    addEditMode: string = "popup";
    fields: any;
    selectedRow: any = {};
    loading: boolean = false;

    gridApi: any;



    @ViewChild("editViewPopup", { static: true }) editViewPopup!: TemplateRef<any>;
    formName!: string

    docBasePath = ''
    ngAfterViewInit(): void {
    }

    constructor(

        private dataservice: ApiService,
        // private dialogService: DialogService,
        private router: Router,
        private route: ActivatedRoute,
        private httpclient: HttpClient,
        // private DataService: DataService,
        // private article_info: ArticleInformationService,


    ) {
        super();
        this.context = { componentParent: this };
        debugger
    
        // console.log(article_info.getJSONData(),"data")
        // this.frameworkComponents = {
        //   buttonRenderer: ActionButtonComponent,
        // };
        this.route.params.subscribe((params) => {
          if (params["form"]) {
            this.listName = params["form"];
            this.formName = this.listName
            this.loadConfig();
          }
        });
    }

    ngOnInit() {
        
    }


    public defaultColDef: ColDef = {
        resizable: true,
    };

    onFirstDataRendered(params: any) {
        params.api.sizeColumnsToFit();
    }


    loadConfig() {
        debugger
        this.httpclient
            .get("assets/jsons/application_variant-list.json")
            .subscribe((config: any) => {
                this.config = config;
               
                this.collectionName = config.collectionName
                this.pageHeading = config.pageHeading;
                this.addEditMode = config.addEditMode;
                this.fields = [];
                
                this.columnDefs = this.config.columnDefs;
                this.columnDefs.forEach((e: any) => {
                    if (e.type == "datetime") {
                        e.valueGetter = (params: any) =>
                            moment(params.data[e.field]).format(e.format || "DD-MM-YYYY h:mm a");
                    }
                    
                });
                //get list of records for specific collection/table
                this.getList();
            });
    }



    getList() {
        debugger
        this.dataservice.getDataList(this.collectionName).subscribe((res: any) => {
            this.listData = res.data;
            if (this.collectionName == "language") {
                this.lagnguage = res.data;
                localStorage.setItem("language", this.lagnguage);
                console.log(this.lagnguage)
            }
            console.log(res)
        });
    }

    onSelectionChanged(event: any) {
        this.selectedRow = event.api.getSelectedRows()[0]
        this.selectedModel = this.selectedRow
    }

    onAddButonClick() {
        debugger
        this.selectedModel = {}
        this.formAction = "add"
    if(this.listName=="application_variant"){
     
        this.router.navigate(['/add/application_variant'])}
        else{
        this.doAction()}
    // this.doAction()
      }
    




      onActionButtonClick(item: any, data: any,collectionName:any) {
        debugger
        this.selectedModel = this.selectedRow
        this.formAction = item.label.toLowerCase()
    
        this.formName = item.formName
        let id = this.config.keyField
        if (this.formAction == "add") {
          this.selectedModel = {}
          this.doAction()
        }
        else if (this.formAction == "edit" || this.formAction == "notification") {
          if(this.listName=="application_variant"){
                  // this.article_info.setJSONData(data)
                  let id=data.app_code
                  this.router.navigate(['/edit/application_variant/', data[this.config.keyField]])}else{
                    this.doAction(data, id)
                  }
          // this.doAction(data, id)
        }
        
        else if (this.formAction == "view") {
          this.httpclient
            .get("assets/jsons/" + this.formName + ".json")
            .subscribe((frmConfig: any) => {
              this.fields = frmConfig.form.fields
              this.pageHeading = frmConfig.pageHeading;
              this.doAction(data, data[id])
            });
        } else if (this.formAction == "delete") {
          if (confirm("Do you wish to delete this record?")) {
    
          }
        }
        // else if (this.formAction == "notification email") {
        //   this.doAction()
        //   // alert("hello")
    
        // }
      }



    close(event: any) {
        // this.dialogService.closeModal()
        this.fields = undefined
        if (event) {
            if (event.action == 'Add') {
                this.listData.push(event.data)
                this.listData = [...this.listData]
            } else {
                this.getList()
            }
        }
    }

    doAction(data?: any, id?: string) {
        if (this.config.editMode == 'popup') {
            debugger
            // this.dialogService.openDialog(this.editViewPopup, this.config.screenWidth, null, data);
        }
        else {
            if (this.formAction == "add") {
                this.router.navigate([`${this.config.addRoute}`])
            }
            else {
                this.router.navigate([`${this.config.editRoute}`, data[this.config.keyField]])
            }
        }
    }

    close_icon() {
        // this.selectedRow = {}
        // this.dialogService.closeModal()
    }



}
