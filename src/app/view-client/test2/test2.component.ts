import { Component, OnInit, ViewChild } from '@angular/core';
import { ClrWizard } from '@clr/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToasterModule, ToasterService, ToasterConfig, Toast } from 'angular2-toaster';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
    moduleId: module.id,
    selector: 'app-test2',
    templateUrl: './test2.component.html',
    styleUrls: ['./test2.component.scss']
})
export class Test2Component implements OnInit {

    @ViewChild("wizard") wizard: ClrWizard;
    @ViewChild("number") numberFi: any;

    // Validation
    emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
    passRegex = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[a-zA-Z]).{6,20}$';
    phoneNumber = '^\s*(?:(?:00|\+)[\d]{1,3}\s*)?\(?\s*\d{1,4}\s*\)?\s*[\d\s]{5,10}\s*$';

    public open: boolean = true;





    myCounty = [
        { id: 1, county: 'Kerry' },
        { id: 2, county: 'Cork' },
        { id: 3, county: 'Donegal' },
        { id: 4, county: 'Dublin' },
        { id: 5, county: 'Galway' },
    ];

    model = {
        firstname: "",
        surname: "",
        username: "",
        password: "",
        phonenumber: "",
        addressline1: "",
        addressline2: "",
        addressline3: "",
        housename: "",
        county: this.myCounty,
        email: ""
    };

    userRegForm = new FormGroup({
        firstName: new FormControl('', Validators.required),
        surname: new FormControl('', Validators.required),
        username: new FormControl('', Validators.required),
        streetaddress: new FormControl('', Validators.required),
        streetaddress2: new FormControl('', Validators.required),
        optionalValidation: new FormControl('', Validators.maxLength(50)),
        selectCounty: new FormControl('', Validators.required),

        email: new FormControl('', [
            Validators.required,
            Validators.pattern(this.emailRegex),
            Validators.maxLength(50)
        ]),
        password: new FormControl('', [
            Validators.required,
            Validators.pattern(this.passRegex),
            Validators.maxLength(30)
        ]),
        phoneNumValid: new FormControl('', [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10)
        ])

    })

    public config: ToasterConfig = new ToasterConfig({
        showCloseButton: false,
        tapToDismiss: true,
        timeout: 3000,
        animation: 'fade'
    });

    constructor(
        private validateService: ValidateService,
        private toasterService: ToasterService,
        private authService: AuthService,
        private router: Router) {
        this.toasterService = toasterService;
    }

   

    onRegisterSubmit() {
        const user = {
            firstname: this.model.firstname,
            surname: this.model.surname,
            username: this.model.username,
            password: this.model.password,
            phonenumber: this.model.phonenumber,
            addressline1: this.model.addressline1,
            addressline2: this.model.addressline2,
            addressline3: this.model.addressline3,
            housename: this.model.housename,
            county: this.model.county,
            email: this.model.email
        }

        // Fill in all fields
        // if (!this.validateService.validateRegister(user)) {
        //     console.log('');
        //     this.toasterService.pop('warning', 'Error', 'Please fill in all fields!');
        //     return false;

        // }


        // if (!this.validateService.validateEmail(user.email)) {
        //     console.log('');
        //     this.toasterService.pop('warning', 'Error', 'Please fill in valid email address!');
        //     return false;

        // };


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
                this.router.navigate(['/test2']);

            }
        });

    }





    ngOnInit() {

    }

}
