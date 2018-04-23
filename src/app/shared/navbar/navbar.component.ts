import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLinkActive } from '@angular/router';
import { ToasterModule, ToasterService, ToasterConfig, Toast } from 'angular2-toaster';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public navConfig: ToasterConfig = new ToasterConfig({
    showCloseButton: false,
    tapToDismiss: true,
    timeout: 3000,
    animation: 'fade'
  });
  

  constructor(
    public authService: AuthService,
    private router: Router,
    private toasterService: ToasterService

  ) { }
  // tslint:disable-next-line:member-ordering


  ngOnInit() {
  }



  onLogout() {
    this.authService.logout();
    this.toasterService.pop('success', 'Logout', 'You are now logged out');
    setTimeout(() => {
      this.router.navigate(['/login']);
    },
      3000);

  }

}
