package com.lucapolizzo.market.services;

import com.lucapolizzo.market.models.entities.StoredProduct;
import com.lucapolizzo.market.repositories.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;
    @Transactional
    public List<StoredProduct> getAll() { return  productRepository.findAll();}

    @Transactional
    public StoredProduct get(Integer codice){
        return productRepository.findById(codice).orElseThrow();
    }
}
