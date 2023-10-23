package com.lucapolizzo.market.repositories;

import com.lucapolizzo.market.entities.PurchasedItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PurchasedItemRepository extends JpaRepository<PurchasedItem,Integer> {
}
