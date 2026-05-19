import {

    useEffect,
    useState

} from "react";

function ProfilePage() {

    const [user, setUser] =
        useState(null);

    useEffect(() => {

        loadProfile();

    }, []);

    async function loadProfile() {

        let response = await fetch(

            "http://localhost:5000/auth/profile",

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

        setUser(data);

    }

    if (!user) {

        return <p>Loading...</p>;

    }

    return (

        <div className="profile-card">

            <h1>
                Profile
            </h1>

            <p>

                <strong>
                    Username:
                </strong>

                {" "}
                {user.username}

            </p>

            <p>

                <strong>
                    Email:
                </strong>

                {" "}
                {user.email}

            </p>

        </div>

    );

}

export default ProfilePage;