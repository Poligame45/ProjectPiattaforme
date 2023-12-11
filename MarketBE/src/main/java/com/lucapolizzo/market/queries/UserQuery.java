package com.lucapolizzo.market.queries;

import com.lucapolizzo.market.command.storedProduct.SearchStoredProductCommand;
import com.lucapolizzo.market.command.user.SearchUserCommand;
import com.lucapolizzo.market.models.entities.StoredProduct;
import com.lucapolizzo.market.models.entities.User;
import com.lucapolizzo.market.repositories.StoredProductRepository;
import com.lucapolizzo.market.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class UserQuery {

    @Autowired
    public UserRepository userRepository;

    private SearchUserCommand command;

    public Specification<User> where() {

        Specification<User> specification = Specification.where(null);
        if (command.getId() != null) {
            specification = Objects.requireNonNull(specification).and((root, query, criteriaBuilder) -> {
                return criteriaBuilder.equal(root.get("id"), command.getId());
            });
        }
        if (command.getFirstname() != null) {
            specification = Objects.requireNonNull(specification).and((root, query, criteriaBuilder) -> {
                return criteriaBuilder.like(root.get("firstname"), "%" + command.getFirstname() + "%");

            });
        }
        if (command.getEmail() != null) {
            specification = Objects.requireNonNull(specification).and((root, query, criteriaBuilder) -> {
                return criteriaBuilder.equal(root.get("email"), command.getEmail());
            });
        }
        if (command.getAddress() != null) {
            specification = Objects.requireNonNull(specification).and((root, query, criteriaBuilder) -> {
                return criteriaBuilder.equal(root.get("address"), command.getAddress());
            });
        }
        return specification;
    }

    public Page<User> all(SearchUserCommand command) {
        this.command = command;
        return userRepository.findAll(where(), getPageable(command));
    }

    public int count(SearchUserCommand command) {
        this.command = command;
        return userRepository.count(where());
    }

    public Pageable getPageable(SearchUserCommand command) {
        Pageable pageable;
        if (command != null && command.getCurrent() != null && command.getTake() != null) {
            pageable = PageRequest.of(command.getCurrent(), command.getTake());
        } else {
            pageable = PageRequest.of(0, 10);
        }
        return pageable;
    }
}
