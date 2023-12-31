package com.lucapolizzo.market.services;

import com.lucapolizzo.market.command.request.AddUpdateRequestCommand;
import com.lucapolizzo.market.command.request.SearchRequestCommand;
import com.lucapolizzo.market.dto.request.ListRequestDTO;
import com.lucapolizzo.market.dto.request.RequestDTO;
import com.lucapolizzo.market.models.entities.Request;
import com.lucapolizzo.market.models.entities.User;
import com.lucapolizzo.market.queries.RequestQuery;
import com.lucapolizzo.market.repositories.RequestRepository;
import com.lucapolizzo.market.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class RequestService {

    @Autowired
    private RequestQuery query;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RequestRepository requestRepository;


    @Transactional
    public ListRequestDTO search(SearchRequestCommand command){
        Page<Request> searchList = query.all(command);
        List<RequestDTO> returnList = new ArrayList<>();

        if ((searchList != null) && (searchList.hasContent())) {

            List<Request> listRequest = searchList.getContent();
            for (Request request : listRequest) {
                returnList.add(convertToDTO(request));
            }
        }
        return new ListRequestDTO(returnList, query.count(command));
    }
    @Transactional
    public RequestDTO addRequest(AddUpdateRequestCommand command){
        Optional<User> optionalUser = userRepository.findById(command.getCustomerId());
        if(!optionalUser.isPresent()) return null;
        User user = optionalUser.get();
        Request request = new Request();
        request.setContent(command.getContent());
        request.setCustomer(user);
        requestRepository.save(request);
        return convertToDTO(request);
    }
    public static RequestDTO convertToDTO(Request request){
        RequestDTO requestDTO = new RequestDTO();
        requestDTO.setId(request.getId());
        requestDTO.setCustomer(request.getCustomer());
        requestDTO.setContent(request.getContent());
        return requestDTO;
    }
}
