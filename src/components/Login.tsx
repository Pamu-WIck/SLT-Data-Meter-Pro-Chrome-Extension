import Logo from "../assets/slt.svg";
import {FaUserAlt} from "react-icons/fa";
import {RiLockPasswordFill} from "react-icons/ri";
import {fetchLogin} from "../data/fetch.ts";
import {useState} from "react";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsernameChange = (event: any) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value);
    }

    const handleSignIn = async () => {
        try {
            console.log("Clicked");
            const data = await fetchLogin(username, password);
            console.log(data);
        } catch (e) {
            console.error("Error fetching usage summary:", e);
        }
    }
    return (
        <>

            <div className="mx-auto flex flex-col rounded-md bg-opacity-30 p-4 drop-shadow-xl bg-background w-[90%]">
                <div>
                    <img src={Logo} alt="SLT Logo" className="mx-auto"/>
                </div>
                <div className="mx-auto p-5 text-lg font-bold text-white opacity-80 font-roboto">SLT Usage Meter Pro
                </div>
                <div className="font-semibold text-white text-opacity-50 font-roboto">Sign in to your account</div>
                <div className="flex flex-col">
                    <div className="relative my-2 py-2">
                        <div className="pointer-events-none absolute inset-y-0 flex items-center start-0 ps-3.5">
                            <FaUserAlt className="h-5 w-5 text-gray-400 opacity-20" aria-hidden="true"/>
                        </div>
                        <input type="text" id="username"
                               className="block h-12 w-full rounded-lg border-none border-gray-300 text-sm font-medium text-white placeholder-opacity-20 bg-secondary ps-10 p-2.5 font-roboto focus:border-green-500 focus:ring-gray-500"
                               placeholder="Username" value={username} onChange={handleUsernameChange}/>
                    </div>

                    <div className="relative my-2">
                        <div className="pointer-events-none absolute inset-y-0 flex items-center start-0 ps-3.5">
                            <RiLockPasswordFill className="h-5 w-5 text-gray-400 opacity-20" aria-hidden="true"/>
                        </div>
                        <input type="password" id="password"
                               className="block h-12 w-full rounded-lg border-none border-gray-300 text-sm font-medium text-white placeholder-opacity-20 bg-secondary ps-10 p-2.5 font-roboto focus:border-green-500 focus:ring-gray-500"
                               placeholder="Password" value={password} onChange={handlePasswordChange}/>
                    </div>

                    <button
                        className="mx-auto rounded-full px-4 py-2 font-bold text-white font-roboto w-[30%] bg-primary_purple hover:bg-primary_blue" onClick={handleSignIn}>
                        Sign In
                    </button>

                    <div className="mx-auto pt-3 text-center font-semibold text-white text-opacity-50 font-roboto ">Sign
                        with MY SLT
                    </div>

                </div>
            </div>

        </>
    );
}

export default Login;