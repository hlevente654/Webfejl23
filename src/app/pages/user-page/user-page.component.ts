import { MatButtonModule } from '@angular/material/button';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Products } from '../../shared/models/Products';
import { ProductService } from '../../shared/services/product.service';
import { User } from '../../shared/models/User';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {FormControl, FormGroup} from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { KosarService } from '../../shared/services/kosar.service';
import { Kosar } from '../../shared/models/Kosar';



@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit{

  constructor(private router: Router, private productService: ProductService, private userservice: UserService,
    private authService: AuthService, private kosarService: KosarService){}

    kosar: Kosar = {
      id: "",
      email: "",
      kosarList: ""
    }

  email: string | undefined = "";
  KosarList?: string[];
  ngOnInit(): void {
    const userObj = JSON.parse((localStorage.getItem('user') as string ));
    console.log(userObj.email);
    this.email = userObj.email;
    this.kosarService.getKosarByEmail(userObj.email).subscribe(kosar =>{      
      console.log("Kosar tartalma: "+kosar?.kosarList);
      this.KosarList = kosar?.kosarList.split(";");
    });
  }
  clearKosar(){
    const userObj = JSON.parse((localStorage.getItem('user') as string ));
    var userEmail = "";
    userEmail = userObj.email;
    this.kosarService.deleteKosarByEmail(userEmail).then(() =>{
        this.router.navigateByUrl('/user-page');
    });
  }
  
}
