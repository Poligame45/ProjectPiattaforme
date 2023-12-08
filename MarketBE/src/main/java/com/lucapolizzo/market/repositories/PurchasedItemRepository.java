package com.lucapolizzo.market.repositories;

import com.lucapolizzo.market.models.entities.PurchasedItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories
public interface PurchasedItemRepository extends JpaRepository<PurchasedItem,Integer> {
}
