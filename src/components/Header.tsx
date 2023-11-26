import Logo from "../assets/SLT.svg";

const Header = () => {

    return (
        <div className="flex flex-col justify-center">
            <div className="flex flex-row">
                <div className="mx-auto text-lg text-white font-roboto ">

                    <img src={Logo} alt="SLT Logo" className="mx-auto"/>
                </div>
                <button className="absolute right-20 opacity-50 hover:opacity-100 hover:scale-105 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                        <path d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"
                              fill="white"/>
                    </svg>
                </button>
                <div className="absolute right-8 opacity-50 hover:opacity-100 hover:scale-105 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                        <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"
                              fill="white"/>
                    </svg>
                </div>


            </div>
            <div className="text-center font-bold text-lg text-white font-roboto ">
                SLT Usage Meter Pro
            </div>
        </div>
    )
}

export default Header;