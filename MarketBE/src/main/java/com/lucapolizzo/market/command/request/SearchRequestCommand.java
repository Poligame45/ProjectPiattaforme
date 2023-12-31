package com.lucapolizzo.market.command.request;

import com.lucapolizzo.market.command.generic.GenericSearchCommand;
import lombok.Data;

@Data
public class SearchRequestCommand extends GenericSearchCommand {
    private Integer customerId;
    private Integer id;
}
