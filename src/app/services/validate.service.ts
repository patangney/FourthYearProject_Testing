import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  
  validateRegister(user) {
    // tslint:disable-next-line:triple-equals
    if (user.name == undefined || 
      user.email == undefined || 
      user.username == undefined || 
      user.password == undefined ||
      user.number == undefined ||
      user.address == undefined ||
      user.address2 == undefined 
    ) {
      return false;
    } else {
      return true;
    }
  }

  


  validateEmail(email) {
    // tslint:disable-next-line:max-line-length
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

}
