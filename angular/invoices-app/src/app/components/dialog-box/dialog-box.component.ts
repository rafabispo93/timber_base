import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { InvoicesAppService } from '../../invoices-app.service';


export interface InvoicesData {
  id: number;
  address: string;
  date: string;
  total: number;
}

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit {

  action:string;
  local_data:any;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    private api: InvoicesAppService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: InvoicesData
  ) { 
    console.log(data);
    this.local_data = {...data};
    this.action = this.local_data.action;
  }

  ngOnInit() {
  }

  doAction(){
    let data = {};
  
    if (this.action === "Add"){
      data = {
        "address": this.local_data.address,
        "total": this.local_data.total,
        "customer": parseInt(localStorage.getItem("user_id"))
      };

      this.api.postInvoice(data).then((response: any) => {
        this.local_data.created_on = response.created_on;
        this.local_data.id = response.id;
      });

    }else if (this.action === "Update") {
      data = {
        "address": this.local_data.address,
        "total": this.local_data.total,
        "customer": parseInt(localStorage.getItem("user_id"))
      };

      this.api.updateInvoice(data, this.local_data.id).then((response: any) => {
        this.local_data.created_on = response.created_on;
        this.local_data.id = response.id;
      });
    } else if (this.action === "Delete") {
      this.api.deleteInvoice(this.local_data.id).then((response: any) => {
      });
    }
    this.dialogRef.close({event:this.action,data:this.local_data});
  }
 
  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

}
