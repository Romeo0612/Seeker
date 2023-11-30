import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormlyFieldCustomiseInput } from './customiseinput';
import { FormlyFieldDateTimePicker } from './datetimepicker';
import { FormlyFieldGrid } from './grid';
import { FormlyImageUpload } from './image_input';
import { FormlyFieldLabelView } from './label_view';
import { FormlyFieldLogoUpload } from './logo_upload';
import { FormlyFieldMultiSelect } from './multi_select';
import { FormlyFieldSelectDynamicOptions } from './select_dynamic_options';
import { FormlyFieldTab } from './tab';
import { FormlyFieldVideoInput } from './video_input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FormlyModule } from '@ngx-formly/core';
import { AgGridModule } from 'ag-grid-angular';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { lang } from 'moment';



const formlyConfig = {
  extras: { lazyRender: true, resetFieldOnHide: true },
  validationMessages: [
    { name: 'required', message: 'This field is required' },
  ],

  types: [
    { name: 'tabs', component: FormlyFieldTab },
    { name: 'select_dynamic_options', component: FormlyFieldSelectDynamicOptions },
    // { name: 'html', component: FormlyFieldHtml },
    { name: 'multi_select', component: FormlyFieldMultiSelect },
    { name: 'label_view', component: FormlyFieldLabelView },
    { name: 'logo_upload', component: FormlyFieldLogoUpload },
    { name: 'datetimepicker', component: FormlyFieldDateTimePicker },
    { name: 'customise_input', component: FormlyFieldCustomiseInput },
    { name: 'image_upload', component: FormlyImageUpload },
    { name: 'video_upload', component: FormlyFieldVideoInput },
    { name: 'application_grid', component: FormlyFieldGrid},
    


  ]
}

@NgModule({
  declarations: [
    FormlyFieldTab,
    FormlyFieldLabelView,
    FormlyFieldMultiSelect,
    FormlyFieldSelectDynamicOptions,
    FormlyFieldLogoUpload,
    FormlyFieldDateTimePicker,
    FormlyFieldCustomiseInput,
    FormlyImageUpload,
    FormlyFieldVideoInput,
    FormlyFieldGrid
    

  ],
  imports: [

    BrowserModule,
    CommonModule,
    MatCardModule,
    MatTabsModule,
    // MatDatepickerModule,
    // MatAutocompleteModule,
    MatButtonModule,
    MatNativeDateModule,
    FormsModule,
    BrowserAnimationsModule,
    AgGridModule,
    // M/atDatepickerModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(formlyConfig),
    FormsModule,
    MatChipsModule,
    AngularEditorModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatOptionModule,
    MatFormFieldModule,
    MatDialogModule,
    MatNativeDateModule,
    MatIconModule,
  
  ],
  exports: [
    FormlyFieldTab,
    FormlyFieldLabelView,
    FormlyFieldMultiSelect,
    FormlyFieldSelectDynamicOptions,
    FormlyFieldLogoUpload,
    FormlyFieldDateTimePicker,
    FormlyFieldCustomiseInput,
    FormlyImageUpload,
    FormlyFieldVideoInput,
    FormlyFieldGrid,
    MatIconModule
    
   
  ]
})
export class FormlyExtensionModule { }
