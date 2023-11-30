package com.lucapolizzo.market.models.entities.dto;

import lombok.Data;

@Data
public class StoredProductDTO {
    private Integer codice;
    private String nome;
    private String descrizione;
    private double prezzo;
    private int qta;
    private String img;

    //private long version?
}
