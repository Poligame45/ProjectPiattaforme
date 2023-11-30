package com.lucapolizzo.market.models.entities.command;


import lombok.Data;

@Data
public class AddUpdateCommandProduct {

    private int codice;
    private String nome;
    private String descrizione;
    private int qta;
    private double prezzo;
    private String img;
    //Capire
    //private long version;
}
