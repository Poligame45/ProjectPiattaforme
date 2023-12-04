package com.lucapolizzo.market.models.entities;

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

    @ManyToOne
    @JoinColumn(name = "basket_id")
    private Basket carrello;

    @ManyToOne
    @JoinColumn(name = "stored_product_id")
    private StoredProduct storedProduct;

    @Column(name = "quantita")
    private int quantita;
}
