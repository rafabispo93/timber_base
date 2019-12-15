import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { InvoicesAppService } from '../../invoices-app.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  public username: string;
  public password: string;


  constructor(private api: InvoicesAppService, private router: Router) { }

  ngOnInit() {
  }

  public login() {
    let data = {
      "username": this.username,
      "password": this.password
    };

    this.api.login(data).then((response: any) => {
      if (response.id) {
        localStorage.setItem("user_id", response.id);
        this.router.navigate(['/invoices']);
      }
    });
  }
}
