import { Component, OnInit } from '@angular/core';
import { InvoicesAppService } from '../../invoices-app.service';
import { Router } from "@angular/router"

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  public name: string;
  public email: string;
  public password:string;

  constructor(private api: InvoicesAppService, private router: Router) {
   }

  ngOnInit() {
  }

  public register(): void {
    let data = {
      "name": this.name,
      "email": this.email,
      "password": this.password
    };

    this.api.postCustomer(data).then((response: any) => {
      this.router.navigate(['/login']);
    });
  }
}