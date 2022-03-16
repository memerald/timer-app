import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../redux/actions/userAction";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleRegister = (data) => {
        dispatch(registerUser(data));
        navigate("/");
    };

    return (
        <div className="register">
            <Navbar />
            <div className="register-wrapper">
                <form onSubmit={handleSubmit(handleRegister)}>
                    <div className="register-container">
                        <h1>Register</h1>
                        <input
                            type="text"
                            {...register("userName", {
                                required: "Please enter your username",
                                minLength: {
                                    value: 3,
                                    message: "Min length is 3",
                                },
                                pattern: {
                                    value: /\w{3}/,
                                    message: "Please enter alphabets only",
                                },
                            })}
                            placeholder="Username"
                            autoComplete="off"
                        />
                        <p>{errors.userName?.message}</p>
                        <input
                            type="password"
                            {...register("password", {
                                required: "Please enter your password",
                                pattern: {
                                    value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,14}$/,
                                    message: "Invalid password",
                                },
                            })}
                            placeholder="Password"
                            autoComplete="off"
                        />
                        <p>{errors.password?.message}</p>

                        <input type="submit" value="Register" />
                        <p className="pass-text">
                            Your password should contain an uppercase letter,
                            lowercase letter, a number, a special character and
                            should be between 8-14 characters
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
