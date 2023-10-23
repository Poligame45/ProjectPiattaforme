package com.lucapolizzo.market.repositories;

import com.lucapolizzo.market.entities.Purchase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PurchaseRepository extends JpaRepository<Purchase,Integer> {
    List<Purchase> findByCustomer(int userID);
}
