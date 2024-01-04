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

    private void initUsers() {
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

    private void initStoredProducts() {
        StoredProduct storedProduct1 = new StoredProduct();
        storedProduct1.setNome("Creatine MonoHydrate");
        storedProduct1.setDescrizione("Creatina monoidratata 300gr.");
        storedProduct1.setQta(20);
        storedProduct1.setImg("..\\..\\assets\\images\\creatine.jpg");
        storedProduct1.setPrezzo(25.50);

        StoredProduct storedProduct2 = new StoredProduct();
        storedProduct2.setNome("Creatine Creapure");
        storedProduct2.setDescrizione("Creatina Creapure Black 300gr. altamente concentrata");
        storedProduct2.setQta(20);
        storedProduct2.setImg("..\\..\\assets\\images\\creatine-black.jpg");
        storedProduct2.setPrezzo(25.50);

        StoredProduct storedProduct3 = new StoredProduct();
        storedProduct3.setNome("EAA - Amminoacidi");
        storedProduct3.setDescrizione("Amminoacidi essenziali gusto arancia 309gr.");
        storedProduct3.setQta(20);
        storedProduct3.setImg("..\\..\\assets\\images\\eaa.jpg");
        storedProduct3.setPrezzo(25.50);

        StoredProduct storedProduct4 = new StoredProduct();
        storedProduct4.setNome("Barretta Enervit");
        storedProduct4.setDescrizione("Barretta proteica enervit 25gr.");
        storedProduct4.setQta(20);
        storedProduct4.setImg("..\\..\\assets\\images\\enervit-barretta.jpg");
        storedProduct4.setPrezzo(25.50);

        StoredProduct storedProduct5 = new StoredProduct();
        storedProduct5.setNome("Barretta Enervit White");
        storedProduct5.setDescrizione("Barretta proteica enervit al cioccolato bianco 25gr.");
        storedProduct5.setQta(20);
        storedProduct5.setImg("..\\..\\assets\\images\\enervit-barretta-white.jpg");
        storedProduct5.setPrezzo(25.50);


        StoredProduct storedProduct6 = new StoredProduct();
        storedProduct6.setNome("Glutammine");
        storedProduct6.setDescrizione("Glutammine pure micronized 350gr.");
        storedProduct6.setQta(20);
        storedProduct6.setImg("..\\..\\assets\\images\\glutammine.png");
        storedProduct6.setPrezzo(25.50);

        StoredProduct storedProduct7 = new StoredProduct();
        storedProduct7.setNome("Kit proteine - Bcaa");
        storedProduct7.setDescrizione("Proteine ed amminoacidi BCAA in un solo pacchetto");
        storedProduct7.setQta(60);
        storedProduct7.setImg("..\\..\\assets\\images\\protein-bcaa.jpg");
        storedProduct7.setPrezzo(59.99);

        StoredProduct storedProduct8 = new StoredProduct();
        storedProduct8.setNome("Proteine WHEY");
        storedProduct8.setDescrizione("Proteine WHEY 73 serv. Low Sugar");
        storedProduct8.setQta(60);
        storedProduct8.setImg("..\\..\\assets\\images\\proteine-whey.jpg");
        storedProduct8.setPrezzo(45.00);

        StoredProduct storedProduct9 = new StoredProduct();
        storedProduct9.setNome("Amminoacidi - BCAA");
        storedProduct9.setDescrizione("BCAA - AMMINOACIDI 8.1.1 Integratore");
        storedProduct9.setQta(10);
        storedProduct9.setImg("..\\..\\assets\\images\\bcaa.jpg");
        storedProduct9.setPrezzo(45.00);

        StoredProduct storedProduct10 = new StoredProduct();
        storedProduct10.setNome("Barrette Self ");
        storedProduct10.setDescrizione("Barrette proti Snack al gusto di torta al cioccolato");
        storedProduct10.setQta(10);
        storedProduct10.setImg("..\\..\\assets\\images\\barretta-kit.jpg");
        storedProduct10.setPrezzo(12.00);

        StoredProduct storedProduct11 = new StoredProduct();
        storedProduct11.setNome("Hydro BCAA");
        storedProduct11.setDescrizione("BCAA 8.1.1 Amminoacidi ramificati");
        storedProduct11.setQta(10);
        storedProduct11.setImg("..\\..\\assets\\images\\bcaa-hydro.jpg");
        storedProduct11.setPrezzo(12.00);

        //Creo nuovi prodotti per far vedere la paginazione
        /*StoredProduct storedProduct12 = new StoredProduct();
        storedProduct12.setNome("Creatine MonoHydrate");
        storedProduct12.setDescrizione("Creatina monoidratata 300gr.");
        storedProduct12.setQta(20);
        storedProduct12.setImg("..\\..\\assets\\images\\creatine.jpg");
        storedProduct12.setPrezzo(25.50);

        StoredProduct storedProduct13 = new StoredProduct();
        storedProduct13.setNome("Creatine Creapure");
        storedProduct13.setDescrizione("Creatina Creapure Black 300gr. altamente concentrata");
        storedProduct13.setQta(20);
        storedProduct13.setImg("..\\..\\assets\\images\\creatine-black.jpg");
        storedProduct13.setPrezzo(25.50);

        StoredProduct storedProduct14 = new StoredProduct();
        storedProduct14.setNome("EAA - Amminoacidi");
        storedProduct14.setDescrizione("Amminoacidi essenziali gusto arancia 309gr.");
        storedProduct14.setQta(20);
        storedProduct14.setImg("..\\..\\assets\\images\\eaa.jpg");
        storedProduct14.setPrezzo(25.50);

        StoredProduct storedProduct15 = new StoredProduct();
        storedProduct15.setNome("Barretta Enervit");
        storedProduct15.setDescrizione("Barretta proteica enervit 25gr.");
        storedProduct15.setQta(20);
        storedProduct15.setImg("..\\..\\assets\\images\\enervit-barretta.jpg");
        storedProduct15.setPrezzo(25.50);

        StoredProduct storedProduct16 = new StoredProduct();
        storedProduct16.setNome("Barretta Enervit White");
        storedProduct16.setDescrizione("Barretta proteica enervit al cioccolato bianco 25gr.");
        storedProduct16.setQta(20);
        storedProduct16.setImg("..\\..\\assets\\images\\enervit-barretta-white.jpg");
        storedProduct16.setPrezzo(25.50);


        StoredProduct storedProduct17 = new StoredProduct();
        storedProduct17.setNome("Glutammine");
        storedProduct17.setDescrizione("Glutammine pure micronized 350gr.");
        storedProduct17.setQta(20);
        storedProduct17.setImg("..\\..\\assets\\images\\glutammine.png");
        storedProduct17.setPrezzo(25.50);

        StoredProduct storedProduct18 = new StoredProduct();
        storedProduct18.setNome("Kit proteine - Bcaa");
        storedProduct18.setDescrizione("Proteine ed amminoacidi BCAA in un solo pacchetto");
        storedProduct18.setQta(60);
        storedProduct18.setImg("..\\..\\assets\\images\\protein-bcaa.jpg");
        storedProduct18.setPrezzo(59.99);

        StoredProduct storedProduct19 = new StoredProduct();
        storedProduct19.setNome("Proteine WHEY");
        storedProduct19.setDescrizione("Proteine WHEY 73 serv. Low Sugar");
        storedProduct19.setQta(60);
        storedProduct19.setImg("..\\..\\assets\\images\\proteine-whey.jpg");
        storedProduct19.setPrezzo(45.00);

        StoredProduct storedProduct20 = new StoredProduct();
        storedProduct20.setNome("Amminoacidi - BCAA");
        storedProduct20.setDescrizione("BCAA - AMMINOACIDI 8.1.1 Integratore");
        storedProduct20.setQta(10);
        storedProduct20.setImg("..\\..\\assets\\images\\bcaa.jpg");
        storedProduct20.setPrezzo(45.00);

        StoredProduct storedProduct21 = new StoredProduct();
        storedProduct21.setNome("Barrette Self ");
        storedProduct21.setDescrizione("Barrette proti Snack al gusto di torta al cioccolato");
        storedProduct21.setQta(10);
        storedProduct21.setImg("..\\..\\assets\\images\\barretta-kit.jpg");
        storedProduct21.setPrezzo(12.00);

        StoredProduct storedProduct22 = new StoredProduct();
        storedProduct22.setNome("Hydro BCAA");
        storedProduct22.setDescrizione("BCAA 8.1.1 Amminoacidi ramificati");
        storedProduct22.setQta(10);
        storedProduct22.setImg("..\\..\\assets\\images\\bcaa-hydro.jpg");*/
        //storedProduct22.setPrezzo(12.00);



        productRepository.save(storedProduct1);
        productRepository.save(storedProduct2);
        productRepository.save(storedProduct3);
        productRepository.save(storedProduct4);
        productRepository.save(storedProduct5);
        productRepository.save(storedProduct6);
        productRepository.save(storedProduct7);
        productRepository.save(storedProduct8);
        productRepository.save(storedProduct9);
        productRepository.save(storedProduct10);
        productRepository.save(storedProduct10);
        productRepository.save(storedProduct11);

       /* productRepository.save(storedProduct12);
        productRepository.save(storedProduct13);
        productRepository.save(storedProduct14);
        productRepository.save(storedProduct15);
        productRepository.save(storedProduct16);
        productRepository.save(storedProduct17);
        productRepository.save(storedProduct18);
        productRepository.save(storedProduct19);
        productRepository.save(storedProduct20);
        productRepository.save(storedProduct21);
        productRepository.save(storedProduct22);*/



    }

}
