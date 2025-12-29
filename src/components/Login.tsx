import Logo from "../assets/slt.svg";
import {FaUserAlt} from "react-icons/fa";
import {RiLockPasswordFill, RiEyeLine, RiEyeOffLine} from "react-icons/ri";
import {AiOutlineLoading3Quarters} from "react-icons/ai";
import {fetchLogin, importSessionFromWebsite, LoginError} from "../data/fetch.ts";
import {useState} from "react";
import {FiExternalLink} from "react-icons/fi";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isImporting, setIsImporting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const handleUsernameChange = (event: any) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value);
    }

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && !isLoading) {
            handleSignIn();
        }
    }

    const handleSignIn = async () => {
        setError(null);
        setIsLoading(true);
        try {
            await fetchLogin(username, password);
        } catch (e) {
            if (e instanceof LoginError) {
                setError(e.message);
            } else {
                setError('Something went wrong. Please try again');
            }
        } finally {
            setIsLoading(false);
        }
    }

    const handleImportSession = async () => {
        setError(null);
        setIsImporting(true);
        try {
            await importSessionFromWebsite();
        } catch (e) {
            if (e instanceof LoginError) {
                setError(e.message);
            } else {
                setError('Failed to import session. Please try again');
            }
        } finally {
            setIsImporting(false);
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
                               placeholder="Username" value={username} onChange={handleUsernameChange} onKeyDown={handleKeyDown}/>
                    </div>

                    <div className="relative my-2">
                        <div className="pointer-events-none absolute inset-y-0 flex items-center start-0 ps-3.5">
                            <RiLockPasswordFill className="h-5 w-5 text-gray-400 opacity-20" aria-hidden="true"/>
                        </div>
                        <input type={showPassword ? "text" : "password"} id="password"
                               className="block h-12 w-full rounded-lg border-none border-gray-300 text-sm font-medium text-white placeholder-opacity-20 bg-secondary ps-10 pe-10 p-2.5 font-roboto focus:border-green-500 focus:ring-gray-500"
                               placeholder="Password" value={password} onChange={handlePasswordChange} onKeyDown={handleKeyDown}/>
                        <button
                            type="button"
                            className="absolute inset-y-0 end-0 flex items-center pe-3.5"
                            onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? (
                                <RiEyeOffLine className="h-5 w-5 text-gray-400 opacity-50 hover:opacity-100 transition-opacity"/>
                            ) : (
                                <RiEyeLine className="h-5 w-5 text-gray-400 opacity-50 hover:opacity-100 transition-opacity"/>
                            )}
                        </button>
                    </div>

                    <button
                        className={`mx-auto flex items-center justify-center gap-2 rounded-full px-4 py-2 font-bold text-white font-roboto w-[40%] bg-primary_purple transition-all duration-200 ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary_blue'}`}
                        onClick={handleSignIn}
                        disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <AiOutlineLoading3Quarters className="animate-spin" />
                                Signing in...
                            </>
                        ) : (
                            'Sign In'
                        )}
                    </button>

                    {error && (
                        <div className="mx-auto mt-3 text-center text-sm text-red-400 font-roboto">
                            {error}
                        </div>
                    )}

                    <div className="flex items-center my-4">
                        <div className="flex-1 border-t border-gray-600"></div>
                        <span className="px-3 text-sm text-gray-400 font-roboto">OR</span>
                        <div className="flex-1 border-t border-gray-600"></div>
                    </div>

                    <button
                        className={`mx-auto flex items-center justify-center gap-2 rounded-full px-4 py-2 font-bold text-white font-roboto w-[70%] border border-primary_blue bg-transparent transition-all duration-200 ${isImporting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary_blue hover:bg-opacity-20'}`}
                        onClick={handleImportSession}
                        disabled={isImporting || isLoading}>
                        {isImporting ? (
                            <>
                                <AiOutlineLoading3Quarters className="animate-spin" />
                                Importing...
                            </>
                        ) : (
                            <>
                                <FiExternalLink />
                                Login with MySLT Session
                            </>
                        )}
                    </button>

                </div>
            </div>

        </>
    );
}

export default Login;