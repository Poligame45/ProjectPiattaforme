package com.lucapolizzo.market.repositories;

import java.util.Optional;

import com.lucapolizzo.market.models.entities.Order;
import com.lucapolizzo.market.models.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories
public interface UserRepository extends JpaRepository<User, Integer> {

  Optional<User> findByEmail(String email);

  Page<User> findAll(Specification<User> specification, Pageable pageable);

  int count (Specification<User> specification);

}
