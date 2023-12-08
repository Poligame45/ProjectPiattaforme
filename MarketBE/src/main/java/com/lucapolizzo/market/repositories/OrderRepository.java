package com.lucapolizzo.market.repositories;

import com.lucapolizzo.market.models.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories
public interface OrderRepository extends JpaRepository<Order,Integer> {
    Order findByCustomerId(Integer customerId);
}
