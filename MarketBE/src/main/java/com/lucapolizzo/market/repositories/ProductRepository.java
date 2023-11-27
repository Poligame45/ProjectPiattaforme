package com.lucapolizzo.market.repositories;

import com.lucapolizzo.market.models.entities.StoredProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories

public interface ProductRepository extends JpaRepository<StoredProduct, Integer> {
}
