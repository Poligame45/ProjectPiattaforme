package com.lucapolizzo.market.services;

import com.lucapolizzo.market.command.storedProduct.AddUpdateCommandStoredProduct;
import com.lucapolizzo.market.models.entities.StoredProduct;
import com.lucapolizzo.market.command.storedProduct.GetDeleteStoredProductCommand;
import com.lucapolizzo.market.command.storedProduct.SearchStoredProductCommand;
import com.lucapolizzo.market.dto.storedProduct.ListStoredProductsDTO;
import com.lucapolizzo.market.dto.storedProduct.StoredProductDTO;
import com.lucapolizzo.market.queries.StoredProductQuery;
import com.lucapolizzo.market.repositories.StoredProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class ProductStoredService {
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
    public StoredProductDTO addStoredProduct(AddUpdateCommandStoredProduct addUpdateCommandStoredProduct) {
        StoredProduct stored = new StoredProduct();
        stored.setNome(addUpdateCommandStoredProduct.getNome());
        stored.setDescrizione(addUpdateCommandStoredProduct.getDescrizione());
        stored.setPrezzo(addUpdateCommandStoredProduct.getPrezzo());
        stored.setImg(addUpdateCommandStoredProduct.getImg());
        stored.setQta(addUpdateCommandStoredProduct.getQta());
        storedProductRepository.save(stored);
        return convertToDTO(stored);
    }

    public ListStoredProductsDTO search(SearchStoredProductCommand command) {
        Page<StoredProduct> searchList = query.all(command);
        List<StoredProductDTO> returnList = new ArrayList<>();

        if ((searchList != null) && (searchList.hasContent())) {

            List<StoredProduct> listProducts = searchList.getContent();
            for (StoredProduct storedProduct : listProducts) {
                returnList.add(convertToDTO(storedProduct));
            }
        }
        return new ListStoredProductsDTO(returnList, query.count(command));
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
    public StoredProductDTO updateStoredProduct(AddUpdateCommandStoredProduct command) {
        StoredProduct stored = storedProductRepository.findByCodice(command.getCodice()).orElseThrow();
        stored.setNome(command.getNome());
        stored.setDescrizione(command.getDescrizione());
        stored.setQta(command.getQta());
        stored.setImg(command.getImg());
        stored.setDeleted(command.getDeleted());
        storedProductRepository.save(stored);
        return convertToDTO(stored);
    }

    @Transactional
    public StoredProductDTO deleteStoredProduct(GetDeleteStoredProductCommand command) {
        StoredProduct stored = storedProductRepository.findByCodice(command.getCodice()).orElseThrow();
        stored.setDeleted(true);
        storedProductRepository.save(stored);
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
        storedProductDTO.setDeleted(stored.getDeleted());
        return storedProductDTO;
    }
}
