import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  user: Object;


  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {

    this.loadUsers();

  }

  public loadUsers() {
    this.authService
    .getUsers()
    .subscribe((data) => {
      this.user = data;
      
    },
      err => {
        console.log(err);
        return false;
      });
  }
  
}
