import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';




import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { AdminRoutingModule } from '../admin/admin-routing.module';
import { AppliedJobsComponent } from './applied-jobs/applied-jobs.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import {MatSliderModule} from '@angular/material/slider';

import { HomeComponent } from './home/home.component';


import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EventListComponent } from './event-list/event-list.component';
import { EventViewComponent } from './event-view/event-view.component';
import { ModalComponent } from './modal/modal.component';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ProfileUpdateComponent } from './profile-update/profile-update.component';
import { FormlyExtensionModule } from '../formly-extention/formly-extention.module';
import { LayoutModule } from 'app/shared/layout/layout.module';



@NgModule({
  declarations: [



HomeComponent,
    AppliedJobsComponent,

// CategoryComponent,
JobDetailsComponent,
 EventListComponent,
 EventViewComponent,
 ModalComponent,
 ProfileUpdateComponent 






  ],
  imports: [
  
    CommonModule,
    MatDialogModule,
    LayoutModule,
    DashboardRoutingModule,MatSliderModule,MatIconModule,MatTabsModule,MatInputModule, MatProgressBarModule,
    MatIconModule,MatTabsModule, MatIconModule, MatButtonModule,MatSliderModule,
    MatStepperModule,
    MatCardModule,
    AdminRoutingModule, AgGridModule,ReactiveFormsModule,FormsModule,NgMultiSelectDropDownModule.forRoot(),
    CommonModule,AngularEditorModule,MatIconModule,MatTabsModule, MatIconModule, MatButtonModule,MatSliderModule,
    MatStepperModule,
    MatCardModule,
    FormsModule,
     MatRadioModule,
    MatFormFieldModule,NgbModule,

    MatInputModule, MatProgressBarModule,
    AdminRoutingModule, AgGridModule,FormsModule,NgMultiSelectDropDownModule.forRoot(),
 
    // FormlyExtensionModule
  ],
  exports:[

  ]
})
export class DashboardModule { }

