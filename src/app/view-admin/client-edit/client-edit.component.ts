import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.scss']
})
export class ClientEditComponent implements OnInit {

  user: any = {};

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getUserInfo(this.route.snapshot.params['id'])
  }

  getUserInfo(id) {
    this.authService.getUserDetail(id).subscribe(data => {
      this.user = data;
      console.log(data);
    })
  }

  updateUser(id) {
    this.authService.updateDetails(id).subscribe(res => {
      // tslint:disable-next-line:no-shadowed-variable
      this.router.navigate(['/client-details', id]);
    }, (err) => {
      console.log(err);
    })
  }

 




}
