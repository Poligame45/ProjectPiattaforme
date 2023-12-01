package com.lucapolizzo.market.services;

import com.lucapolizzo.market.models.entities.command.AddUpdateCommandProduct;
import com.lucapolizzo.market.models.entities.StoredProduct;
import com.lucapolizzo.market.models.entities.command.GetDeleteStoredProductCommand;
import com.lucapolizzo.market.models.entities.command.SearchStoredProductCommand;
import com.lucapolizzo.market.models.entities.dto.ListStoredProductsDTO;
import com.lucapolizzo.market.models.entities.dto.StoredProductDTO;
import com.lucapolizzo.market.queries.StoredProductQuery;
import com.lucapolizzo.market.repositories.StoredProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;



@Service
public class ProductService {
    //Possibile utilizzo di DTO e Command inoltre verificare chi può utilizzare service e chi no
    @Autowired
    private StoredProductRepository storedProductRepository;

    @Autowired
    private StoredProductQuery query;

    @Transactional
    public StoredProductDTO getStoredProduct(GetDeleteStoredProductCommand getDeleteStoredProductCommand) {
        StoredProduct storedProduct = storedProductRepository.findById(getDeleteStoredProductCommand.getCodice()).orElseThrow();
        return convertToDTO(storedProduct);
    }

    @Transactional
    public StoredProductDTO addStoredProduct(AddUpdateCommandProduct addUpdateCommandProduct) {
        StoredProduct stored = new StoredProduct();
        stored.setNome(addUpdateCommandProduct.getNome());
        stored.setDescrizione(addUpdateCommandProduct.getDescrizione());
        stored.setPrezzo(addUpdateCommandProduct.getPrezzo());
        stored.setImg(addUpdateCommandProduct.getImg());
        stored.setQta(addUpdateCommandProduct.getQta());
        storedProductRepository.save(stored);
        return convertToDTO(stored);
    }

    public ListStoredProductsDTO search(SearchStoredProductCommand command) {
        ListStoredProductsDTO listDTO = new ListStoredProductsDTO();
        Page<StoredProduct> searchList = query.all(command);
        List<StoredProductDTO> returnList = new ArrayList<>();

        if ((searchList != null) && (searchList.hasContent())) {

            List<StoredProduct> listProducts = searchList.getContent();
            for (StoredProduct storedProduct : listProducts) {
                returnList.add(convertToDTO(storedProduct));
            }
        }
        return new ListStoredProductsDTO(returnList, (int) storedProductRepository.count());
    }

    public ListStoredProductsDTO searchAll() {
        ListStoredProductsDTO returnListDTO = new ListStoredProductsDTO();
        List<StoredProduct> list = storedProductRepository.findAll();
        List<StoredProductDTO> listDTO = new ArrayList<>();
        if (!list.isEmpty()) {
            for (StoredProduct storedProduct : list) {
                listDTO.add(convertToDTO(storedProduct));
            }
        }
        returnListDTO.setStoredProductList(listDTO);
        returnListDTO.setTotProdotti(returnListDTO.getStoredProductList().size());
        return returnListDTO;
    }

    @Transactional
    public StoredProductDTO updateStoredProduct(AddUpdateCommandProduct command) {
        StoredProduct stored = storedProductRepository.findByCodice(command.getCodice()).orElseThrow();
        stored.setNome(command.getNome());
        stored.setDescrizione(command.getDescrizione());
        stored.setQta(command.getQta());
        stored.setImg(command.getImg());
        //stored.setVersion(storedProduct.getVersion());
        storedProductRepository.save(stored);
        return convertToDTO(stored);
    }

    @Transactional
    public StoredProductDTO deleteStoredProduct(GetDeleteStoredProductCommand command) {
        StoredProduct stored = storedProductRepository.findByCodice(command.getCodice()).orElseThrow();
        storedProductRepository.delete(stored);
        return convertToDTO(stored);
    }

    private static StoredProductDTO convertToDTO(StoredProduct stored) {
        StoredProductDTO storedProductDTO = new StoredProductDTO();
        storedProductDTO.setCodice(stored.getCodice());
        storedProductDTO.setNome(stored.getNome());
        storedProductDTO.setDescrizione(stored.getDescrizione());
        storedProductDTO.setPrezzo(stored.getPrezzo());
        storedProductDTO.setImg(stored.getImg());
        storedProductDTO.setQta(stored.getQta());
        return storedProductDTO;
    }
}
