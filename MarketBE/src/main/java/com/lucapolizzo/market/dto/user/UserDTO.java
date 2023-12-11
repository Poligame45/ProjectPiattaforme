package com.lucapolizzo.market.dto.user;

import com.lucapolizzo.market.dto.orderDTO.OrderDTO;
import com.lucapolizzo.market.models.entities.Basket;
import com.lucapolizzo.market.models.entities.Order;
import com.lucapolizzo.market.user.Role;
import lombok.Data;

import java.util.List;
@Data
public class UserDTO {
    private Integer id;
    private String firstname;
    private String lastname;
    private String email;
    private String address;
    private Role role;
    private Basket basket;
    private List<OrderDTO> ordini;
}
