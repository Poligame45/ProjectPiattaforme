package com.lucapolizzo.market.repositories;

import com.lucapolizzo.market.models.entities.Order;
import com.lucapolizzo.market.models.entities.StoredProduct;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.util.List;
import java.util.Optional;

@EnableJpaRepositories
public interface OrderRepository extends JpaRepository<Order,Integer> {
    Order findByCustomerId(Integer customerId);
    Optional<List<Order>> findAllByCustomerId(Integer customerId);
    Page<Order> findAll(Specification<Order> specification, Pageable pageable);

    int count (Specification<Order> specification);
}
