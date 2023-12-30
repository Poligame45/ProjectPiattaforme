package com.lucapolizzo.market.command.order;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lucapolizzo.market.command.generic.GenericSearchCommand;
import com.lucapolizzo.market.models.entities.User;
import lombok.Data;

import java.util.Date;

@Data

public class SearchOrderCommand extends GenericSearchCommand {
    private Integer id;

    @JsonFormat(pattern="dd/MM/yy")
    private Date dataAcquistoDa;

    @JsonFormat(pattern="dd/MM/yy")
    private Date dataAcquistoA;

    private Double totale;

    private Integer customerId;

    private Boolean deleted;
}
