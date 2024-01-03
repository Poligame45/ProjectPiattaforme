package com.lucapolizzo.market.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;

import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfiguration {


    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(req -> req
                        .requestMatchers("/**").permitAll()
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers("/searchProducts/**").permitAll()
                        .requestMatchers("/products/addStoredProduct", "/products/updateStoredProduct", "/products/deleteStoredProduct").hasAuthority("ADMIN")
                        .requestMatchers("/admin/**").hasAuthority("ADMIN")
                        .requestMatchers("/orders/addOrder").hasAuthority("CUSTOMER")
                        .requestMatchers("/orders/searchOrders", "/orders/getOrder").authenticated()
                        .requestMatchers("/basket/**").hasAuthority("CUSTOMER")
                        .requestMatchers("/request/searchOrders", "/orders/getOrder").authenticated()
                        .requestMatchers("/request/addRequest").hasAuthority("CUSTOMER")
                        .requestMatchers("/getUserInfo/**").authenticated()
                        .anyRequest()
                        .authenticated()
                )
                .sessionManagement(session -> session.sessionCreationPolicy(STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}
