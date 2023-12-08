package com.lucapolizzo.market.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.Date;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "ordine")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "data_acquisto", nullable = false)
    private Date dataAcquisto;

    @Column(name = "totale", nullable = false)
    private double totale;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "customer_id")
    @JsonIgnore
    private User customer;

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY)
    private List<PurchasedItem> orderItems = new ArrayList<>();

}
