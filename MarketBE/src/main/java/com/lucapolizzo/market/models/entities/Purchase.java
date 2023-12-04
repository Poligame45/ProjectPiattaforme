package com.lucapolizzo.market.models.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Objects;

/*@Getter
@Setter
public class Purchase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ID", nullable=false)
    private int ID;

    @Column(name="data_acquisto", nullable = false)
    private String dataAcquisto;

    @Column(name="tot", nullable = false)
    private double tot;

    //più acquisti per lo stesso acquirente
    @ManyToOne
    @JoinColumn(name="acquirente")
    private User acquirente;

    public void setAcquirente(User acquirente){
        this.acquirente=acquirente;
    }

    @OneToMany(fetch = FetchType.EAGER)
    private List<PurchasedProduct> listaProdotti;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Purchase acquisto = (Purchase) o;
        return ID == acquisto.ID;
    }

    @Override
    public int hashCode() {
        return Objects.hash(ID);
    }
}*/