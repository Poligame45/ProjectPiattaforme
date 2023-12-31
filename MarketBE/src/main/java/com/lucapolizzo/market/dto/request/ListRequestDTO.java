package com.lucapolizzo.market.dto.request;

import com.lucapolizzo.market.dto.orderDTO.OrderDTO;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data

public class ListRequestDTO {
    private List<RequestDTO> list;

    private int totRequest;

    public ListRequestDTO(List<RequestDTO> list, int totRequest){
        this.list = new ArrayList<>(list);
        this.totRequest = totRequest;
    }
}
