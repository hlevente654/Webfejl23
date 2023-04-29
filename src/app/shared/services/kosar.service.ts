import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Kosar } from '../models/Kosar';
import { AngularFirestore } from '@angular/fire/compat/firestore'; 
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { getDoc } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class KosarService{

    collectionName = 'Kosar';
    constructor(private http: HttpClient, private afs: AngularFirestore, private storage: AngularFireStorage){}

    //Create
    createKosar(userEmail: string, kosar: Kosar){
        return this.afs.collection<Kosar>(this.collectionName).doc(userEmail).set(kosar);
    }

    //Read
    getKosarByEmail(userEmail: string){
        return this.afs.collection<Kosar>(this.collectionName).doc(userEmail).valueChanges();
    }

    //Update
    updateKosar(userEmail: string, ujKosar: Kosar){
        return this.afs.collection<Kosar>(this.collectionName).doc(userEmail).set(ujKosar);
    }
    //Delete
    deleteKosarByEmail(userEmail: string){
        return this.afs.collection<Kosar>(this.collectionName).doc(userEmail).delete();
    }

}