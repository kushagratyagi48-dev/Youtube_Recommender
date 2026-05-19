import {

    useEffect,
    useState

} from "react";

import VideoList
from "../VideoList";

function FavoritesPage() {

    const [favorites, setFavorites] =
        useState([]);

    useEffect(() => {

        loadFavorites();

    }, []);

    async function loadFavorites() {

        let response = await fetch(

            "http://localhost:5000/videos/favorites",

            {

                headers: {

                    Authorization:
                        localStorage.getItem(
                            "token"
                        )

                }

            }

        );

        let data =
            await response.json();

        setFavorites(data);

    }

    async function removeVideo(videoId) {

        await fetch(

            "http://localhost:5000/videos/favorites/"
            + videoId,

            {

                method: "DELETE",

                headers: {

                    Authorization:
                        localStorage.getItem(
                            "token"
                        )

                }

            }

        );

        loadFavorites();

    }

    return (

        <div>

            <h1 className="section-title">

                Favorites

            </h1>

            {

                favorites.length > 0

                ?

                <VideoList
                    videos={favorites}
                    removeVideo={removeVideo}
                    isFavorite={true}
                />

                :

                <p className="empty-message">

                    No favorites saved yet

                </p>

            }

        </div>

    );

}

export default FavoritesPage;