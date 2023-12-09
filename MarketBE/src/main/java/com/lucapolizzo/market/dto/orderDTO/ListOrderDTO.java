package com.lucapolizzo.market.dto.orderDTO;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ListOrderDTO {
    private List<OrderDTO> list;
    private Integer totOrdini;


    public ListOrderDTO(List<OrderDTO> list, Integer totOrdini){
        this.list = new ArrayList<>(list);
        this.totOrdini = totOrdini;
    }
}
