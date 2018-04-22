import { Component, OnInit } from '@angular/core';
import { ToasterModule, ToasterService, ToasterConfig, Toast } from 'angular2-toaster';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  name: String;
  username: String;
  email: String;
  password: String;
  number: String;
  address: String;
  address2: String;

  submitted = false;

  constructor(
    private validateService: ValidateService,
    private toasterService: ToasterService,
    private authService: AuthService,
    private router: Router
  ) {
    this.toasterService = toasterService;
  }

  // tslint:disable-next-line:member-ordering
  public config: ToasterConfig = new ToasterConfig({
    showCloseButton: false,
    tapToDismiss: true,
    timeout: 3000,
    animation: 'fade'
  });

  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password,
      number: this.number,
      address2: this.address2,
      address: this.address
    };

    // Fill in a username


    // Fill in all fields
    if (!this.validateService.validateRegister(user)) {
      console.log('');
      this.toasterService.pop('warning', 'Error', 'Please fill in all fields!');
      return false;

    }
    

    if (!this.validateService.validateEmail(user.email)) {
      console.log('');
      this.toasterService.pop('warning', 'Error', 'Please fill in valid email address!');
      return false;

    };


    this.authService.registerUser(user).subscribe(data => {
      if (data.success) {
        Swal({
          title: 'Success',
          text: 'You have successfully registered, please login!',
          type: 'success',
          confirmButtonText: 'Login'
        });
        this.router.navigate(['/login']);
      } else {
        this.toasterService.pop('error', 'Oops!', 'Username / Email address already exists!');
        this.router.navigate(['/test']);

      }
    });



    
  }
  



  ngOnInit() {
  }




}
