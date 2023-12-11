package com.lucapolizzo.market.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "purchased_item")
public class PurchasedItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "codice", nullable = false)
    private int codice;

    @Column(name = "qta_acquistata")
    private int qtaAcquistata;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "stored_product_id")
    private StoredProduct storedProduct;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "ordine_id")
    @JsonIgnore
    private Order order;

}
