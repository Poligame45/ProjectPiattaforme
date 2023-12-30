package com.lucapolizzo.market.queries;

import com.lucapolizzo.market.command.order.SearchOrderCommand;
import com.lucapolizzo.market.models.entities.Order;
import com.lucapolizzo.market.repositories.OrderRepository;
import com.lucapolizzo.market.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class OrderCustomerQuery {

    @Autowired
    public OrderRepository orderRepository;

    @Autowired
    public UserRepository userRepository;

    private SearchOrderCommand command;

    public Specification<Order> where() {

        Specification<Order> specification = Specification.where(null);
        if (command.getCustomerId() != null) {
            specification = Objects.requireNonNull(specification).and((root, query, criteriaBuilder) -> {
                return criteriaBuilder.equal(root.get("customer"), userRepository.findById(command.getCustomerId()).get());
            });
        }
        if(command.getId() != null){
            specification = Objects.requireNonNull(specification).and((root, query, criteriaBuilder) -> {
                return criteriaBuilder.equal(root.get("id"), command.getId());
            });
        }
        if(command.getDataAcquistoDa() != null){
            specification = Objects.requireNonNull(specification).and((root, query, criteriaBuilder) -> {
                return criteriaBuilder.between(root.get("dataAcquisto"),command.getDataAcquistoDa(),command.getDataAcquistoA());
            });
        }
        if(command.getTotale() != null){
            specification = Objects.requireNonNull(specification).and((root, query, criteriaBuilder) -> {
                return criteriaBuilder.greaterThanOrEqualTo(root.get("totale"), command.getTotale());
            });
        }
        if(command.getDeleted() != null){
            specification = Objects.requireNonNull(specification).and((root, query, criteriaBuilder) -> {
                return criteriaBuilder.equal(root.get("deleted"), command.getDeleted());
            });
        }
        return specification;
    }

    public Page<Order> all(SearchOrderCommand command) {
        this.command = command;
        return orderRepository.findAll(where(), getPageable(command));
    }

    public int count(SearchOrderCommand command) {
        this.command = command;
        return orderRepository.count(where());
    }

    public Pageable getPageable(SearchOrderCommand command) {
        Pageable pageable;
        if (command != null && command.getCurrent() != null && command.getTake() != null) {
            pageable = PageRequest.of(command.getCurrent(), command.getTake());
        } else {
            pageable = PageRequest.of(0, 10);
        }
        return pageable;
    }
}
