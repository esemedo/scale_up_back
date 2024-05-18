# Procédure de création des images Docker et Docker-compose et conventions d’écritures

# **Chapitre 1 : Introduction**

## -   **1.2** Objectifs de la documentation

Cette documentation s'adresse à l'équipe du projet Exploitation et a pour but de :
 -   Permettre à l'ensemble des développeurs du projet de comprendre et de reproduire la construction du projet.

- Simplifier la maintenance du projet en regroupant toutes les informations relatives à sa construction en un seul endroit.

# Chapitre 2 : Prérequis

*Ce chapitre présente les outils et les connaissances nécessaires pour suivre ce guide de documentation.*

#### **2.1 Outils nécessaires**

-   **[Docker](https://www.docker.com/):**  
>Docker est un outil de conteneurisation pour l'installation et l'exécution d'applications.
-   **[Docker Compose](https://docs.docker.com/compose/):**  
> Docker Compose est un outil pour  gerer plusieurs conteneurs Docker.
-   **Un éditeur de texte ou un IDE**  (Integrated Development Environment) 
> pour écrire le code et les fichiers de configuration.

-   **Un client SQL**  pour se connecter à la base de données.
***
#### **2.2 **Connaissances prérequises****

- **Notions de base en programmation**
-  **Compréhension des concepts de base de Docker et Docker Compose**
-    **Connaissance du langage SQL**
-   **Familiarité avec les systèmes de fichiers Linux**

# Chapitre 3 : Création des images Docker

####   **3.1**  Installation de Docker

*Ce chapitre explique comment installer Docker sur votre système.*
> **Avant de commencer, assurez-vous de disposer des éléments suivants :**

-   Un système d'exploitation compatible avec Docker (Windows, macOS, Linux)
-   Des droits d'administrateur sur votre système d'exploitation 

**1. Téléchargez [Docker Desktop](https://www.docker.com/products/docker-desktop/) depuis le site officiel :**

    https://www.docker.com/products/docker-desktop/

**2. Exécutez le fichier d'installation et suivez les instructions.**

**3. Vérifiez que Docker est correctement installé en lançant la commande suivante dans un terminal :**

    docker --version

> **Si la commande affiche la version de Docker, cela signifie que l'installation est réussie.**

**4. Lancez l'application Docker Desktop**
#
# Chapitre 4 : Configuration de Docker Compose

*Ce chapitre explique comment configurer Docker Compose pour le projet.*

**4.1 Installation de Docker Compose**

> **Docker Compose est déjà intégré  à Docker Desktop**

**Pour vérifier si Docker Compose est déjà installé, lancez la commande suivante dans un terminal :**

    docker compose version
    

> **Si la commande affiche la version de Docker Compose, cela signifie qu'il est déjà installé.**

**Si Docker Compose n'est pas installé, vous pouvez l'installer en suivant les instructions de la [documentation officielle](https://docs.docker.com/compose/install) :**

    https://docs.docker.com/compose/install
***

 **4.2 Création d'un fichier docker-compose.yml**

> **Le fichier `docker-compose.yml` est un fichier de configuration qui définit les services et les réseaux de votre application.**

**Créez un nouveau fichier nommé `docker-compose.yml` dans le répertoire de votre projet.**

**Le contenu du fichier `docker-compose.yml` dépend de votre application.**

**Voici le fichier `docker-compose.yml` de notre projet :**

  

    version: '3.7'
    
    services:
      api:
        build:
          context: ../
          dockerfile: ./docker/Dockerfile-dev
        depends_on:
          - db
        volumes:
          - ../src:/app/src
        ports:
          - "3000:3000"
          - "5555:5555"
      db:
        image: postgres
        restart: always
        environment:
          POSTGRES_DB: ${POSTGRES_DB}
          POSTGRES_USER: ${POSTGRES_USER}
          POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
          DATABASE_URL: ${DATABASE_URL}
        env_file:
          - ../.env
        ports:
          - "5432:5432"
    
      adminer:
        image: adminer
        restart: always
        depends_on:
          - api
        ports:
          - "8080:8080"

**Ce fichier définit trois services :**

-   **api:**
    
    -   Ce service construit une image à partir d'un Dockerfile situé dans un autre répertoire (`../docker/Dockerfile-dev`).
    -   Il dépend du service  `db`  pour démarrer, ce qui signifie qu'il a besoin de la base de données avant de pouvoir fonctionner.
-   **db:**
    
    -   Ce service utilise l'image officielle  `postgres`  de Docker Hub.
> Docker hub est une plateforme en ligne qui permet aux utilisateurs de
> stocker, de partager et de télécharger des images de conteneurs.

   - Il redémarre automatiquement en cas de panne (`restart: always`).
    -   Il définit plusieurs variables d'environnement, mais leurs valeurs sont dans le fichier `.env`.
-   **adminer:**
    
    -   Ce service utilise l'image  `adminer`, qui fournit une interface web pour gérer votre base de données PostgreSQL.
    -   Il redémarre également automatiquement et dépend du service  `api`  pour être exécuté en premier.

**Version: '3.7'** : Cette ligne spécifie la version du format de fichier Docker Compose utilisé.
***
**4.3 Démarrage des services avec Docker Compose**

**Pour lancer les services définis dans le fichier `docker-compose.yml`, lancez la commande suivante dans un terminal :**


    docker compose up

> Cette commande démarrera tous les services en arrière-plan.

**Vous pouvez également lancer un seul service en spécifiant son nom :**


    docker compose up NomDuService

**Pour arrêter les services, lancez la commande suivante :**

    docker compose down
***

Dans le cadre du projet, nous devons exécuter ces commandes (coté back) afin de lancer les services :

Build : 

    docker compose -f docker/docker-compose-dev.yml build

Lancement : 

    docker compose -f docker/docker-compose-dev.yml up

# Chapitre 5 : Conventions d'écriture

*Ce chapitre décrit les conventions d'écriture utilisées dans le projet.*

**5.1 Nommage des fichiers et des variables**

- Les noms de fichiers doivent être en minuscules et utiliser des tirets du bas pour séparer les mots.

- Les noms de variables doivent être en minuscules, en anglais et utiliser des camelCase.
***

**5.2 Style de code**

- L'ensemble du code doit être en anglais à l'exception des éléments visibles à l'écran pour l'utilisateur 
- Utiliser l'import `@`

> @ est un alias pour le dossier src. Il permet d'importer des fichiers
> en partant du dossier src, sans avoir à utiliser des ../../../../

- Utiliser Prettier

> Prettier est un formateur de code. Il permet de mettre en forme le code. Je vous recommande d'activer l'options "Format on save" dans les paramètres de VSCode.

- Supprimer les packages non utilisés (Optionel) :

    npm prune

**Git :** 

Le naming des branches : 

Numéro du backlog - Numéro du ticket - Feature 

exemple : 04-SD11-Login 

Vous trouverez le numéro de votre ticket sur JIRA : Ex : Numéro du ticket (SD-11).

***

**5.3 Documentation du code**

-   Chaque fonction et chaque classe doit être documentée.
-   Les commentaires doivent être clairs et concis.

**5.4 Style**
- tous les éléments graphiques doivent respecter la charte graphique définie dans le [Discord](https://discord.com/channels/1178687201299677234/1178963705673822218/1180087292442984499) 

*** 
# Chapitre 6 : Accès base de donnée 

Pour la base de donnée, nous utilisions Prisma 

> Prisma ORM est un outil de mapping objet-relationnel (ORM) qui permet
> de simplifier la gestion des bases de données en créant une couche
> d’abstraction entre le code applicatif et la base de données
> relationnelle.

Pour lancer Prisma Studio tapez ces commandes dans le terminal (coté back) :

    docker exec -it docker-api-1 sh
   
puis :

    npx prisma studio

> Prisma Studio est une interface d'administration moderne pour la base de données.
***
**Génération des modèles Prisma :**

pour générer les modèles Prisma, on utilise la commande suivante :

    prisma generate

***
Pour synchroniser le modèle Prisma avec la structure de la base de données, on utilise Prisma Migrate,  c'est un outil de migration. Voici comment il fonctionne :

Pour générer une migration Prisma, on exécute la commande suivante :

    npx prisma migrate dev --name votrenom


