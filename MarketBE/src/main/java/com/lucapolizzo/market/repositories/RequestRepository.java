package com.lucapolizzo.market.repositories;

import com.lucapolizzo.market.models.entities.Basket;
import com.lucapolizzo.market.models.entities.Order;
import com.lucapolizzo.market.models.entities.Request;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories
public interface RequestRepository extends JpaRepository<Request,Integer> {
    Page<Request> findAll(Specification<Request> specification, Pageable pageable);

    int count (Specification<Request> specification);
    Request findByCustomerId(Integer customer_id);

}
