package com.lucapolizzo.market.user;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories
public interface UserRepository extends JpaRepository<User, Integer> {

  Optional<User> findByEmail(String email);

}
