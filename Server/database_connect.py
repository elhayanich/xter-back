import mysql.connector


# Configuration de la connexion à la base de données
# UNE FOIS CONFIGUREE, AJOUTER CE FICHIER A .GITIGNORE
db_config = {
    'user': 'chaymae',
    'password': 'chay',
    'host': 'localhost',
    'database': 'xter'
}

def get_db_connection():
    c = mysql.connector.connect(**db_config)
    return c