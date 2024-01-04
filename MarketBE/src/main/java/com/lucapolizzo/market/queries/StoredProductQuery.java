package com.lucapolizzo.market.queries;

import com.lucapolizzo.market.command.order.SearchOrderCommand;
import com.lucapolizzo.market.models.entities.StoredProduct;
import com.lucapolizzo.market.command.storedProduct.SearchStoredProductCommand;
import com.lucapolizzo.market.queries.GenericQuery.GenericQuery;
import com.lucapolizzo.market.repositories.StoredProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Locale;
import java.util.Objects;

@Service
public class StoredProductQuery extends GenericQuery {

    @Autowired
    public StoredProductRepository storedProductRepository;

    private SearchStoredProductCommand command;

    public Specification<StoredProduct> where() {

        Specification<StoredProduct> specification = Specification.where(null);
        if (command.getCodice() != null) {
            specification = Objects.requireNonNull(specification).and((root, query, criteriaBuilder) -> {
                return criteriaBuilder.equal(root.get("codice"), command.getCodice());
            });
        }
        if (command.getNome() != null) {
            specification = Objects.requireNonNull(specification).and((root, query, criteriaBuilder) -> {
                //return criteriaBuilder.like(root.get("nome"), "%" + command.getNome() + "%");
                return criteriaBuilder.like(criteriaBuilder.upper(root.get("nome")), "%" + command.getNome().toUpperCase() + "%");
            });
        }
        if (command.getDeleted() != null) {
            specification = Objects.requireNonNull(specification).and((root, query, criteriaBuilder) -> {
                return criteriaBuilder.equal(root.get("deleted"), command.getDeleted());

            });
        }
        if (command.getQta() != null) {
            specification = Objects.requireNonNull(specification).and((root, query, criteriaBuilder) -> {
                return criteriaBuilder.greaterThanOrEqualTo(root.get("qta"), command.getQta());
            });
        }
        if (command.getQta() == null) {
            specification = Objects.requireNonNull(specification).and((root, query, criteriaBuilder) -> {
                return criteriaBuilder.gt(root.get("qta"), 0);
            });
        }

        if (command.getPrezzo() != null) {
            specification = Objects.requireNonNull(specification).and((root, query, criteriaBuilder) -> {
                return criteriaBuilder.lessThanOrEqualTo(root.get("prezzo"), command.getPrezzo());
            });
        }
        if (command.getDescrizione() != null) {
            specification = Objects.requireNonNull(specification).and((root, query, criteriaBuilder) -> {
                return criteriaBuilder.like(root.get("descrizione"), "%" + command.getDescrizione() + "%");
            });
        }
        return specification;
    }

    public Page<StoredProduct> all(SearchStoredProductCommand command) {
        this.command = command;
        return storedProductRepository.findAll(where(), getPageable(command));
    }

    public int count(SearchStoredProductCommand command) {
        this.command = command;
        return storedProductRepository.count(where());
    }

    public Pageable getPageable(SearchOrderCommand command) {
        return super.getPageable(command);
    }
}
