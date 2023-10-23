package com.lucapolizzo.market.entities;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name="Purchased_item")
public class PurchasedItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="code", nullable = false)
    private int code;

    @Column(name="quantity")
        private int quantity;

    @ManyToOne
    @JoinColumn(name="product")
    private StoredItem product;
}
