import Logo from "../assets/slt.svg";
import { fetchLogin } from "../data/fetch.ts";
import React, { useState, useEffect } from "react";
import { Spinner } from "flowbite-react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Load username and password from localStorage if rememberMe was checked before
    useEffect(() => {
        const savedUsername = localStorage.getItem("username");
        const savedPassword = localStorage.getItem("password");
        if (savedUsername && savedPassword) {
            setUsername(savedUsername);
            setPassword(savedPassword);
        }
    }, []);

    const handleUsernameChange = (event: InputChangeEvent) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: InputChangeEvent) => {
        setPassword(event.target.value);
    };

    const handleRememberMeChange = (event: InputChangeEvent) => {
        setRememberMe(event.target.checked);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSignIn = async () => {
        setLoading(true);

        try {
            console.log("Clicked");
            const data = await fetchLogin(username, password);

            // Save credentials to localStorage if Remember Me is checked
            if (rememberMe) {
                localStorage.setItem("username", username);
                localStorage.setItem("password", password);
            } else {
                // Clear saved credentials if Remember Me is unchecked
                localStorage.removeItem("username");
                localStorage.removeItem("password");
            }

            console.log(data);
        } catch (e) {
            console.error("Error fetching login data:", e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="mx-auto flex flex-col rounded-md bg-opacity-30 p-6 shadow-xl bg-background w-full max-w-sm">
                <img src={Logo} alt="SLT Logo" className="mx-auto h-12 w-auto mb-4" />
                <div className="mb-6 text-center">
                    <h1 className="text-xl font-bold text-white opacity-90 font-roboto">
                        SLT Usage Meter Pro
                    </h1>
                    <p className="text-sm text-white text-opacity-60 font-roboto">Sign in to your account</p>
                </div>
                <div className="flex flex-col space-y-4">
                    <div>
                        <input
                            type="text"
                            id="username"
                            className="block h-11 w-full rounded-md border-none bg-secondary px-4 py-2.5 text-sm font-medium text-white placeholder-white placeholder-opacity-40 focus:ring-2 focus:ring-primary_purple focus:ring-opacity-50 font-roboto"
                            placeholder="Username"
                            value={username}
                            onChange={handleUsernameChange}
                        />
                    </div>

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            className="block h-11 w-full rounded-md border-none bg-secondary px-4 py-2.5 text-sm font-medium text-white placeholder-white placeholder-opacity-40 focus:ring-2 focus:ring-primary_purple focus:ring-opacity-50 font-roboto"
                            placeholder="Password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center px-3 text-white text-opacity-60 hover:text-opacity-100"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? (
                                <FaEyeSlash className="h-4 w-4" />
                            ) : (
                                <FaEye className="h-4 w-4" />
                            )}
                        </button>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="rememberMe"
                                checked={rememberMe}
                                onChange={handleRememberMeChange}
                                className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-primary_purple focus:ring-primary_purple focus:ring-offset-background"
                            />
                            <label htmlFor="rememberMe" className="ml-2 text-xs text-white text-opacity-70 font-roboto">
                                Remember me
                            </label>
                        </div>
                    </div>

                    <button
                        className="w-full rounded-md bg-primary_purple px-4 py-2.5 font-semibold text-white hover:bg-primary_blue focus:outline-none focus:ring-2 focus:ring-primary_blue focus:ring-opacity-50 transition duration-150 ease-in-out"
                        onClick={handleSignIn}
                        disabled={loading}
                    >
                        {loading && <Spinner color="info" size="sm" className="mr-2 inline" />}
                        Sign In
                    </button>

                    <div className="relative my-4 flex items-center">
                        <div className="flex-grow border-t border-gray-600 border-opacity-50"></div>
                        <span className="mx-4 flex-shrink text-xs text-white text-opacity-50 font-roboto">OR</span>
                        <div className="flex-grow border-t border-gray-600 border-opacity-50"></div>
                    </div>

                    <button
                        className="w-full rounded-md border border-primary_blue bg-transparent px-4 py-2.5 font-semibold text-primary_blue hover:bg-primary_blue hover:text-white focus:outline-none focus:ring-2 focus:ring-primary_blue focus:ring-opacity-50 transition duration-150 ease-in-out"
                        // onClick={handleSignInWithMySLT} // Logic to be added later by user
                    >
                        Login with My SLT
                    </button>
                </div>
            </div>
        </>
    );
};

export default Login;
