package com.lucapolizzo.market.controller.auth;

import com.lucapolizzo.market.dto.auth.AuthenticationDTO;
import com.lucapolizzo.market.services.AuthenticationService;
import com.lucapolizzo.market.command.auth.AuthenticationCommand;
import com.lucapolizzo.market.command.auth.RegisterCommand;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin("http://localhost:8100")
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationDTO> register(@RequestBody RegisterCommand request) {
        AuthenticationDTO authenticationDTO = service.register(request);
        if (authenticationDTO == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } else if (authenticationDTO.getAccessToken() == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        } else {

            return new ResponseEntity<>(authenticationDTO, HttpStatus.OK);
        }
    }



    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationDTO> authenticate(@RequestBody AuthenticationCommand request) {

        AuthenticationDTO authenticationDTO = service.authenticate(request);

        if (authenticationDTO.getAccessToken() == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        } else {
            return new ResponseEntity<>(authenticationDTO, HttpStatus.OK);
        }
    }


}
