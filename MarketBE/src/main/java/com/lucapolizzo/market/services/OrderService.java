package com.lucapolizzo.market.services;

import com.lucapolizzo.market.command.order.AddUpdateOrderCommand;
import com.lucapolizzo.market.command.order.GetDeleteOrderCommand;
import com.lucapolizzo.market.command.order.SearchOrderCommand;
import com.lucapolizzo.market.dto.orderDTO.ListOrderDTO;
import com.lucapolizzo.market.dto.orderDTO.OrderDTO;
import com.lucapolizzo.market.dto.orderDTO.PurchasedItemDTO;
import com.lucapolizzo.market.exception.QuantityNotAvailable;
import com.lucapolizzo.market.models.entities.*;
import com.lucapolizzo.market.queries.OrderCustomerQuery;
import com.lucapolizzo.market.repositories.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

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
    @Autowired
    OrderCustomerQuery queryCustomer;
    @Transactional
    public OrderDTO addOrder(AddUpdateOrderCommand command) {
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
        return convertToDTO(order);
    }

    public OrderDTO getOrder(GetDeleteOrderCommand command) {
        Optional<Order> order = this.orderRepository.findById(command.getCodice());
        if (!order.isPresent()) return null;
        return convertToDTO(order.get());
    }


    public ListOrderDTO searchOrder(SearchOrderCommand command) {
        Page<Order> searchList = queryCustomer.all(command);
        List<OrderDTO> returnList = new ArrayList<>();

        if ((searchList != null) && (searchList.hasContent())) {

            List<Order> listProducts = searchList.getContent();
            for (Order order : listProducts) {
                returnList.add(convertToDTO(order));
            }
        }
        return new ListOrderDTO(returnList, queryCustomer.count(command));
    }



    public static OrderDTO convertToDTO(Order order) {
        OrderDTO orderDTO = new OrderDTO();
        List<PurchasedItemDTO> list = new ArrayList<>();
        orderDTO.setCustomerId(order.getCustomer().getId());
        orderDTO.setId(order.getId());
        orderDTO.setDataAcquisto(order.getDataAcquisto());
        orderDTO.setTotale(order.getTotale());
        for (PurchasedItem purchasedItem : order.getOrderItems()) {
            list.add(convertPurchaseItem(purchasedItem));
        }
        orderDTO.setPurchasedItemList(list);
        return orderDTO;
    }

    public static PurchasedItemDTO convertPurchaseItem(PurchasedItem purchasedItem) {
        PurchasedItemDTO purchasedItemDTO = new PurchasedItemDTO();
        purchasedItemDTO.setCodice(purchasedItem.getCodice());
        purchasedItemDTO.setQtaAcquistata(purchasedItem.getQtaAcquistata());
        purchasedItemDTO.setStoredProduct(purchasedItem.getProdottoReale());
        purchasedItemDTO.setOrderId(purchasedItem.getOrder().getId());
        return purchasedItemDTO;
    }
}
