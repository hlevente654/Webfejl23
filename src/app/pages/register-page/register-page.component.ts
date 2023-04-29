import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { User } from '../../shared/models/User';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements 
OnInit{

  regForm = new FormGroup({
    email: new FormControl(''),
    jelszo: new FormControl(''),
    jelszoEr: new FormControl('')
  });

  constructor(private authservice: AuthService, private location: Location, private userService: UserService, private router: Router){

  }

  ngOnInit(): void {
  }

  onSubmit(){
    
    console.log("register-page.onSubmit");

    let ezEmail:any;
    ezEmail = this.regForm.get('email')?.value;
    
    let ezJelszo:any;
    ezJelszo = this.regForm.get('jelszo')?.value;

    //console.log(ezEmail+" "+ezJelszo);
    
    this.authservice.regisztracio(ezEmail, ezJelszo).then(cred => {
      console.log(cred);
      const user: User = {
        id: cred.user?.uid as string,
        email: ezEmail,
        username: ezEmail.split('@')[0]
      };
      this.userService.create(user).then(_ =>{
        console.log("New user added");
        this.router.navigateByUrl('/user-page');
      }).catch(err => {
        console.error(err);
      })
    }).catch(err => {
      console.error(err);
    });
    
  }

  vissza(){
    this.location.back();
  }

}
