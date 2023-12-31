package com.lucapolizzo.market.command.request;

import lombok.Data;

@Data
public class AddUpdateRequestCommand {
    private Integer customerId;
    private String content;
}
