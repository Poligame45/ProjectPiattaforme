package com.lucapolizzo.market.controller.storedProduct;


import com.lucapolizzo.market.command.storedProduct.AddUpdateCommandStoredProduct;
import com.lucapolizzo.market.command.storedProduct.GetDeleteStoredProductCommand;
import com.lucapolizzo.market.command.storedProduct.SearchStoredProductCommand;
import com.lucapolizzo.market.dto.storedProduct.ListStoredProductsDTO;
import com.lucapolizzo.market.dto.storedProduct.StoredProductDTO;
import com.lucapolizzo.market.services.ProductStoredService;
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
    private ProductStoredService productStoredService;

   @PostMapping
    public ResponseEntity<ListStoredProductsDTO> searchProducts(@RequestBody SearchStoredProductCommand searchStoredProductCommand) {
        ListStoredProductsDTO listStoredProductsDTO = productStoredService.search(searchStoredProductCommand);
        return new ResponseEntity<>(listStoredProductsDTO, HttpStatus.OK);
    }


    @PostMapping("/addStoredProduct")
    public ResponseEntity<StoredProductDTO> addStoredProduct(@RequestBody AddUpdateCommandStoredProduct addUpdateCommandStoredProduct) {
        StoredProductDTO storedProduct = productStoredService.addStoredProduct(addUpdateCommandStoredProduct);
        return new ResponseEntity<>(storedProduct, HttpStatus.OK);
    }

    @PostMapping("/deleteStoredProduct")
    public ResponseEntity<StoredProductDTO> deleteStoredProduct(@RequestBody GetDeleteStoredProductCommand command) {
        StoredProductDTO storedProduct = productStoredService.deleteStoredProduct(command);
        return new ResponseEntity<>(storedProduct, HttpStatus.OK);
    }
    @PostMapping("/updateStoredProduct")
    public ResponseEntity<StoredProductDTO> updateStoredProduct(@RequestBody AddUpdateCommandStoredProduct command) {
        StoredProductDTO storedProduct = productStoredService.updateStoredProduct(command);
        return new ResponseEntity<>(storedProduct, HttpStatus.OK);
    }
    @PostMapping("/getStoredProduct")
    public ResponseEntity<StoredProductDTO> getStoredProduct(@RequestBody GetDeleteStoredProductCommand command) {
        StoredProductDTO storedProduct = productStoredService.getStoredProduct(command);
        return new ResponseEntity<>(storedProduct, HttpStatus.OK);
    }

    @PostMapping("/searchAllStoredProducts")
    public ResponseEntity<ListStoredProductsDTO> searchAllStoredProducts() {
        ListStoredProductsDTO listStoredProductsDTO = productStoredService.searchAll();
        return new ResponseEntity<>(listStoredProductsDTO, HttpStatus.OK);
    }


}
