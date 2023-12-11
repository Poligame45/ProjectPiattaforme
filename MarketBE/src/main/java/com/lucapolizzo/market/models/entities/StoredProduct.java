package com.lucapolizzo.market.models.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "Product")

public class StoredProduct {


    @Id
    @Column(name = "codice", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int codice;

    @Column(name = "nome", nullable = false)
    private String nome;

    @Column(name = "descrizione", nullable = false)
    private String descrizione;

    @Column(name = "prezzo", nullable = false)
    private double prezzo;

    @Column(name = "qta", nullable = false)
    private Integer qta;

    @Column(name = "img")
    private String img;

    @JsonIgnore
    @OneToMany(mappedBy = "storedProduct", cascade = CascadeType.ALL)
    List<BasketItem> basketItems;

    @JsonIgnore
    @OneToMany(mappedBy = "storedProduct", cascade = CascadeType.ALL)
    List<PurchasedItem> purchasedItems;


    @Version
    private long version;

    public StoredProduct(String nome, String descrizione, double prezzo, int qta, String img) {
        this.nome = nome;
        this.descrizione = descrizione;
        this.prezzo = prezzo;
        this.qta = qta;
        this.img = img;
    }

    public StoredProduct() {
    }
}
