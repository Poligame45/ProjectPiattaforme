package com.lucapolizzo.market.services;

import com.lucapolizzo.market.models.entities.command.AddUpdateCommandProduct;
import com.lucapolizzo.market.models.entities.StoredProduct;
import com.lucapolizzo.market.models.entities.command.GetCommandProduct;
import com.lucapolizzo.market.models.entities.dto.ListStoredProductsDTO;
import com.lucapolizzo.market.repositories.StoredProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;


@Service
public class ProductService {
    //Possibile utilizzo di DTO e Command inoltre verificare chi può utilizzare service e chi no
    @Autowired
    private StoredProductRepository storedProductRepository;

    @Transactional
    public ListStoredProductsDTO getAllStoredProducts(GetCommandProduct getCommandProduct) {
        Page<StoredProduct> products = storedProductRepository.findAll(PageRequest.of(getCommandProduct.getCurrent(),getCommandProduct.getTake()));
        return new ListStoredProductsDTO(products.getContent(),StoredProduct.nProdotti);
    }

    @Transactional
    public StoredProduct getStoredProduct(int codice) {
        return storedProductRepository.findById(codice).orElseThrow();
    }

    @Transactional
    public StoredProduct addStoredProduct(AddUpdateCommandProduct addUpdateCommandProduct) {
        StoredProduct stored = new StoredProduct();
        stored.setDescrizione(addUpdateCommandProduct.getDescrizione());
        stored.setPrezzo(addUpdateCommandProduct.getPrezzo());
        stored.setImg(addUpdateCommandProduct.getImg());
        stored.setQta(addUpdateCommandProduct.getQta());
        StoredProduct.nProdotti ++;
        storedProductRepository.save(stored);
        return stored;
    }
    @Transactional
    public StoredProduct updateStoredProduct(StoredProduct storedProduct) {
        StoredProduct stored = storedProductRepository.findById(storedProduct.getCodice()).orElseThrow();
        stored.setDescrizione(storedProduct.getDescrizione());
        stored.setQta(storedProduct.getQta());
        stored.setImg(storedProduct.getImg());
        //stored.setVersion(storedProduct.getVersion());
        storedProductRepository.save(stored);
        return stored;
    }

    @Transactional
    public StoredProduct deleteStoredProduct(StoredProduct storedProduct) {
        StoredProduct stored = storedProductRepository.findById(storedProduct.getCodice()).orElseThrow();
        stored.setDescrizione(storedProduct.getDescrizione());
        stored.setQta(storedProduct.getQta());
        stored.setImg(storedProduct.getImg());
        //stored.setVersion(storedProduct.getVersion());
        storedProductRepository.save(stored);
        return stored;
    }

}
