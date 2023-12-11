package com.lucapolizzo.market.command.user;

import com.lucapolizzo.market.command.generic.GenericSearchCommand;
import com.lucapolizzo.market.user.Role;
import lombok.Data;

@Data
public class SearchUserCommand extends GenericSearchCommand {
    private Integer id;
    private String firstname;
    private String lastname;
    private String address;
    private String email;
    private Role role;
}
