package com.lucapolizzo.market.entities;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BasketItem {
    StoredItem storedItem;
    Integer quantity;
}
