package com.lucapolizzo.market.controller.userInfo;

import com.lucapolizzo.market.command.user.GetDeleteUserCommand;
import com.lucapolizzo.market.dto.user.UserDTO;
import com.lucapolizzo.market.services.UserService;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/userInfo")
@Slf4j
@CrossOrigin("http://localhost:8100")
public class UserInfoController {

    @Autowired
    private UserService userService;


    @Transactional
    @PostMapping("/getUserInfo")
    public ResponseEntity<UserDTO> searchUserByCustomer(@RequestBody GetDeleteUserCommand command){
        UserDTO userDTO = userService.getUser(command);
        return new ResponseEntity<>(userDTO, HttpStatus.OK);
    }

}
