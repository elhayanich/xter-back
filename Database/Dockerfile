# Utiliser l'image officielle de MySQL depuis Docker Hub
FROM mysql:8.0

# Définir les variables d'environnement pour MySQL
ENV MYSQL_ROOT_PASSWORD=rootpassword
ENV MYSQL_DATABASE=xter
ENV MYSQL_USER=chaymae
ENV MYSQL_PASSWORD=chay

# Exposer le port MySQL
EXPOSE 3306

# Copier le script SQL dans le répertoire d'initialisation de MySQL
COPY ./init-scripts/Create_Database.sql /docker-entrypoint-initdb.d/

# L'image officielle de MySQL exécute automatiquement les scripts dans ce répertoire
