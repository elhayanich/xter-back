import pandas as pd
from models import UserCreate
from pprint import pprint

# Fichier source + modèle new_user
ds = pd.read_csv("../Database/Kaggle_Sentimentdataset.csv")

# récupérer les profils avant de les injecter dans la DB (cf register_route)
new_users_unprocessed = []
for i in range(len(ds)):
    new_user = UserCreate(
        username= ds.iloc[i]["User"], 
        email=ds.iloc[i]["User"]+"@mail.com", 
        password="1234567a", 
        picture=None, 
        is_admin=False)
    # enlever les espaces
    new_user.username = new_user.username.replace(" ", "")
    new_user.email= new_user.email.replace(" ", "")
    new_users_unprocessed.append(new_user)




pprint(new_users_unprocessed)




## .iloc[i] pour accéder à une ligne spécifique