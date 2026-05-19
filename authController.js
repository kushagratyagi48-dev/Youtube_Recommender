const User =
    require("../models/User");

const bcrypt =
    require("bcryptjs");

const jwt =
    require("jsonwebtoken");

async function signup(req, res) {

    try {

        const {

            username,
            email,
            password

        } = req.body;

        const existingUser =
            await User.findOne({
                email
            });

        if (existingUser) {

            return res.status(400).json({

                message:
                    "User already exists"

            });
        }

        const hashedPassword =
            await bcrypt.hash(
                password,
                10
            );

        const user =
            await User.create({

                username,

                email,

                password:
                    hashedPassword

            });

        const token =
            jwt.sign(

                {
                    userId: user._id
                },

                "secretkey"

            );

        res.json({

            token,

            user

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message:
                "Signup failed"

        });

    }
}

async function login(req, res) {

    try {

        const {

            email,
            password

        } = req.body;

        const user =
            await User.findOne({
                email
            });

        if (!user) {

            return res.status(400).json({

                message:
                    "User not found"

            });
        }

        const isMatch =
            await bcrypt.compare(

                password,

                user.password

            );

        if (!isMatch) {

            return res.status(400).json({

                message:
                    "Invalid password"

            });
        }

        const token =
            jwt.sign(

                {
                    userId: user._id
                },

                "secretkey"

            );

        res.json({

            token,

            user

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message:
                "Login failed"

        });

    }
}
async function getProfile(req, res) {

    try {

        const user =
            await User.findById(
                req.userId
            ).select("-password");

        res.json(user);

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message:
                "Error fetching profile"

        });

    }

}

module.exports = {

    signup,
    login,
    getProfile

};
