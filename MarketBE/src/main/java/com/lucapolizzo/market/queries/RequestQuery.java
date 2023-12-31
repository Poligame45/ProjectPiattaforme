package com.lucapolizzo.market.queries;

import com.lucapolizzo.market.command.request.SearchRequestCommand;
import com.lucapolizzo.market.models.entities.Request;
import com.lucapolizzo.market.queries.GenericQuery.GenericQuery;
import com.lucapolizzo.market.repositories.RequestRepository;
import com.lucapolizzo.market.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class RequestQuery extends GenericQuery {
    @Autowired
    public RequestRepository requestRepository;

    @Autowired
    public UserRepository userRepository;

    private SearchRequestCommand command;

    public Specification<Request> where() {

        Specification<Request> specification = Specification.where(null);
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
        return specification;
    }

    public Page<Request> all(SearchRequestCommand command) {
        this.command = command;
        return requestRepository.findAll(where(), getPageable(command));
    }

    public int count(SearchRequestCommand command) {
        this.command = command;
        return requestRepository.count(where());
    }

    public Pageable getPageable(SearchRequestCommand command) {
        return super.getPageable(command);
    }

}
