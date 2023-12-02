package com.lucapolizzo.market.command.auth;

import com.lucapolizzo.market.user.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterCommand {

  private String firstname;
  private String lastname;
  private String address;
  private String email;
  private String password;
  private Role role;
}
