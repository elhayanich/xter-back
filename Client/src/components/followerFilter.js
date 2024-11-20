import { useState, React } from "react";


const FollowFilter = () => {
    const [filter, setFilter] = useState(false)

    // Bouton filtre
    const handleClick = async () => {
        setFilter(prevFilter => !prevFilter);
    }


    return (
        <div>
            {/*Filtre follow - test*/}
            <button
                 onClick={() => handleClick()}
                 className={`mt-2 px-4 py-2 bg-pink-500 text-white rounded-lg`}>
                {filter ? "Annuler" : "Filtrer"}
            </button>
        </div>
    )
}

export default FollowFilter;