import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { }

  // regisztrálás
  regisztracio(email: string, password: string){
    return this.auth.createUserWithEmailAndPassword(email, password);
  }


  // bejelentkezés
  bejelentkez(email: string, password: string ){
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  // kijelentkezés
  kijelentkezes(){
    return this.auth.signOut();
  }
  // bejelentkezettség ellenőrzés
  bejelentkezveE(){
    return this.auth.user;
  }

}
