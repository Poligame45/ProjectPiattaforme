package com.lucapolizzo.market.repositories;

import com.lucapolizzo.market.models.entities.StoredProduct;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.util.Optional;


@EnableJpaRepositories
public interface StoredProductRepository extends JpaRepository<StoredProduct, Integer> {

    Page<StoredProduct> findAll(Specification<StoredProduct> specification, Pageable pageable);
    Optional<StoredProduct> findByCodice(int codice);
}
