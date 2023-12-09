package com.lucapolizzo.market.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "basket")
public class Basket {

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @JsonIgnore
    @OneToMany(mappedBy = "carrello", fetch = FetchType.LAZY)
    private List<BasketItem> basketItems = new ArrayList<>();

    @JsonIgnore
    @OneToOne(mappedBy = "basket", fetch = FetchType.LAZY)
    private User customer;
}
