import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClrWizard } from '@clr/angular';
import { ToasterModule, ToasterService, ToasterConfig, Toast } from 'angular2-toaster';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  @ViewChild("wizard") wizard: ClrWizard;

  mdOpen: boolean = true;
  loadingFlag: boolean = false;
  errorFlag: boolean = false;

  model = {
    fname: "",
    sname: "",
    username: "",
    pnumber: "",
    email: "",
    password: ""
  };

  public config: ToasterConfig = new ToasterConfig({
    showCloseButton: false,
    tapToDismiss: true,
    timeout: 3000,
    animation: 'fade'
  });

  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private toasterService: ToasterService,
    private router: Router
  ) { }

  public doCustomClick(buttonType: string): void {
    if ("custom-next" === buttonType) {
      this.wizard.next();
    }

    if ("custom-previous" === buttonType) {
      this.wizard.previous();
    }

    if ("submit" === buttonType) {
      const user = {
        fname: this.model.fname,
        sname: this.model.sname,
        username: this.model.username,
        email: this.model.email,
        password: this.model.password,
        pnumber: this.model.pnumber
      }

      if (!this.validateService.validateRegister(user)) {
        console.log('Please fill in all fields!')
        this.toasterService.pop('warning', 'Error', 'Please fill in all fields!');
      }

      if (!this.validateService.validateEmail(user.email)) {
        console.log('Please input a valid email')
      }

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
          this.toasterService.pop('warning', 'Oops!', 'Something went wrong =[');
          this.router.navigate(['/register']);
  
        }
      });

    }

  }

  onSubmit() {
    const user = {
      fname: this.model.fname,
      sname: this.model.sname,
      username: this.model.username,
      email: this.model.email,
      password: this.model.password,
      pnumber: this.model.pnumber
    }

    if (!this.validateService.validateRegister(user)) {
      console.log('Please fill in all fields!')
    }

    if (!this.validateService.validateEmail(user.email)) {
      console.log('Please input a valid email')
    }

    this.authService.registerUser(user).subscribe(data => {
      if (data.success) {
        console.log('Data submitted to server');
        this.router.navigate(['/login']);
      } else {
        console.log('Oops something went wrong');
        this.router.navigate(['/home'])
      }


    })

  }





  doCancel(): void {
    this.wizard.close();
  }



  ngOnInit() {

  }

}
