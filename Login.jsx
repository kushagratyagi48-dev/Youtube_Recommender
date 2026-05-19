import {

  useNavigate,
  Link

} from "react-router-dom";

import { useState } from "react";

function Login() {

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const navigate =
        useNavigate();

    async function handleLogin() {

        let response = await fetch(

            "http://localhost:5000/auth/login",

            {

                method: "POST",

                headers: {

                    "Content-Type":
                        "application/json"

                },

                body: JSON.stringify({

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

            <h1>Login</h1>

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
                onClick={handleLogin}
            >

                Login

            </button>

            <p>

  Don't have an account?

  <Link to="/signup">

    Signup

  </Link>

</p>

            </div>

</div>

    );
}

export default Login;