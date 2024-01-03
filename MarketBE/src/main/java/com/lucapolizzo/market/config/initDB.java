package com.lucapolizzo.market.config;

import com.lucapolizzo.market.models.entities.Basket;
import com.lucapolizzo.market.models.entities.StoredProduct;
import com.lucapolizzo.market.models.entities.User;
import com.lucapolizzo.market.repositories.StoredProductRepository;
import com.lucapolizzo.market.repositories.UserRepository;
import com.lucapolizzo.market.user.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class initDB implements CommandLineRunner {
    @Override
    public void run(String... args) throws Exception {
        initUsers();
        initStoredProducts();
    }

    @Autowired
    UserRepository userRepository;
    @Autowired
    StoredProductRepository productRepository;

    private void initUsers(){
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        User customer1 = new User();
        customer1.setEmail("luca@gmail.com");
        customer1.setRole(Role.CUSTOMER);
        customer1.setFirstname("Luca");
        customer1.setLastname("Polizzo");
        customer1.setBasket(new Basket());
        customer1.setPassword(passwordEncoder.encode("a"));
        customer1.setAddress("Via pietro bucci - 87036 Rende (CS)");

        User admin = new User();
        admin.setEmail("luca@admin.com");
        admin.setRole(Role.ADMIN);
        admin.setFirstname("Luca");
        admin.setLastname("Polizzo");
        admin.setPassword(passwordEncoder.encode("a"));
        admin.setAddress("Via pietro bucci - 87036 Rende (CS)");

        userRepository.save(customer1);
        userRepository.save(admin);

    }
    private void initStoredProducts(){
        StoredProduct storedProduct1 = new StoredProduct();
        storedProduct1.setNome("Creatine MonoHydrate");
        storedProduct1.setDescrizione("Creatina monoidratata 300gr.");
        storedProduct1.setQta(20);
        storedProduct1.setImg("..\\..\\assets\\images\\creatine.jpg");
        storedProduct1.setPrezzo(25.5);
        storedProduct1.setDeleted(false);

        StoredProduct storedProduct2 = new StoredProduct();
        storedProduct2.setNome("Creatine Creapure");
        storedProduct2.setDescrizione("Creatina Creapure Black 300gr. altamente concentrata");
        storedProduct2.setQta(20);
        storedProduct2.setImg("..\\..\\assets\\images\\creatine-black.jpg");
        storedProduct2.setPrezzo(25.5);
        storedProduct2.setDeleted(false);

        StoredProduct storedProduct3 = new StoredProduct();
        storedProduct3.setNome("EAA - Amminoacidi");
        storedProduct3.setDescrizione("Amminoacidi essenziali gusto arancia 309gr.");
        storedProduct3.setQta(20);
        storedProduct3.setImg("..\\..\\assets\\images\\eaa.jpg");
        storedProduct3.setPrezzo(25.5);
        storedProduct3.setDeleted(false);

        StoredProduct storedProduct4 = new StoredProduct();
        storedProduct4.setNome("Barretta Enervit");
        storedProduct4.setDescrizione("Barretta proteica enervit 25gr.");
        storedProduct4.setQta(20);
        storedProduct4.setImg("..\\..\\assets\\images\\enervit-barretta.jpg");
        storedProduct4.setPrezzo(25.5);
        storedProduct4.setDeleted(false);

        StoredProduct storedProduct5 = new StoredProduct();
        storedProduct5.setNome("Barretta Enervit White");
        storedProduct5.setDescrizione("Barretta proteica enervit al cioccolato bianco 25gr.");
        storedProduct5.setQta(20);
        storedProduct5.setImg("..\\..\\assets\\images\\enervit-barretta-white.jpg");
        storedProduct5.setPrezzo(25.5);
        storedProduct5.setDeleted(false);


        StoredProduct storedProduct6 = new StoredProduct();
        storedProduct6.setNome("Glutammine");
        storedProduct6.setDescrizione("Glutammine pure micronized 350gr.");
        storedProduct6.setQta(20);
        storedProduct6.setImg("..\\..\\assets\\images\\glutammine.png");
        storedProduct6.setPrezzo(25.5);
        storedProduct6.setDeleted(false);

        productRepository.save(storedProduct1);
        productRepository.save(storedProduct2);
        productRepository.save(storedProduct3);
        productRepository.save(storedProduct4);
        productRepository.save(storedProduct5);
        productRepository.save(storedProduct6);


    }

}
