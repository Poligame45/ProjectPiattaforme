package com.lucapolizzo.market.dto.user;

import com.lucapolizzo.market.models.entities.User;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ListUserDTO {
    private List<UserDTO> userDTOList;

    private Integer totUsers;


    public ListUserDTO(List<UserDTO> list, int totUsers){
        this.totUsers = totUsers;
        this.userDTOList = new ArrayList<>(list);
    }

}
