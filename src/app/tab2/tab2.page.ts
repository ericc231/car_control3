import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  configData = { carip: ''};
  carip: string;
  constructor(private storage: Storage) {}
  setStorage() {
    this.storage.set('carip', this.carip);
    this.storage.set('configData', {
      carip: this.carip
    });
  }

  getStorage() {
    this.storage.get('carip').then((data: any) => {
      if (data) {
        this.carip = data;
      }else{
        this.carip = '';
      }
    });
    this.storage.get('configData').then((data: any) => {
      this.configData = data;
    });
  }

  clearStorage() {
    this.storage.clear();
    this.getStorage();
  }
  ngAfterViewInit() {
    this.getStorage();
  }
}
