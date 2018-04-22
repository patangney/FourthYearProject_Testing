import { Component, OnInit, ViewChild, Input, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
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
  @ViewChild('wizard') wizard: ClrWizard;
  @Input() FormData;

  mdOpen: boolean = true;
  submitted = false;

  formModel = {
    name: '',
    username: '',
    email: '',
    password: '',
    number: '',
    address: '',
    address2: '',
  }

  userForm: FormGroup;

  // Validation
  emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
  passRegex = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[a-zA-Z]).{6,20}$';
  phoneNumber = '^\s*(?:(?:00|\+)[\d]{1,3}\s*)?\(?\s*\d{1,4}\s*\)?\s*[\d\s]{5,10}\s*$';




  // ) {
  //   this.toasterService = toasterService;
  // }

  constructor(
    private validateService: ValidateService,
    private toasterService: ToasterService,
    private authService: AuthService,
    private router: Router,
    @Inject(FormBuilder) fb: FormBuilder) {

    this.userForm = fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [
        <any>Validators.required,
        <any>Validators.pattern(this.emailRegex)
      ]],
      password: ['', [
        <any>Validators.required,
        <any>Validators.pattern(this.passRegex)
      ]],
      address: ['', Validators.required],
      address2: ['', Validators.required],
      number: ['', [
        Validators.required,
        Validators.pattern(this.phoneNumber),
        Validators.minLength(3),
        Validators.maxLength(10),
      ]],

    })
  }





  //

  // userForm = new FormGroup({

  //   name: new FormControl('', Validators.required),
  //   username: new FormControl('', Validators.required),
  //   password: new FormControl('', [
  //     Validators.required,
  //     Validators.pattern(this.passRegex)
  //   ]),
  //   email: new FormControl('', [
  //     <any>Validators.required,
  //     <any>Validators.pattern(this.emailRegex)

  //   ]),
  //   number: new FormControl('', [
  //     <any>Validators.required,
  //     Validators.minLength(10),
  //     Validators.maxLength(10)
  //   ]),
  //   useraddress: new FormGroup({
  //     address: new FormControl('', Validators.required),
  //     address2: new FormControl('', Validators.required),
  //   })


  // })

  // submitted = false;



  // constructor(
  //   private validateService: ValidateService,
  //   private toasterService: ToasterService,
  //   private authService: AuthService,
  //   private router: Router
  // ) {
  //   this.toasterService = toasterService;
  // }

  // tslint:disable-next-line:member-ordering
  public config: ToasterConfig = new ToasterConfig({
    showCloseButton: false,
    tapToDismiss: true,
    timeout: 3000,
    animation: 'fade'
  });

  onCustomClick(buttonType: string): void {
    if ("custom-next" === buttonType) {
      this.wizard.next();
    }
  }

  onRegisterSubmit() {
    const user = {
      name: this.formModel.name,
      email: this.formModel.email,
      username: this.formModel.username,
      password: this.formModel.password,
      number: this.formModel.number,
      address2: this.formModel.address2,
      address: this.formModel.address
    };

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
        Swal({
          title: 'Something went wrong ',
          text: 'Username / Email Already exits',
          type: 'warning'
        });
        window.location.reload();
      }
    });
  }



  doCancel(): void {
    this.wizard.close();
  }



  ngOnInit() {

  }

}
