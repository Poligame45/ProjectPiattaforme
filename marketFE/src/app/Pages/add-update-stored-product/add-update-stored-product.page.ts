import { StoredProduct } from './../../models/StoredProduct';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { IonAlert } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { StoredProductService } from 'src/app/Services/stored-product.service';
import { AddUpdateCommandStoredProduct } from 'src/app/models/command/storedProductCommand/AddUpdateCommandStoredProduct';
import { GetDeleteStoredProductCommand } from 'src/app/models/command/storedProductCommand/GetDeleteStoredProductCommand';

@Component({
  selector: 'app-add-update-stored-product',
  templateUrl: './add-update-stored-product.page.html',
  styleUrls: ['./add-update-stored-product.page.scss'],
})
export class AddUpdateStoredProductPage implements OnInit {
  myForm!: FormGroup;
  storedProduct!: StoredProduct;
  @ViewChild('alertCustomer') alert!: IonAlert;
  constructor(private router: Router, private storedProductService: StoredProductService, private activatedRoute: ActivatedRoute) {
  }

  async ngOnInit() {
    this.myForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      descrizione: new FormControl('', Validators.required),
      img: new FormControl('', Validators.required),
      prezzo: new FormControl('', Validators.required),
      qta: new FormControl('', Validators.required),
      deleted: new FormControl(''),
    });
    await this.configForm();
  }

  async configForm() {
    let codiceProdotto = await this.activatedRoute.snapshot.queryParamMap.get('product');
    if (!!codiceProdotto) {
      const command: GetDeleteStoredProductCommand = {
        codice: +codiceProdotto
      }
      this.storedProduct = await firstValueFrom(this.storedProductService.getStoredProduct(command));
      this.myForm.setValue({ nome: this.storedProduct.nome, descrizione: this.storedProduct.descrizione, img: this.storedProduct.img, prezzo: this.storedProduct.prezzo, qta: this.storedProduct.qta, deleted: this.storedProduct.deleted });
    }
  }

  async onSubmit() {
    if (sessionStorage.getItem("userRole") != "ADMIN") return;
    const command: AddUpdateCommandStoredProduct = {
      nome: this.myForm.value.nome,
      descrizione: this.myForm.value.descrizione,
      prezzo: +this.myForm.value.prezzo,
      qta: +this.myForm.value.qta,
      img: this.myForm.value.img,
      deleted: false
    }
    if (!!this.storedProduct) {
      command.deleted = this.myForm.value.deleted;
      command.codice = this.storedProduct.codice;
      await firstValueFrom(this.storedProductService.updateStoredProduct(command));
    } else {
      await firstValueFrom(this.storedProductService.addStoredProduct(command));
    }
    this.alert.present();
    setTimeout(() => { this.alert.dismiss(); }, 1500);
  }

  goToStoredProducts() {
    this.router.navigate(['admin-products']);
  }
}
