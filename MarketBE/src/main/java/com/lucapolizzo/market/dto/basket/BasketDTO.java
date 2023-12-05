package com.lucapolizzo.market.dto.basket;

import com.lucapolizzo.market.dto.basketItem.BasketItemDTO;
import com.lucapolizzo.market.models.entities.BasketItem;
import jakarta.annotation.sql.DataSourceDefinition;
import jakarta.persistence.OneToMany;
import lombok.Data;

import java.util.List;

@Data
public class BasketDTO {
    private Integer id;

    private List<BasketItemDTO> basketItems;
}
