import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router ,ActivatedRoute} from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ApiService } from 'src/app/service/search.service';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.css']
})
export class EventViewComponent {
  data: any;
  details: any;
  editorConfig: AngularEditorConfig = {
    editable: true,
    height: '130px',
    spellcheck: true,
    translate: 'yes',
    fonts: [
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' }
    ],
    toolbarHiddenButtons: [
      ['customClasses', 'insertImage', 'insertVideo', 'removeFormat', 'underline', 'heading', 'insertHorizontalRule', 'link', 'insertOrderedList',
        'toggleEditorMode', 'bold', 'italic', 'strikeThrough', 'backgroundColor', 'textColor', 'textColor', 'unlink', 'fontSize']
    ]
  };

  constructor(private auth: ApiService,private route:ActivatedRoute, private router: Router, private fb: FormBuilder) {
    // this.details = this.auth.getdetails();
    this.route.params.subscribe((params) => {
     console.log(params["id"]);
     this.auth.getbyid('event', params["id"]).subscribe((xyz: any) => {
      console.log(xyz);
      this.data = xyz;
    });  
    });    
   
  }

  routeFunction() {
    this.router.navigateByUrl('admin/edit-profile');
  }

}
