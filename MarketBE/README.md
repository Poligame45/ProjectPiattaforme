# Gym Store
Progetto realizzato da Luca Polizzo mat.189952
Framework utilizzati: SpringBoot e Ionic(Angular)

## Features
* Registrazione utenti
* Password encryption tramite BCrypt
* Autorizzazione ruoli basata su Spring Security
* Personalizzazione accessi API

## Features Admin
* Aggiungere/modificare prodotti
* Gestione ordini cliente
* Gestione prodotti in magazzino
* Visualizzazione Home page Cliente
* Creazione di una nuova utenza di un nuovo ADMIN tramite registrazione

## Features Customer
* Ricerca prodotti
* Aggiunta prodotti al carrello
* Gestione carrello (rimozione prodotti, modifica qta prodotti)
* Visualizzazione dei propri ordini
* Inviare una richiesta di assistenza agli admin
* Visualizzare le informazioni personali
* Registrarsi

## Technologies
* Spring Security
* JSON Web Tokens (JWT)
* BCrypt
* Maven
* Ionic
* Angular
* GIT
* PostgreSQL

## Dettagli implementativi BE
* Utilizzo della paginazione
* Utilizzo della classe Specification per effettuare le query sul DB
* Utilizzo di Command e DTO per pulizia del codice
* Eliminazione di ordini e prodotti valorizzando il campo Deleted anziché eliminare realmente il prodotto
per tenere traccia dei prodotti che sono stati eliminati 


## Dettagli implementativi FE
* Creazione di componenti custom (es. paginatore FE)
* Utilizzo dei componenti messi a disposizione da Ionic
* Utilizzo di Subject per la notifica carrello
* Utilizzo delle direttive @ViewChild per effettuare query sul DOM
* Creazione di servizi Custom per richiamare le APi
* Utilizzo di Command e DTO per una migliore organizzazione del progetto
* 

## Getting Started
All'avvio dell'applicazione verrà eseguito il metodo run della classe InitDB per popolare il DB
* JDK 17+
* Maven 3+


## Tema
* Il progetto è basato sulla volontà di rappresentare uno store online di prodotti per persone che si allenano in palestra
