package com.lucapolizzo.market.models.entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor @NoArgsConstructor
@Entity
@Table(name="Product")
public class StoredProduct {

    public static int nProdotti = 0;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="codice",nullable = false)
    private int codice;

    @Column(name="descrizione", nullable=false)
    private String descrizione;

    @Column(name="prezzo", nullable=false)
    private double prezzo;

    @Column(name="qta", nullable=false)
    private int qta;

    @Column(name="img")
    private String img;

    //capire il campo version
    @Version
    private long version;
}
