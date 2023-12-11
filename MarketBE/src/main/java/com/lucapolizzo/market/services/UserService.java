package com.lucapolizzo.market.services;

import com.lucapolizzo.market.command.order.SearchOrderCommand;
import com.lucapolizzo.market.command.user.SearchUserCommand;
import com.lucapolizzo.market.dto.orderDTO.ListOrderDTO;
import com.lucapolizzo.market.dto.orderDTO.OrderDTO;
import com.lucapolizzo.market.dto.orderDTO.PurchasedItemDTO;
import com.lucapolizzo.market.dto.user.ListUserDTO;
import com.lucapolizzo.market.dto.user.UserDTO;
import com.lucapolizzo.market.models.entities.Order;
import com.lucapolizzo.market.models.entities.PurchasedItem;
import com.lucapolizzo.market.models.entities.User;
import com.lucapolizzo.market.queries.UserQuery;
import com.lucapolizzo.market.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserQuery userQuery;

    public ListUserDTO searchUsers(SearchUserCommand command) {
        Page<User> searchList = userQuery.all(command);
        List<UserDTO> returnList = new ArrayList<>();

        if ((searchList != null) && (searchList.hasContent())) {

            List<User> userList = searchList.getContent();
            for (User user : userList) {
                returnList.add(convertToDTO(user));
            }
        }
        return new ListUserDTO(returnList, userQuery.count(command));
    }


    public static UserDTO convertToDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setEmail(user.getEmail());
        userDTO.setAddress(user.getAddress());
        userDTO.setRole(user.getRole());
        userDTO.setLastname(user.getLastname());
        userDTO.setFirstname(user.getFirstname());
        userDTO.setBasket(user.getBasket());
        List<OrderDTO> list = new ArrayList<>();
        for(Order order: user.getOrdini()){
            list.add(OrderService.convertToDTO(order));
        }
        userDTO.setOrdini(list);
        return userDTO;
    }

}
