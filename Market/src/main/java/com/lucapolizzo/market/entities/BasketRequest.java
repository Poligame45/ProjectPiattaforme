package com.lucapolizzo.market.entities;

import lombok.Data;
import lombok.Getter;
import lombok.ToString;

@Data
public class BasketRequest {
    private int productCode;
    private int quantity;
}


