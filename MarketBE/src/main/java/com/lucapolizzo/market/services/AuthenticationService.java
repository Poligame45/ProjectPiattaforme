package com.lucapolizzo.market.services;

import com.lucapolizzo.market.dto.auth.AuthenticationDTO;
import com.lucapolizzo.market.command.auth.AuthenticationCommand;
import com.lucapolizzo.market.command.auth.RegisterCommand;
import com.lucapolizzo.market.config.JwtService;
import com.lucapolizzo.market.models.entities.Basket;
import com.lucapolizzo.market.models.entities.User;
import com.lucapolizzo.market.repositories.UserRepository;
import com.lucapolizzo.market.user.Role;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Transactional
    public AuthenticationDTO register(RegisterCommand request) {
        User user = User.builder()
                .firstname(request.getFirstname())
                .address(request.getAddress())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .build();
        if (user.getRole().equals(Role.CUSTOMER)) {
            Basket basket = new Basket();
            user.setBasket(basket);
        }
        String jwtToken = jwtService.generateToken(user);

        repository.save(user);

        return AuthenticationDTO.builder()
                .accessToken(jwtToken)
                .user(user)
                .build();
    }

    @Transactional
    public AuthenticationDTO authenticate(AuthenticationCommand request) {
        try {

            Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
            if (authenticate.isAuthenticated()) {
                SecurityContextHolder.getContext().setAuthentication(authenticate);
                Optional<User> optionalUser = repository.findByEmail(request.getEmail());
                if (!optionalUser.isPresent()) {
                    return new AuthenticationDTO();
                }
                User user = optionalUser.get();
                String jwtToken = jwtService.generateToken(user);
                return AuthenticationDTO.builder()
                        .accessToken(jwtToken)
                        .user(user)
                        .build();
            }
        } catch (AuthenticationException e) {
        }
        return new AuthenticationDTO();
    }

}
