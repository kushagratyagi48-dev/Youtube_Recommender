import {

    Link,
    useLocation

} from "react-router-dom";

function Sidebar() {

    const location =
        useLocation();

    return (

        <div className="sidebar">

            <h2>
                YouTube AI
            </h2>

            <Link
                to="/"
                className="sidebar-link"
            >

                <div className={

                    location.pathname === "/"

                    ?

                    "sidebar-item active"

                    :

                    "sidebar-item"

                }>

                    🏠 Home

                </div>

            </Link>

            <Link
                to="/favorites"
                className="sidebar-link"
            >

                <div className={

                    location.pathname === "/favorites"

                    ?

                    "sidebar-item active"

                    :

                    "sidebar-item"

                }>

                    ❤️ Favorites

                </div>

            </Link>

            <Link
                to="/history"
                className="sidebar-link"
            >

                <div className={

                    location.pathname === "/history"

                    ?

                    "sidebar-item active"

                    :

                    "sidebar-item"

                }>

                    🕘 History

                </div>

            </Link>

            <Link
                to="/profile"
                className="sidebar-link"
            >

                <div className={

                    location.pathname === "/profile"

                    ?

                    "sidebar-item active"

                    :

                    "sidebar-item"

                }>

                    👤 Profile

                </div>

            </Link>

        </div>

    );

}

export default Sidebar;