package com.lucapolizzo.market.dto.request;

import com.lucapolizzo.market.models.entities.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestDTO {
    private Integer id;

    private User customer;

    private String content;
}
