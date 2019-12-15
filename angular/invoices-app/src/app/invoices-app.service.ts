import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class InvoicesAppService {

  private BASE_URL: string = "http://0.0.0.0:8000/api";

  constructor(private http:HttpClient) { }

  public getCustomers(): any {
    return new Promise((resolve, reject) => {
      this.http.get(this.BASE_URL + '/customer/', { headers: { 'Content-Type': 'application/json'}})
        .subscribe(response => {
          resolve(response);
        }, error => {
          resolve(error);
        });
    });
  }

  public postCustomer(data): any {
    return new Promise((resolve, reject) => {
      this.http.post(this.BASE_URL + '/customer/', data, { headers: { 'Content-Type': 'application/json'}})
        .subscribe(response => {
          resolve(response);
        }, error => {
          resolve(error);
        });
    });
  }

  public login(data): any {
    return new Promise((resolve, reject) => {
      this.http.post(this.BASE_URL + '/customer/login/', data, { headers: { 'Content-Type': 'application/json'}})
        .subscribe(response => {
          resolve(response);
        }, error => {
          resolve(error);
        });
    });
  }

  public getInvoices(): any {
    return new Promise((resolve, reject) => {
      this.http.get(this.BASE_URL + '/invoices/customer/' + localStorage.getItem("user_id") + "/", { headers: { 'Content-Type': 'application/json'}})
        .subscribe(response => {
          resolve(response);
        }, error => {
          resolve(error);
        });
    });
  }
}
