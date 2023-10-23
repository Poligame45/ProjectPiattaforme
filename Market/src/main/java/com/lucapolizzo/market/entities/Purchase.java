package com.lucapolizzo.market.entities;


import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Purchase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID",nullable = false)
    private int ID;

    @Column(name="purchase_date",nullable = false)
    private String purchaseDate;

    @ManyToOne
    @JoinColumn(name="customer")
    private User customer;

    @OneToMany
    private List<PurchasedItem> purchasedList;

    @Column(name="tot", nullable = false)
    private double tot;
}
