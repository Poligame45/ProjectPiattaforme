package com.lucapolizzo.market.services;

import com.lucapolizzo.market.command.order.AddUpdateOrderCommand;
import com.lucapolizzo.market.exception.QuantityNotAvailable;
import com.lucapolizzo.market.models.entities.*;
import com.lucapolizzo.market.repositories.*;
import jakarta.transaction.Transactional;
import org.aspectj.weaver.ast.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDate;
import java.util.*;

@Service
public class OrderService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    OrderRepository orderRepository;
    @Autowired
    StoredProductRepository storedProductRepository;
    @Autowired
    BasketRepository basketRepository;
    @Autowired
    PurchasedItemRepository purchasedItemRepository;

    @Transactional
    public Order addOrder(AddUpdateOrderCommand command) {
        Order order = new Order();
        order.setDataAcquisto(new Date());
        List<PurchasedItem> listaProd = new ArrayList<>();
        Basket basket = basketRepository.findByCustomerId(command.getCustomerId());
        double totaleOrdine = 0;
        for (BasketItem item : basket.getBasketItems()) {

            StoredProduct storedProduct = storedProductRepository.findByCodice(item.getStoredProduct().getCodice()).orElseThrow();
            int qtaAcquistata = item.getQuantita();
            if ((storedProduct.getQta() - qtaAcquistata) < 0) {
                throw new QuantityNotAvailable();
            } else {
                int nuovaQta = storedProduct.getQta() - item.getQuantita();
                storedProduct.setQta(nuovaQta);
                storedProductRepository.save(storedProduct);
                totaleOrdine += storedProduct.getPrezzo() * item.getQuantita();
                PurchasedItem purchasedItem = new PurchasedItem();
                purchasedItem.setProdottoReale(storedProduct);
                purchasedItem.setQtaAcquistata(qtaAcquistata);
                purchasedItem.setOrder(order);
                purchasedItemRepository.save(purchasedItem);
                listaProd.add(purchasedItem);
            }
        }
        User user = userRepository.findById(command.getCustomerId()).orElseThrow();
        order.setCustomer(user);
        order.setTotale(totaleOrdine);
        order.setOrderItems(listaProd);
        orderRepository.save(order);
        if (order.getTotale() != totaleOrdine) throw new RuntimeException();
        return order;
    }
}
