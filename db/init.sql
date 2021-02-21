create or replace table Voiture(
ID_VOITURE int PRIMARY KEY,
Plaque_Immatriculation varchar(20) UNIQUE,
Modèle varchar(50) NOT NULL,
Couleur varchar(20) NOT NULL,
Etat varchar(20) NOT NULL,
URL_IMAGE varchar(50) NOT NULL);

create or replace table centre(
ID_CENTRE int PRIMARY KEY,
Région Varchar(20) NOT NULL,
Ville Varchar(20) NOT NULL,
Adresse Varchar(50) NOT NULL,
Code_Postal Varchar(20) NOT NULL);

create or replace table client(
ID_CLIENT int AUTO_INCREMENT PRIMARY KEY,
Nom varchar(50) NOT NULL,
Prénom varchar(50) NOT NULL,
Email varchar(50),
Téléphone varchar(20),
N_Carte_Banquare int,
Password varchar(50));

create or replace table location(
ID_LOCATION int AUTO_INCREMENT PRIMARY KEY,
Prix int NOT NULL,
Date_Départ date NOT NULL,
Date_Arrivée date,
ID_CLIENT int,
Centre_Départ int NOT NULL,
Centre_Arrivée int,
FOREIGN KEY (ID_CLIENT) REFERENCES Client(ID_CLIENT),
FOREIGN KEY (Centre_Départ) REFERENCES Centre(ID_CENTRE),
FOREIGN KEY (Centre_Arrivée) REFERENCES Centre(ID_CENTRE));
