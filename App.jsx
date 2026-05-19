import FavoritesPage
from "./pages/FavoritesPage";

import HistoryPage
from "./pages/HistoryPage";

import ProfilePage
from "./pages/ProfilePage";
import Sidebar
from "./components/Sidebar";
import ProtectedRoute
from "./components/ProtectedRoute";
import {

  Routes,
  Route,
  Navigate

} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VideoList from "./VideoList";
import SearchBar from "./SearchBar";

import { useState, useEffect } from "react";

function App() {

  const [search, setSearch] =
    useState("");

  const [videos, setVideos] =
    useState([]);

  const [favorites, setFavorites] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [
    recommendedVideos,
    setRecommendedVideos
  ] = useState([]);

  const [history, setHistory] =
  useState([]);

  useEffect(() => {

    loadHistory();
    function logout() {

  localStorage.removeItem(
    "token"
  );

  window.location.reload();
}
    const token =
      localStorage.getItem("token");

    if (token) {

      loadFavorites();

      loadRecommendations();

    }

  }, []);

  async function searchVideos() {

    let response = await fetch(

      "http://localhost:5000/videos?search="
      + search,

      {

        headers: {

          Authorization:
            localStorage.getItem("token")

        }

      }

    );

    let data =
      await response.json();

    console.log(data);

    setVideos(data);

    loadRecommendations();
  }
async function loadHistory() {

  let response = await fetch(

    "http://localhost:5000/videos/history",

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

  setHistory(data);

}
  async function loadFavorites() {

    let response = await fetch(

      "http://localhost:5000/videos/favorites",

      {

        headers: {

          Authorization:
            localStorage.getItem("token")

        }

      }

    );

    let data =
      await response.json();

    setFavorites(data);
  }

  async function loadRecommendations() {

    let response = await fetch(

      "http://localhost:5000/videos/recommendations",

      {

        headers: {

          Authorization:
            localStorage.getItem("token")

        }

      }

    );

    let data =
      await response.json();

    setRecommendedVideos(data);
  }

  async function saveVideo(video) {

    let favoriteData = {

      videoId:
        video.videoId,

      title:
        video.title,

      thumbnail:
        video.thumbnail

    };

    let response = await fetch(

      "http://localhost:5000/videos/favorites",

      {

        method: "POST",

        headers: {

          "Content-Type":
            "application/json",

          Authorization:
            localStorage.getItem("token")

        },

        body: JSON.stringify(
          favoriteData
        )

      }

    );

    let data =
      await response.json();

    console.log(data);

    loadFavorites();
  }

  async function removeVideo(videoId) {

    await fetch(

      "http://localhost:5000/videos/favorites/"
      + videoId,

      {

        method: "DELETE",

        headers: {

          Authorization:
            localStorage.getItem("token")

        }

      }

    );

    loadFavorites();
  }


  const token =
  localStorage.getItem(
    "token"
  );


  function logout() {

  localStorage.removeItem(
    "token"
  );

  window.location.href =
    "/login";

}
  
return (

  <Routes>

    <Route

      path="/signup"

      element={

        token

        ?

        <Navigate to="/" />

        :

        <Signup />

      }

    />

    <Route

      path="/login"

      element={

        token

        ?

        <Navigate to="/" />

        :

        <Login />

      }

    />
    <Route

  path="/profile"

  element={

    <ProtectedRoute>

      <div className="layout">

        <Sidebar />

        <div className="main-content">

          <ProfilePage />

        </div>

      </div>

    </ProtectedRoute>

  }

/>
    
    <Route

  path="/history"

  element={

    <ProtectedRoute>

      <div className="layout">

        <Sidebar />

        <div className="main-content">

          <HistoryPage />

        </div>

      </div>

    </ProtectedRoute>

  }

/>

    <Route

  path="/favorites"

  element={

    <ProtectedRoute>

      <div className="layout">

        <Sidebar />

        <div className="main-content">

          <FavoritesPage />

        </div>

      </div>

    </ProtectedRoute>

  }

/>

    <Route

      path="/"

      

      element={

        <ProtectedRoute>

          <div className="layout">

            <Sidebar />

            <div className="main-content">

              <div className="top-bar">

                <h1>
                  YouTube Recommender
                </h1>

                <button
                  onClick={logout}
                >

                  Logout

                </button>

              </div>

              <SearchBar
  search={search}
  setSearch={setSearch}
  searchVideos={searchVideos}
  history={history}
/>

              {

                loading &&

                <div className="skeleton-grid">

                  {[1,2,3,4,5,6].map((item) => (

                    <div
                      key={item}
                      className="skeleton-card"
                    >

                      <div className="skeleton-image"></div>

                      <div className="skeleton-text"></div>

                      <div className="skeleton-text short"></div>

                    </div>

                  ))}

                </div>

              }

              {error &&
                <p>{error}</p>
              }

              <p>{search}</p>

              {

                videos.length > 0

                ?

                <VideoList
                  videos={videos}
                  saveVideo={saveVideo}
                  isFavorite={false}
                />

                :

                <p className="empty-message">

                  Search for videos to begin

                </p>

              }

              <h1 className="section-title">
                Recommended For You
              </h1>

              {

                recommendedVideos.length > 0

                ?

                <VideoList
                  videos={recommendedVideos}
                  saveVideo={saveVideo}
                  isFavorite={false}
                />

                :

                <p className="empty-message">

                  Recommendations will appear here

                </p>

              }

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

          </div>

        </ProtectedRoute>

      }

    />

  </Routes>

  
); 

}

export default App;