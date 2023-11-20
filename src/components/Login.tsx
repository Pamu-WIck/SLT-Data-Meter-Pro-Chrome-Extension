import Logo from "../assets/slt.svg";
import {FaUserAlt} from "react-icons/fa";
import {RiLockPasswordFill} from "react-icons/ri";

const Login = () => {
  return (
    <>


            <div className=" flex flex-col p-4 bg-background drop-shadow-xl bg-secondary bg-opacity-30 w-[90%] mx-auto rounded-md">
                <div>
                    <img src={Logo} alt="SLT Logo" className="mx-auto"/>
                </div>
                <div className="text-white font-roboto mx-auto p-5 text-lg opacity-80 font-bold">SLT Usage Meter Pro</div>
                <div className="text-white text-opacity-50 font-roboto font-semibold">Sign in to your account</div>
                <div className="flex flex-col">
                    <div className="relative my-2 py-2">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <FaUserAlt className="w-5 h-5 text-gray-400 opacity-20 " aria-hidden="true"/>
                        </div>
                        <input type="text" id="input-group-1" className="text-white placeholder-opacity-20 h-12 bg-secondary border-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-green-500 block w-full ps-10 p-2.5  font-roboto font-bold " placeholder="Username"/>
                    </div>

                    <div className="relative my-2 ">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <RiLockPasswordFill className="w-5 h-5 text-gray-400 opacity-20" aria-hidden="true"/>
                        </div>
                        <input type="password" id="input-group-1" className="text-white mb-2 h-12 bg-secondary border-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-green-500 block w-full ps-10 p-2.5 placeholder-opacity-20 font-roboto font-bold " placeholder="Username"/>
                    </div>

                    <button className="font-roboto w-[30%] mx-auto bg-primary_purple hover:bg-primary_blue text-white font-bold py-2 px-4 rounded-full">
                        Sign In
                    </button>

                    <div className="pt-3 text-white text-opacity-50 font-roboto font-semibold mx-auto text-center text-primary_blue">Sign with MY SLT</div>

                </div>
            </div>

    </>
  );
}

export default Login;