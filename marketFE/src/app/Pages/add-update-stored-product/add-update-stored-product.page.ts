import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { StoredProductService } from 'src/app/Services/stored-product.service';
import { AddUpdateCommandStoredProduct } from 'src/app/models/command/storedProductCommand/AddUpdateCommandStoredProduct';

@Component({
  selector: 'app-add-update-stored-product',
  templateUrl: './add-update-stored-product.page.html',
  styleUrls: ['./add-update-stored-product.page.scss'],
})
export class AddUpdateStoredProductPage implements OnInit {
  myForm!: FormGroup;
  constructor(private router: Router, private storedProductService: StoredProductService) { }

  ngOnInit() {
    //Inserire query param per la modifica
    this.myForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      descrizione: new FormControl('', Validators.required),
      img: new FormControl('', Validators.required),
      prezzo: new FormControl('', Validators.required),
      qta: new FormControl('', Validators.required)
    });
  }

  async onSubmit() {
    const command: AddUpdateCommandStoredProduct = {
      nome: this.myForm.value.nome,
      descrizione: this.myForm.value.descrizione,
      prezzo: +this.myForm.value.prezzo,
      qta: +this.myForm.value.qta,
      img: this.myForm.value.img
    }
    const resp = await firstValueFrom(this.storedProductService.addStoredProduct(command));
    location.reload();
  }
  goToStoredProducts() {
    this.router.navigate(['admin-products']);
  }
}
