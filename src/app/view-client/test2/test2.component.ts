import { Component, OnInit, ViewChild } from '@angular/core';
import { ClrWizard } from '@clr/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

    model = {
        name: "",
        username: "",
        password: "",
        number: "",
        address: "",
        address2: "",
        email: ""
    };

    userRegForm = new FormGroup({
        fullName: new FormControl('', Validators.required),
        username: new FormControl('', Validators.required),
        address: new FormGroup({
            streetAddress: new FormControl('', Validators.required),
            streetAddress2: new FormControl('', Validators.required),
        }),
        email: new FormControl('', [
            Validators.required,
            Validators.pattern(this.emailRegex)
        ]),
        password: new FormControl('', [
            Validators.required,
            Validators.pattern(this.passRegex)
        ])
    })

    ngOnInit() { }

}
