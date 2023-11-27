package com.lucapolizzo.market.models.entities;

import jakarta.persistence.*;
import lombok.Data;


@Data
@Table(name="Purchased_Product")
@Entity
public class PurchasedProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="code", nullable = false)
    private int codice;

    @Column(name="qta_acquistata")
    private int qtaAcquistata;

    @ManyToOne
    @JoinColumn(name="prodotto_reale")
    private StoredProduct prodottoReale;

}