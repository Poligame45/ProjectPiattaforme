package com.lucapolizzo.market.controller;


import com.lucapolizzo.market.models.entities.command.AddUpdateCommandProduct;
import com.lucapolizzo.market.models.entities.StoredProduct;
import com.lucapolizzo.market.models.entities.command.GetCommandProduct;
import com.lucapolizzo.market.models.entities.dto.ListStoredProductsDTO;
import com.lucapolizzo.market.services.ProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@Slf4j
@CrossOrigin("http://localhost:8100")
public class StoredProductController {
    //RESTITUIRE PRODOTTI PAGINATI
    @Autowired
    private ProductService productService;

    @PostMapping
    public ResponseEntity<ListStoredProductsDTO> getAllStoredProducts(@RequestBody GetCommandProduct getCommandProduct) {
        ListStoredProductsDTO listStoredProductsDTO = productService.getAllStoredProducts(getCommandProduct);
        return new ResponseEntity<>(listStoredProductsDTO, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StoredProduct> getStoredProduct(@PathVariable("id") Integer codice) {
        StoredProduct storedProduct = productService.getStoredProduct(codice);
        return new ResponseEntity<>(storedProduct, HttpStatus.OK);
    }

    @PostMapping("/addStoredProduct")
    public ResponseEntity<StoredProduct> addStoredProduct(@RequestBody AddUpdateCommandProduct addUpdateCommandProduct) {
        StoredProduct storedProduct = productService.addStoredProduct(addUpdateCommandProduct);
        return new ResponseEntity<>(storedProduct, HttpStatus.OK);
        //stored.setVersion(addUpdateCommandProduct);
    }
}
