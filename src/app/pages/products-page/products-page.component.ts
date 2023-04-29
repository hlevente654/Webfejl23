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
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnInit{
  

  loadingImages : boolean = false;
  counter = 0;
  products = new Array<Products>;
  productImages: string[] = [];

@Input() imageInput?: Products;
  loadedImage?: string;
  user?: User;


  constructor(private router: Router, private productService: ProductService, private userservice: UserService,
    private authService: AuthService, private kosarService: KosarService){}
  
  ngOnInit(): void {
    this.productService.loadAllProducts().then(products => {
      this.products = products;

      
      this.products.forEach(product => {
        this.productService.loadImage(product.image_url).subscribe(data => {
          product.image_url = data;
          this.counter++;

          if (this.counter === this.products.length) {
            this.loadingImages = true;
          }
        });
      });
        
    });
}


  
  regForm = new FormGroup({
    mennyiseg : new FormControl(''),
    dologNev: new FormControl('ismeretlen')
  });
  setDologNev(dolog: string){
    this.regForm.get('dologNev')?.setValue(dolog);
  }
  onSubmit(){
    this.authService.bejelentkezveE().subscribe(user =>{
      // kérjük le a mennyiséget
      // ha van és még nincs ilyen termék benne akkor tegyünk bele
      // ha van már benne ilyen akkor módosítsuk
      const userObj = JSON.parse((localStorage.getItem('user') as string));
      console.log(userObj.email);
      const kosar: Kosar ={
        id: userObj.email,
        email: userObj.email,
        kosarList: this.regForm.get('dologNev')?.value + ": " + this.regForm.get('mennyiseg')?.value+";" as string
      }
      console.log(kosar);
      //van-e már ilyen
      var lartalomSzam = 0;
      var vanMarIlyenTable = false;
      var vaMarIlyenElem = false;
      var voltMarUpdate = false;
      var tortentMarVm = false;
      var subS = this.kosarService.getKosarByEmail(userObj.email).subscribe(kosar2 =>{
        lartalomSzam++;
        let KosarList: string[] | undefined;
        KosarList = kosar2?.kosarList.split(";");
        if (typeof KosarList !== 'undefined'  ) {
          for (const elem of KosarList) {
            var egesz = elem.split(":");
            var nev = egesz[0];
            var szam = egesz[1];
            // már létezik az elem:
            vanMarIlyenTable = true;
            if(nev === this.regForm.get('dologNev')?.value){
              vaMarIlyenElem = true;
              var ujSzam : number = parseInt(szam) + parseInt(this.regForm.get('mennyiseg')?.value as string);
              const ujKosar: Kosar ={
                id: userObj.email,
                email: userObj.email,
                kosarList: this.regForm.get('dologNev')?.value + ": "+ujSzam +";" as string
              }
              if(voltMarUpdate === false && tortentMarVm === false){
                tortentMarVm = true;
                voltMarUpdate = true;
                subS.unsubscribe();
                console.log("ITT");
                this.kosarService.updateKosar(userObj.email, ujKosar).then(_ =>{
                  console.log("Cart updated");
                });
              }
            }
          }
          if(vaMarIlyenElem === false &&  tortentMarVm === false){
            tortentMarVm = true;
            const kosarUjSor: Kosar ={
          id: userObj.email,
          email: userObj.email,
          kosarList: this.regForm.get('dologNev')?.value + ": " + this.regForm.get('mennyiseg')?.value+";"+kosar2?.kosarList+";" as string
            }
            this.kosarService.updateKosar(userObj.email, kosarUjSor).then(_ =>{
              console.log("Cart updated");
            });
          }
        }
        console.log(vanMarIlyenTable);
          if(vanMarIlyenTable === false && tortentMarVm === false){
            tortentMarVm = true;
            this.kosarService.createKosar(userObj.email, kosar).then(_ =>{
              console.log("New item added to cart");
              this.router.navigateByUrl('/products-page');
            }).catch(err => {
              console.error(err);
            });
          }
        
      });
    });
  }
}
