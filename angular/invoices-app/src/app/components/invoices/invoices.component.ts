import { Component, ViewChild, OnInit } from '@angular/core';
 
import { MatDialog, MatTable } from '@angular/material';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

import { InvoicesAppService } from '../../invoices-app.service';

 
export interface InvoicesData {
  id: number;
  address: string;
  date: string;
  total: number;
}

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {
  
  displayedColumns: string[] = ['id', 'address', 'date', "total",'action'];
  public dataSource;
  
  @ViewChild(MatTable,{static:true}) table: MatTable<any>;
  
  constructor(public dialog: MatDialog, private api: InvoicesAppService) {}

  ngOnInit() {
    this.api.getInvoices().then((response: any) => {
      if (typeof response !== "string"){
        this.dataSource = response;
      }
    });
  }
 
  openDialog(action,obj): void {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '450px',
      data:obj
    });
 
    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addRowData(result.data);
      }else if(result.event == 'Update'){
        this.updateRowData(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }
 
  addRowData(row_obj): void {
    console.log(row_obj, "Row");
    // var d = new Date();
    this.dataSource.push({
      id: row_obj.id,
      address: row_obj.address,
      total: row_obj.total,
      created_on: row_obj.created_on
    });

    this.table.renderRows();
    
  }

  updateRowData(row_obj): void {
    this.dataSource = this.dataSource.filter((value,key)=>{
      if(value.id == row_obj.id){
        value.id = row_obj.id;
        value.address = row_obj.address;
        value.total = row_obj.total;
      }
      return true;
    });
  }

  deleteRowData(row_obj): void{
    this.dataSource = this.dataSource.filter((value,key)=>{
      return value.id != row_obj.id;
    });
  }

  public generatePdf(invoiceID: number): void {
    window.open("http://34.70.104.228:8000/api/invoices/pdf/" + invoiceID + "/", "_blank");
  }

}
