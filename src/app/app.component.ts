import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from './shared/services/auth.service'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Csempebolt';

  page = '';
  routes: Array<string> = [];
  loggedInUser?: firebase.default.User | null;


  constructor(private router: Router, private authservice: AuthService){}

  
  ngOnInit(){

    this.routes = this.router.config.map(conf => conf.path) as string[];

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((evt:any) => {
      const currentPage = (evt.urlAfterRedirects as string).split('/')[1] as string;
      if(this.routes.includes(currentPage)){
        this.page = currentPage
      }
    });
    this.authservice.bejelentkezveE().subscribe(user => {
      console.log(user);
      this.loggedInUser = user;
      localStorage.setItem('user', JSON.stringify(this.loggedInUser));
    }, err => {
      console.log(err);
      localStorage.setItem('user', JSON.stringify('null'));
    });
  }
  
  // sidenav kezelő elemek


  oldalValtas(selectedPage: string){
    this.router.navigateByUrl(selectedPage);
  }

  oldalbarKapcs(sidenav: MatSidenav){
    sidenav.toggle();
  }

  bezarason(event: any, sidenav: MatSidenav){
    if(event == true){
      sidenav.close();
    }
  }

  kijelentkezes(_?: boolean){
    this.authservice.kijelentkezes().then(() => {
      console.log("Kijelentkezés");
    }).catch(err => {
      console.log(err);
    })
  }

  //Szépítés
  backgroundColor = 'gray';

  onMouseEnter() {
    this.backgroundColor = 'lightblue';
  }

  onMouseLeave() {
    this.backgroundColor = 'gray';
  }
  
  
  
}

