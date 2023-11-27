package com.lucapolizzo.market.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lucapolizzo.market.models.entities.Purchase;
import com.lucapolizzo.market.user.Role;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User implements UserDetails {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id",nullable = false,unique = true)
  private Integer id;

  @Column(name = "firstname",nullable = false)
  private String firstname;

  @Column(name = "lastname",nullable = false)
  private String lastname;

  @Column(name = "email",nullable = false,unique = true)
  private String email;

  @Column(name="password")
  private String password;

  @Column(name="address")
  private String address;


  @Enumerated(EnumType.STRING)
  private Role role;

  @OneToMany(fetch = FetchType.LAZY, mappedBy = "acquirente")
  @JsonIgnore
  private List<Purchase> listaAcquisti = new ArrayList<>();


  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return List.of(new SimpleGrantedAuthority(role.name()));
  }

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public String getUsername() { return email; }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }
}













