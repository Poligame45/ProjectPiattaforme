package com.lucapolizzo.market.command.generic;

import lombok.Data;

@Data
public class GenericSearchCommand {
    Integer current;
    Integer take;

    public GenericSearchCommand(Integer current, Integer take){
        this.current = current;
        this.take = take;
    }
}
