package com.lucapolizzo.market.command.storedProduct;

import com.lucapolizzo.market.command.generic.GenericSearchCommand;
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
