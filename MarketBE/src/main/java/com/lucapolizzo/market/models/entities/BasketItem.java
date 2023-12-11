package com.lucapolizzo.market.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lucapolizzo.market.models.entities.Basket;
import com.lucapolizzo.market.models.entities.StoredProduct;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.apache.catalina.Store;

@Getter
@Setter
@Entity
@Table(name = "basket_item")
public class BasketItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    @ManyToOne
    @JoinColumn(name = "basket_id")
    @JsonIgnore
    private Basket carrello;

    @ManyToOne
    @JoinColumn(name = "stored_product_id")
    @JsonIgnore
    private StoredProduct storedProduct;

    @Column(name = "quantita")
    private int quantita;
}
