package com.lucapolizzo.market.command.storedProduct;


import lombok.Data;

@Data
public class AddUpdateCommandStoredProduct {

    private int codice;
    private String nome;
    private String descrizione;
    private int qta;
    private double prezzo;
    private String img;
    //Capire
    //private long version;
}
