package com.lucapolizzo.market.dto.orderDTO;

import com.lucapolizzo.market.models.entities.StoredProduct;
import lombok.Data;

@Data
public class PurchasedItemDTO {
    private int codice;
    private int qtaAcquistata;
    private StoredProduct storedProduct;
    private int orderId;
}
