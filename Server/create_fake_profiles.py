import pandas as pd
from models import UserCreate
from pprint import pprint

# Fichier source + modèle new_user
ds = pd.read_csv("../Database/Kaggle_Sentimentdataset.csv")

# récupérer les profils avant de les injecter dans la DB (cf register_route) & leurs messages 
fake_users_set1 = []
for i in range(len(ds)):
    new_user = UserCreate(
        username= ds.iloc[i]["User"], 
        email=ds.iloc[i]["User"]+"@mail.com", 
        password="1234567a")
    # enlever les espaces
    new_user.username = new_user.username.replace(" ", "")
    new_user.email= new_user.email.replace(" ", "")
    fake_users_set1.append(new_user)

# récupérer les nouveaux messages
fake_messages_set1 = []
for i in range(len(ds)):
    new_message = ds.iloc[i]["Text"]
    fake_messages_set1.append(new_message)



## .iloc[i] pour accéder à une ligne spécifique