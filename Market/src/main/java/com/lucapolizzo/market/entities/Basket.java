package com.lucapolizzo.market.entities;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.stereotype.Component;

import java.util.LinkedList;
import java.util.List;

@Data
@Component
public class Basket {

    private double total;
    private List<BasketItem> itemsInBasket;

    public Basket(){
        total = 0d;
        itemsInBasket = new LinkedList<>();
    }
}
