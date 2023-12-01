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

    //capire il campo version
    //@Version
    //private long version;

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
