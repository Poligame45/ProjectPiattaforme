package com.lucapolizzo.market.dto.orderDTO;


import com.lucapolizzo.market.models.entities.PurchasedItem;
import com.lucapolizzo.market.models.entities.User;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class OrderDTO {
    private Integer id;

    private Date dataAcquisto;

    private double totale;

    private int customerId;

    private List<PurchasedItemDTO> purchasedItemList;
}
