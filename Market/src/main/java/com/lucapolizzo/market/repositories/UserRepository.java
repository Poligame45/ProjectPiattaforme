package com.lucapolizzo.market.repositories;

import java.util.Optional;

import com.lucapolizzo.market.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

  Optional<User> findByEmail(String email);
  User findByUserId(int userId);
}
