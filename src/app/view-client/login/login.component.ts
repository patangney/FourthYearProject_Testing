import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToasterModule, ToasterService, ToasterConfig, Toast } from 'angular2-toaster';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toasterService: ToasterService
  
  ) { }

  ngOnInit() {
  }

   // tslint:disable-next-line:member-ordering
   public config: ToasterConfig = new ToasterConfig({
    showCloseButton: false,
    tapToDismiss: true,
    timeout: 3000,
    animation: 'fade'
  });

  // tslint:disable-next-line:member-ordering
  
  onLoginSub() {
    const user = {
      username: this.username,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe(data => {
      console.log(data);
      if (data.success) {
        this.authService.storeUserData(data.token, data.user);
        Swal({
          title: 'Success',
          text: 'Logging you in, one moment!',
          type: 'success',
          
        });
        this.router.navigate(['/dashboard']);

      } 

      if (data.msg === 'User not found') {
        this.toasterService.pop('error', 'Error', 'User Not Found!');
        
      }
      if (data.msg === 'Wrong password') {
        this.toasterService.pop('error', 'Error', 'Wrong Password Entered!');
        
      }

    });
  }

}
