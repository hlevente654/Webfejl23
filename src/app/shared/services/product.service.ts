import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Products } from '../models/Products';
import { AngularFirestore } from '@angular/fire/compat/firestore'; 
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { getDoc } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProductService{


    

    collectionName = 'Products';
    eredmeny?:Array<Products>;
    constructor(private http: HttpClient, private afs: AngularFirestore, private storage: AngularFireStorage){}

    loadImageMeta(metaUrl: string): Observable<Array<Products>>{
        return this.afs.collection<Products>(this.collectionName).valueChanges();
    }

    loadImage(imageUrl: string){
        return this.storage.ref(imageUrl).getDownloadURL();
    }

      
      loadAllProducts(): Promise<Products[]> {
        return new Promise<Products[]>((resolve, reject) => {
          const result: Products[] = [];
          this.afs
            .collection(this.collectionName)
            .snapshotChanges()
            .subscribe((items) => {
              items.forEach((item) => {
                const data = item.payload.doc.data() as Products;
                const id = item.payload.doc.id;
                result.push(Object.assign({}, data, { id: id }));
              });
              resolve(result);
            });
        });
      }

}