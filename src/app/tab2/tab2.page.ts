import { Component } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  denuncias: Observable<any[]>;

  constructor(afDB: AngularFireDatabase) {
    this.denuncias = afDB.list('denuncias').valueChanges();
    
  }




}
