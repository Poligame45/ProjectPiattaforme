package com.lucapolizzo.market.queries.GenericQuery;

import com.lucapolizzo.market.command.generic.GenericSearchCommand;
import com.lucapolizzo.market.command.storedProduct.SearchStoredProductCommand;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

public class GenericQuery {
    public Pageable getPageable(GenericSearchCommand command) {
        Pageable pageable;
        if (command != null && command.getCurrent() != null && command.getTake() != null) {
            pageable = PageRequest.of(command.getCurrent(), command.getTake());
        } else {
            pageable = PageRequest.of(0, 10);
        }
        return pageable;
    }
}
