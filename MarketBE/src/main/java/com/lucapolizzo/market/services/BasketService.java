package com.lucapolizzo.market.services;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lucapolizzo.market.command.basket.GetBasketCommand;
import com.lucapolizzo.market.command.basketItem.AddUpdateBasketItemCommand;
import com.lucapolizzo.market.command.basketItem.GetDeleteBasketItemCommand;
import com.lucapolizzo.market.dto.basket.BasketDTO;
import com.lucapolizzo.market.dto.basketItem.BasketItemDTO;
import com.lucapolizzo.market.models.entities.Basket;
import com.lucapolizzo.market.models.entities.BasketItem;
import com.lucapolizzo.market.models.entities.StoredProduct;
import com.lucapolizzo.market.repositories.BasketItemRepository;
import com.lucapolizzo.market.repositories.BasketRepository;
import com.lucapolizzo.market.repositories.StoredProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BasketService {

    @Autowired
    StoredProductRepository storedProductRepository;
    @Autowired
    BasketRepository basketRepository;
    @Autowired
    BasketItemRepository basketItemRepository;



    @Transactional
    public BasketDTO getBasket(GetBasketCommand command){
        Basket basket = basketRepository.findByCustomerId(command.getCustomerId());
        return convertToDTO(basket);


    }
    @Transactional
    public BasketItemDTO addProductInBasket(AddUpdateBasketItemCommand command) {
        StoredProduct storedProduct = storedProductRepository.findById(command.getCodiceStoredProduct()).orElseThrow();
        Basket basket = basketRepository.findByCustomerId(command.getCodiceCustomer());
        Optional<BasketItem> item = basketItemRepository.getBasketItemByStoredProductAndCarrello(storedProduct, basket);
        if (item.isPresent()) {//se c'è già un prodotto nel carrello aggiorna solo la qtà
            BasketItem item1 = item.get();
            for (BasketItem item2 : basket.getBasketItems()) {
                if (item2.getId() == item1.getId() && item2.getStoredProduct().getQta() - (command.getQuantita() + item2.getQuantita()) >= 0) {
                    item2.setQuantita(item2.getQuantita() + command.getQuantita());
                    basketRepository.save(basket);
                    return convertToDTO(item1);
                }
            }
        } else {//Aggiungi nuovo
            BasketItem basketItem = new BasketItem();
            basketItem.setQuantita(command.getQuantita());
            basketItem.setStoredProduct(storedProduct);
            basketItem.setCarrello(basket);
            basketItemRepository.save(basketItem);
            basketRepository.save(basket);
            return convertToDTO(basketItem);
        }
        //quantità non disponibile
        return new BasketItemDTO();
    }

    @Transactional
    public BasketItemDTO removeBasketItem(GetDeleteBasketItemCommand command) {
        StoredProduct storedProduct = storedProductRepository.findById(command.getCodiceStoredProduct()).orElseThrow();
        Basket basket = basketRepository.findByCustomerId(command.getCodiceCustomer());
        Optional<BasketItem> item = basketItemRepository.getBasketItemByStoredProductAndCarrello(storedProduct, basket);
        if (item.isPresent()) {
            basketItemRepository.delete(item.get());
            return convertToDTO(item.get());
        } else {
            return new BasketItemDTO();
        }
    }

    @Transactional
    public BasketItemDTO updateBasketQuantity(AddUpdateBasketItemCommand command) {
        StoredProduct storedProduct = storedProductRepository.findById(command.getCodiceStoredProduct()).orElseThrow();
        Basket basket = basketRepository.findById(command.getCodiceCustomer()).orElseThrow();
        Optional<BasketItem> item = basketItemRepository.getBasketItemByStoredProductAndCarrello(storedProduct, basket);
        if (item.isPresent()) {//se c'è un prodotto nel carrello aggiorna solo la qtà
            BasketItem item1 = item.get();
            for (BasketItem item2 : basket.getBasketItems()) {
                if (item2.getId() == item1.getId() && command.getQuantita() <= storedProduct.getQta()) {
                    item2.setQuantita(command.getQuantita());
                    basketRepository.save(basket);
                    return convertToDTO(item1);
                }
            }
        }
        //quantità non disponibile
        return new BasketItemDTO();
    }


    public static BasketItemDTO convertToDTO(BasketItem basketItem) {
        BasketItemDTO basketItemDTO = new BasketItemDTO();
        basketItemDTO.setCarrello(basketItem.getCarrello());
        basketItemDTO.setStoredProduct(basketItem.getStoredProduct());
        basketItemDTO.setId(basketItem.getId());
        basketItemDTO.setQuantita(basketItem.getQuantita());
        return basketItemDTO;
    }

    public static BasketDTO convertToDTO(Basket basket){
        BasketDTO basketDTO = new BasketDTO();
        basketDTO.setId(basket.getId());
        List<BasketItemDTO> basketDTOList = new ArrayList<>();
        for(BasketItem basketItem : basket.getBasketItems()){
            basketDTOList.add(convertToDTO(basketItem));
        }
        basketDTO.setBasketItems(basketDTOList);
        return basketDTO;
    }


}
