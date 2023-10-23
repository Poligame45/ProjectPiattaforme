package com.lucapolizzo.market.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="storedItems")
public class StoredItem {
    @Id
    @Column(name="code",nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int code;

    @Column(name="description", nullable = false,unique = true)
    private String description;

    @Column(name="priceU", nullable = false)
    private double priceU;

    @Column(name ="img")
    private String img;

    @Column(name ="quantity",nullable = false)
    private int quantity;

    //@Version
    //private long version;

}
