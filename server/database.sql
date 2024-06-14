CREATE DATABASE medecin;


//0
CREATE TABLE patient (
    n_dossier SERIAL PRIMARY KEY,
    nom VARCHAR(255),
    prenom VARCHAR(255),
    age int 
);



  //consultation


CREATE TABLE consultation (
    consultation_id SERIAL PRIMARY KEY,
    patient_id INT REFERENCES patient(n_dossier),
    date_consultation DATE,
  



);


//3
 CREATE TABLE avoir_antecedents (
    n_dossir INT,
    antecedent_id INT,
    id_type_antecedents INT,
    FOREIGN KEY (n_dossir) REFERENCES Patients(n_dossir),
    FOREIGN KEY (antecedent_id) REFERENCES Antecedents(antecedent_id),
    FOREIGN KEY (id_type_antecedents) REFERENCES Type_Antecedents(id_type_antecedents)
);
//2
CREATE TABLE Antecedents (
    antecedent_id SERIAL PRIMARY KEY,
    nom_antecedent VARCHAR(255) NOT NULL
);
//1
CREATE TABLE Type_Antecedents (
    id_type_antecedents SERIAL PRIMARY KEY,
    type_antecedent VARCHAR(100) NOT NULL
);
INSERT INTO Type_Antecedents (type_antecedent) VALUES //not attribu 
    ('Familiaux'),
    ('Chirurgicaux'),
    ('Medicaux');

    //commande that i neead to insert some diseases with specific type 
  














CREATE TABLE medicaments (
    id SERIAL PRIMARY KEY,
    designation VARCHAR(255),
    dosage VARCHAR(100),
    forme VARCHAR(100),
    conditionnement VARCHAR(100),
    laboratoire VARCHAR(100),
    pays_laboratoire VARCHAR(100)
);



CREATE TABLE bilan (
       n_dossir INT,
    id SERIAL PRIMARY KEY,
  
    FOREIGN KEY (n_dossir) REFERENCES Patients(n_dossir),
);



SELECT * FROM bilan;

 CREATE TABLE users (
   
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
  );











  CREATE TYPE type_antecedent AS ENUM ('type1', 'type2', 'type3');
CREATE TABLE Antecedents (
    antecedent_id SERIAL PRIMARY KEY,
    nom_antecedent VARCHAR(255) NOT NULL,
    type_antecedent type_antecedent NOT NULL
);
INSERT INTO Antecedents (nom_antecedent, type_antecedent)
VALUES ('Maladie Cardiaque', 'type1'),
       ('Diabète', 'type2'),
       ('Hypertension', 'type3');







INSERT INTO Antecedents (nom_antecedent, type_antecedent)
VALUES 
('Cancer', 'Familiaux'),
('Diabète de type 2', 'Familiaux'),
('Hypertension artérielle', 'Familiaux'),
('Maladie cardiaque', 'Familiaux'),
('Maladie Alzheimer', 'Familiaux'),
('Asthme', 'Familiaux'),
('Obésité', 'Familiaux'),
('Maladie de Parkinson', 'Familiaux');

INSERT INTO Antecedents (nom_antecedent, type_antecedent)
VALUES 
('Fracture du col du fémur', 'Chirurgicaux'),
('Fracture de la rotule', 'Chirurgicaux'),
('Fracture de la hanche', 'Chirurgicaux'),
('Fracture de la clavicule', 'Chirurgicaux'),
('Fracture du poignet', 'Chirurgicaux'),
('Fracture du bras', 'Chirurgicaux'),
('Fracture de la cheville', 'Chirurgicaux'),
('Fracture de la jambe', 'Chirurgicaux'),
('Luxation de épaule', 'Chirurgicaux'),
('Luxation du genou', 'Chirurgicaux');







 Groupage
 FNS
 Glycémie
 Créatininémie
 Urée
 Sérologie*
TCK - TP - INR
Fibrinogène
Ionogramme sanguin
 Bilan hépatite*
LDH
 Bilan lipidique*
 Lipasémie
Calcémie
 Phosphorémie
TSH
 T3 - T4
Thyrocalcitonine
Ac anti-thyroglobuline
PSA*
Marqueur tumoral*
CRP - VS
Fer sérique
ferritine
Troponines
 Bilan protidine*
FSH - LH
Taux de prolactine
Progestérone
Oestrogènes
Testostérone
Beta HCG
 Vitamine D*
Chimie des urines
ECBU
Bilan inflammatoire*
HBAIC
D-Dimêtres
 Acide urioue





 CREATE TABLE ordonnance_medicaments (
    ordonnance_id INT REFERENCES ordonnance(id_ordonnance) ON DELETE CASCADE,
    medicament_id INT REFERENCES medicaments(id_medicaments) ON DELETE CASCADE,
    PRIMARY KEY (ordonnance_id, medicament_id)
);
CREATE TABLE ordonnance (
    id_ordonnance SERIAL PRIMARY KEY,
    consultation_id INT REFERENCES consultation(consultation_id) ON DELETE CASCADE
);
medecin=# SELECT *  FROM medicaments;
 id_medicaments | designation | dosage |  forme   |  description