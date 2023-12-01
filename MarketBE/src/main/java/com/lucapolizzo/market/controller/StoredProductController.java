package com.lucapolizzo.market.controller;


import com.lucapolizzo.market.models.entities.command.AddUpdateCommandProduct;
import com.lucapolizzo.market.models.entities.command.GetDeleteStoredProductCommand;
import com.lucapolizzo.market.models.entities.command.SearchStoredProductCommand;
import com.lucapolizzo.market.models.entities.dto.ListStoredProductsDTO;
import com.lucapolizzo.market.models.entities.dto.StoredProductDTO;
import com.lucapolizzo.market.services.ProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/products")
@Slf4j
@CrossOrigin("http://localhost:8100")
public class StoredProductController {

    @Autowired
    private ProductService productService;

   @PostMapping
    public ResponseEntity<ListStoredProductsDTO> searchProducts(@RequestBody SearchStoredProductCommand searchStoredProductCommand) {
        ListStoredProductsDTO listStoredProductsDTO = productService.search(searchStoredProductCommand);
        return new ResponseEntity<>(listStoredProductsDTO, HttpStatus.OK);
    }


    @PostMapping("/addStoredProduct")
    public ResponseEntity<StoredProductDTO> addStoredProduct(@RequestBody AddUpdateCommandProduct addUpdateCommandProduct) {
        StoredProductDTO storedProduct = productService.addStoredProduct(addUpdateCommandProduct);
        return new ResponseEntity<>(storedProduct, HttpStatus.OK);
    }

    @PostMapping("/deleteStoredProduct")
    public ResponseEntity<StoredProductDTO> deleteStoredProduct(@RequestBody GetDeleteStoredProductCommand command) {
        StoredProductDTO storedProduct = productService.deleteStoredProduct(command);
        return new ResponseEntity<>(storedProduct, HttpStatus.OK);
    }
    @PostMapping("/updateStoredProduct")
    public ResponseEntity<StoredProductDTO> updateStoredProduct(@RequestBody AddUpdateCommandProduct command) {
        StoredProductDTO storedProduct = productService.updateStoredProduct(command);
        return new ResponseEntity<>(storedProduct, HttpStatus.OK);
    }
    @PostMapping("/getStoredProduct")
    public ResponseEntity<StoredProductDTO> getStoredProduct(@RequestBody GetDeleteStoredProductCommand command) {
        StoredProductDTO storedProduct = productService.getStoredProduct(command);
        return new ResponseEntity<>(storedProduct, HttpStatus.OK);
    }

    @PostMapping("/searchAllStoredProducts")
    public ResponseEntity<ListStoredProductsDTO> searchAllStoredProducts(@RequestBody SearchStoredProductCommand searchStoredProductCommand) {
        ListStoredProductsDTO listStoredProductsDTO = productService.searchAll();
        return new ResponseEntity<>(listStoredProductsDTO, HttpStatus.OK);
    }


}
