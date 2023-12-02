package com.lucapolizzo.market.command;

import lombok.Data;

@Data
public class GenericSearchCommand {
    Integer current;
    Integer take;

    public GenericSearchCommand(Integer current, Integer take){
        this.current = current;
        this.take = take;
    }
    public GenericSearchCommand(){}
}
