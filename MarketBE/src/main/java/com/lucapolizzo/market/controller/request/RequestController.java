package com.lucapolizzo.market.controller.request;

import com.lucapolizzo.market.command.request.AddUpdateRequestCommand;
import com.lucapolizzo.market.command.request.SearchRequestCommand;
import com.lucapolizzo.market.command.storedProduct.SearchStoredProductCommand;
import com.lucapolizzo.market.dto.request.ListRequestDTO;
import com.lucapolizzo.market.dto.request.RequestDTO;
import com.lucapolizzo.market.dto.storedProduct.ListStoredProductsDTO;
import com.lucapolizzo.market.services.ProductStoredService;
import com.lucapolizzo.market.services.RequestService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/request")
@CrossOrigin("http://localhost:8100")
@Slf4j
public class RequestController {

    @Autowired
    private RequestService requestService;

    @PostMapping("/searchRequest")
    public ResponseEntity<ListRequestDTO> searchRequest(@RequestBody SearchRequestCommand command) {
        ListRequestDTO listRequestDTO = requestService.search(command);
        return new ResponseEntity<>(listRequestDTO, HttpStatus.OK);
    }

    @PostMapping("/addRequest")
    public ResponseEntity<RequestDTO> addRequest(@RequestBody AddUpdateRequestCommand command) {
        RequestDTO requestDTO = requestService.addRequest(command);
        if(requestDTO == null){
            return new ResponseEntity<>(requestDTO,HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(requestDTO, HttpStatus.OK);
    }
}
