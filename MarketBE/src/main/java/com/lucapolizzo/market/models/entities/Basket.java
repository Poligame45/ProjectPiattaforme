package com.lucapolizzo.market.models.entities;

import com.lucapolizzo.market.models.BasketItem;

import java.util.LinkedList;
import java.util.List;

public class Basket {
    private double totale;
    private List<BasketItem> list;

    public Basket(){
        totale = 0;
        list = new LinkedList<>();
    }

}
