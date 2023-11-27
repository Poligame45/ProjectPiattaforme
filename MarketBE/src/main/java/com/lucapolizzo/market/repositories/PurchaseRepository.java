package com.lucapolizzo.market.repositories;

import com.lucapolizzo.market.models.entities.Purchase;
import com.lucapolizzo.market.models.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;
@EnableJpaRepositories


public interface PurchaseRepository extends JpaRepository<Purchase, Integer> {
    Purchase findPurchaseByID(Integer ID);
    List<Purchase> findByAcquirente(User user);
}
