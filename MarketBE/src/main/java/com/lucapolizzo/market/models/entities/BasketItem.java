package com.lucapolizzo.market.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lucapolizzo.market.models.entities.Basket;
import com.lucapolizzo.market.models.entities.StoredProduct;
import jakarta.persistence.*;
import lombok.Data;
import org.apache.catalina.Store;

@Data
@Entity
@Table(name = "basket_item")
public class BasketItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "basket_id")
    @JsonIgnore
    private Basket carrello;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "stored_product_id")
    @JsonIgnore
    private StoredProduct storedProduct;

    @Column(name = "quantita")
    private int quantita;
}
