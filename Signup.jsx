import {

  useNavigate,
  Link

} from "react-router-dom";

import { useState } from "react";

function Signup() {

    const [username, setUsername] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const navigate =
        useNavigate();

    async function handleSignup() {

        let response = await fetch(

            "http://localhost:5000/auth/signup",

            {

                method: "POST",

                headers: {

                    "Content-Type":
                        "application/json"

                },

                body: JSON.stringify({

                    username,
                    email,
                    password

                })

            }

        );

        let data =
            await response.json();

        console.log(data);

        localStorage.setItem(

            "token",

            data.token

        );

        navigate("/");
    }

    return (

        <div className="auth-container">

    <div className="auth-box">

            <h1>Signup</h1>

            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) =>
                    setUsername(
                        e.target.value
                    )
                }
            />

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) =>
                    setEmail(
                        e.target.value
                    )
                }
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                    setPassword(
                        e.target.value
                    )
                }
            />

            <button
                onClick={handleSignup}
            >

                Signup

            </button>

            <p>

  Already have an account?

  <Link to="/login">

    Login

  </Link>

</p>
            </div>

</div>
    );
}

export default Signup;