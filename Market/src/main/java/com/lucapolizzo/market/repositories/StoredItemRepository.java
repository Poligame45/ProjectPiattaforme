package com.lucapolizzo.market.repositories;

import com.lucapolizzo.market.entities.StoredItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StoredItemRepository extends JpaRepository<StoredItem,Integer> {

    StoredItem findByCode(int itemCode);
}
