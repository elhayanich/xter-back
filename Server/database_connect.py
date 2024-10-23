import mysql.connector

# Configuration de la connexion à la base de données
# UNE FOIS CONFIGUREE, AJOUTER CE FICHIER A .GITIGNORE
db_config = {
    'user': 'root',
    'password': 'devia',
    'host': 'localhost',
    'database': 'xter'
}

def get_db_connection():
    return mysql.connector.connect(**db_config)