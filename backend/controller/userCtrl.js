const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userAuthModel");

const userCtrl = {
    register: async (req, res) => {
        try {
            const { userName, password } = req.body;
            const user_name = await User.findOne({ userName });
            if (user_name) {
                return res
                    .status(400)
                    .json({ msg: "This username is already taken" });
            }
            const passHash = await bcrypt.hash(password, 12);
            const newUser = new User({
                userName,
                password: passHash,
            });
            const access_token = createAccessToken({ id: newUser._id });
            const refresh_token = createRefreshToken({ id: newUser._id });

            res.cookie("refreshtoken", refresh_token, {
                httpOnly: true,
                path: "/api/refresh_token",
                maxAge: 30 * 7 * 24 * 60 * 60 * 1000,
            });

            await newUser.save();

            res.json({
                msg: "Registered Successfully",
                access_token,
                user: newUser.userName,
            });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    login: async (req, res) => {
        try {
            const { userName, password } = req.body;

            const user = await User.findOne({ userName });
            if (!user) {
                return res
                    .status(400)
                    .json({ msg: "This user does not exist" });
            }
            const isMatched = await bcrypt.compare(password, user.password);
            if (!isMatched) {
                return res.status(400).json({ msg: "Incorrect password" });
            }
            const access_token = createAccessToken({ id: user._id });
            const refresh_token = createRefreshToken({ id: user._id });

            res.cookie("refreshtoken", refresh_token, {
                httpOnly: true,
                path: "/api/refresh_token",
                maxAge: 30 * 7 * 24 * 60 * 60 * 1000,
            });

            res.json({
                msg: "Sucessfully logged in",
                access_token,
                user: user.userName,
            });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie("refreshtoken", { path: "/api/refresh_token" });
            return res.json({ msg: "Logged out" });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    generateAccessToken: async (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken;
            if (!rf_token) {
                return res.status(500).json({ msg: "Please login" });
            }

            jwt.verify(
                rf_token,
                process.env.REFRESH_KEY,
                async (err, result) => {
                    if (err)
                        return res.status(400).json({ msg: "Please log in" });
                    const user = await User.findById(result.id).select(
                        "-password"
                    );

                    if (!user)
                        return res
                            .status(400)
                            .json({ msg: "This user does not exist" });

                    const access_token = createAccessToken({ id: result.id });

                    res.json({
                        access_token,
                        user: {
                            ...user._doc,
                            password: "",
                        },
                    });
                }
            );
        } catch (error) {}
    },
};

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_KEY);
};

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_KEY);
};

module.exports = userCtrl;
