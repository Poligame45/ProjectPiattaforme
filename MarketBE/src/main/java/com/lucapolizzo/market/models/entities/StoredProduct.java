package com.lucapolizzo.market.models.entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.catalina.Store;
import org.hibernate.annotations.GenericGenerator;

import java.io.Serial;
import java.util.Random;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Product")

public class StoredProduct {

    public static int nProdotti = 0;

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "codice", nullable = false, unique = true)
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

    //capire il campo version
    //@Version
    //private long version;


}
