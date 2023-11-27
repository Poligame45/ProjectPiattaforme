package com.lucapolizzo.market.controller;


import com.lucapolizzo.market.models.entities.StoredProduct;
import com.lucapolizzo.market.services.ProductService;
import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.Store;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@Slf4j
public class StoredProductController {

    @Autowired
    private ProductService productService;


    @GetMapping
    public ResponseEntity<List<StoredProduct>>getAll() {
        List<StoredProduct> productList = productService.getAll();
        return new ResponseEntity<>(productList, HttpStatus.OK);
    }


    @GetMapping("/{id}")
    public ResponseEntity<StoredProduct> getById(@PathVariable("id") Integer codice){
        log.info("GET del prodotto " + codice);
        StoredProduct p = productService.get(codice);
        return new ResponseEntity<>(p, HttpStatus.OK);
    }
}
