// button-renderer.component.ts

import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { DataService } from 'src/app/service/data.service';


@Component({
  selector: 'app-button-renderer',
  template: `
  <div>
    <button (click)="onButtonClick()">
      <i class="material-icons">edit</i>
    </button>
    <button (click)="onDeleteClick()">
      <i class="material-icons">delete</i>
    </button>
  </div>
`,
styles: [
  `
  button {
    background: none;
    border: none;
    cursor: pointer;
    outline: none;
    margin-right: 10px; /* Adjust margin as needed */
  }

  i.material-icons {
    vertical-align: middle;
  }
  `
]
})
export class ButtonRendererComponent implements ICellRendererAngularComp {
  private params: any;
  constructor(private dataService: DataService) {}
  agInit(params: any): void {
    this.params = params;
  } 

  onButtonClick(): void {
    const rowData = this.params.data;
    this.dataService.sendRowData(rowData);
  }
  onDeleteClick(){
    console.log("row delete");
  }

  refresh(params: any): boolean {
    return false;
  }
}
