import Logo from "../assets/SLT.svg";
import {Logout} from "../data/logout.ts";
import {Tooltip} from "flowbite-react";
import {FiLogOut} from "react-icons/fi";
import {CgNotes} from "react-icons/cg";
import {FaChartLine} from "react-icons/fa6";

const Header = ({onToggleButtonClick, currentIcon} : any) => {



    return (
        <div className="flex flex-col justify-center">
            <div className="flex flex-row">
                <div className="mx-auto text-lg text-white font-roboto ">

                    <img src={Logo} alt="SLT Logo" className="mx-auto"/>
                </div>
                <Tooltip content="View Today Usage Log">
                    <button
                        className="absolute right-20 opacity-40 hover:opacity-100 hover:scale-105 transition-all duration-300"
                        onClick={onToggleButtonClick}>
                        {currentIcon}
                        {/*todo change icon*/}
                    </button>
                </Tooltip>
                <Tooltip content="Click to Logout">
                    <button id="logOut"
                            className="absolute right-8 opacity-40 hover:opacity-100 hover:scale-105 transition-all duration-300"
                            onClick={Logout}>
                        <FiLogOut  className="h-6 w-6  text-white" aria-hidden="true"/>
                    </button>
                </Tooltip>


            </div>
            <div className="text-center font-bold text-lg text-white font-roboto ">
                SLT Usage Meter Pro
            </div>
        </div>
    )
}

export default Header;