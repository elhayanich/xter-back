# reactiontype_route.py
from fastapi import APIRouter
from typing import List 
from models import ReactionTypeGet
from mysql.connector import Error
import database_connect
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

# Route pour obtenir tous les types de réactions
# ..localhost:3310/reactiontypes
@router.get("/", response_model=List[ReactionTypeGet]) 
def get_reactiontypes():
    connection = database_connect.get_db_connection()
    cursor = connection.cursor(dictionary=True)

    try:
        cursor.execute("SELECT id, name, rate, picture FROM reactiontype")
        reactiontypes = cursor.fetchall()

        if reactiontypes:
            return reactiontypes
        return {"message": "Aucun type de réaction trouvé."}
    except Error as e:
        print(f"L'erreur suivante est survenue : '{e}'")
        return {"error": "Une erreur s'est produite lors de la récupération des types de réactions."}
    finally:
        cursor.close()
        connection.close()

# Route pour supprimer reactiontype

@router.delete("/{reactiontype_id}")
async def delete_reaction(reactiontype_id: int):
    connection = database_connect.get_db_connection()
    cursor = connection.cursor()
    try:
        cursor.execute("DELETE FROM reactiontype WHERE id = %s", (reactiontype_id,))
        connection.commit()
        
        if cursor.rowcount > 0:
            return {"message": "Réaction supprimée avec succès"}
        else:
            return {"message": "Aucune réaction trouvée à supprimer."}
    except Error as e:
        print(f"L'erreur suivante est survenue : '{e}'")
        return {"error": "Une erreur s'est produite lors de la suppression de la réaction."}
    finally:
        cursor.close()
        connection.close()
        



class ReactionUpdate(BaseModel):
    rate: int = None  
    picture_url: str = None  

@router.patch("/{reactiontype_id}")
async def update_reactiontype(reactiontype_id: int, reactiontype_data: ReactionUpdate):
    connection = database_connect.get_db_connection()
    cursor = connection.cursor(dictionary=True)
    
    try:
        # Préparer les champs à mettre à jour
        fields_to_update = []
        values = []

        if reactiontype_data.rate is not None:
            fields_to_update.append("rate = %s")
            values.append(reactiontype_data.rate)

        if reactiontype_data.picture_url is not None:
            fields_to_update.append("picture = %s")
            values.append(reactiontype_data.picture_url)

        if not fields_to_update:
            raise HTTPException(status_code=400, detail="Aucun champ valide à mettre à jour.")

        update_query = f"""
            UPDATE reactiontype
            SET {', '.join(fields_to_update)}
            WHERE id = %s
        """
        values.append(reactiontype_id)

        cursor.execute(update_query, tuple(values))
        connection.commit()

        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Réaction non trouvée.")

        return {"message": "Réaction mise à jour avec succès."}

    except Error as e:
        print(f"L'erreur suivante est survenue : {e}")
        raise HTTPException(status_code=500, detail="Erreur lors de la mise à jour des réactions.")
    
    finally:
        cursor.close()
        connection.close()