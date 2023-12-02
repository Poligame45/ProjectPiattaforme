package com.lucapolizzo.market.models.entities.command;

import com.lucapolizzo.market.models.entities.Generic.command.GenericSearchCommand;
import lombok.Data;

@Data
public class SearchStoredProductCommand extends GenericSearchCommand {
    private Integer codice;
    private String nome;
    private String descrizione;
    private Integer qta;
    private Double prezzo;
    private String img;
    //Capire
    //private long version;
}
