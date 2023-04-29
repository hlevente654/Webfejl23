import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import {} from '../../shared/services/auth.service';



@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy{

  email = new FormControl('');
  jelszo = new FormControl('');

  loadingObservable?: Observable<boolean>;
  loadingSubscription?: Subscription;

  loading: boolean = false;

  constructor(private router: Router, private authService: AuthService){}

  ngOnDestroy(): void {
    this.loadingSubscription?.unsubscribe();
  }

  ngOnInit(): void{
  }

  async bejelentkezes(){
    this.loading = true;
    let ezEmail : any;
    let ezJelszo : any;

    ezEmail = this.email.value;
    ezJelszo = this.jelszo.value;
    this.authService.bejelentkez(ezEmail, ezJelszo).then(cred => {
      console.log(ezEmail+" "+ezJelszo);
      this.router.navigateByUrl('/products-page');
      this.loading = false;
    }).catch(err => {
      console.log(err);
      this.loading = false;
    });
  }

}import { Observable, from } from 'rxjs';

