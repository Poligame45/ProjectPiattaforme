package com.lucapolizzo.market.dto.auth;

import com.lucapolizzo.market.models.entities.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationDTO {
  private String accessToken;
  private User user;
  private String state;
}
