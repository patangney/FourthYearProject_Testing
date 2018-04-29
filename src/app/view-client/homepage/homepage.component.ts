import { Component, OnInit, ViewChild, AfterContentInit, Inject, HostListener } from '@angular/core';
import { NgStyle } from '@angular/common';

import { ClrWizard } from '@clr/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToasterModule, ToasterService, ToasterConfig, Toast } from 'angular2-toaster';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { trigger, transition, useAnimation } from '@angular/animations';
import { slideInLeft, fadeInUp, fadeInDown } from 'ng-animate';
import { DOCUMENT } from '@angular/platform-browser';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  animations: [
    trigger('slideInLeft', [transition('* => *', useAnimation(slideInLeft))]),
    trigger('fadeInUp', [transition('* => *', useAnimation(fadeInUp))]),
    trigger('fadeInDown', [transition('* => *', useAnimation(fadeInDown))]),
  ],
})
export class HomepageComponent implements OnInit {
    navIsFixed: boolean

    @ViewChild("wizard") wizard: ClrWizard;
    @ViewChild("number") numberFi: any;
    
    slideInLeft: any;
    fadeInUp: any;

    // Validation
    emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{3,15})$';
    passRegex = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[a-zA-Z]).{6,20}$';
    phoneNumber = '^\s*(?:(?:00|\+)[\d]{1,3}\s*)?\(?\s*\d{1,4}\s*\)?\s*[\d\s]{5,10}\s*$';
    stringValid = '^[a-zA-Z\-]+$';

    public open: boolean = false;

      

    
    // counties
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
        firstName: new FormControl('', [
            Validators.required,
            Validators.pattern(this.stringValid)            

        ]),
        surname: new FormControl('', [
            Validators.required,
            Validators.pattern(this.stringValid)            

        ]),
        username: new FormControl('', [
            Validators.required,
            Validators.pattern(this.stringValid)            

        ]),
        streetaddress: new FormControl('', [
            Validators.required,
            Validators.pattern(this.stringValid)            

        ]),
        streetaddress2: new FormControl('', [
            Validators.required,
            Validators.pattern(this.stringValid)            

        ]),
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

    constructor(@Inject(DOCUMENT) private document: Document,
        private validateService: ValidateService,
        private toasterService: ToasterService,
        private authService: AuthService,
        private router: Router) {
        this.toasterService = toasterService;
    }
    
    @HostListener("window:scroll", [])

    onWindowScroll() {
        if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
            this.navIsFixed = true;
        } else if (this.navIsFixed && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) { this.navIsFixed = false; } } scrollToTop() { (function smoothscroll() { let currentScroll = document.documentElement.scrollTop || document.body.scrollTop; if (currentScroll > 0) {
                window.requestAnimationFrame(smoothscroll);
                window.scrollTo(0, currentScroll - (currentScroll / 5));
            }
        })();
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
                this.router.navigate(['/home']);

            }
        });

    }

    
    ngOnInit() {

    }

    

}
