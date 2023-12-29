package com.lucapolizzo.market.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.Date;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "ordine")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @Column(name = "data_acquisto", nullable = false)
    private Date dataAcquisto;

    @Column(name = "totale", nullable = false)
    private double totale;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    @JsonIgnore
    private User customer;

    @JsonIgnore
    @OneToMany
    private List<PurchasedItem> orderItems = new ArrayList<>();

}
