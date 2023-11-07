import MeterWidget from "./MeterWidget.tsx";
const ProgressBar = () => {

    return (
        <>
            <div className="flex flex-col justify-center gap-y-4">
                <div className="flex flex-col justify-center">
                    <div className="flex flex-row">
                        <div className="mx-auto text-lg text-white font-roboto ">

                            <svg width="25" height="32" viewBox="0 0 249 310" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M14.4468 263.297C33.2262 230.773 52.0073 198.25 70.7839 165.724C74.7727 158.814 78.6738 151.853 82.7436 144.991C88.0702 136.01 97.8382 133.165 106.259 138.008C114.593 142.8 117.262 152.923 112.158 161.823C85.6127 208.106 58.9657 254.33 32.3663 300.581C28.2467 307.745 22.0397 310.596 13.2642 309.441C6.28074 307.336 2.60091 302.934 0.607354 296.45C-1.08274 289.506 2.84217 284.497 5.45205 278.881C8.6431 273.57 11.545 268.434 14.4468 263.297Z"
                                    fill="#0257A5"/>
                                <path
                                    d="M154.947 250.895C175.107 215.818 195.131 181.086 215.067 146.303C218.117 140.982 221.943 136.863 228.298 136.007C235.137 135.085 240.869 137.261 244.843 142.999C248.913 148.877 249.117 155.173 245.598 161.376C238.211 174.399 230.682 187.341 223.216 200.318C204.137 233.483 185.068 266.654 165.976 299.811C160.439 309.429 150.571 312.581 141.912 307.568C133.333 302.601 131.126 292.422 136.617 282.803C142.638 272.257 148.724 261.748 154.947 250.895Z"
                                    fill="#4FB94A"/>
                                <path
                                    d="M47.7129 138.757C42.5403 147.72 37.6288 156.413 32.5672 165.016C27.0492 174.396 17.4488 177.292 8.76764 172.345C0.30171 167.522 -2.15689 157.298 3.15614 148.049C29.5916 102.025 56.0653 56.0242 82.5792 10.0462C87.9331 0.762131 97.8829 -2.125 106.438 2.88226C114.677 7.70483 117.224 17.7668 112.063 26.7881C90.7469 64.0473 69.304 101.234 47.7129 138.757Z"
                                    fill="#1DB5E9"/>
                                <path
                                    d="M144.066 169.864C154.629 170.499 161.589 177.571 161.436 187.06C161.289 196.115 153.973 203.55 144.932 203.83C135.958 204.108 128.282 197.056 127.617 187.923C126.93 178.47 133.623 170.928 144.066 169.864Z"
                                    fill="#50B94A"/>
                            </svg>
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
                <MeterWidget percentage={"40%"} />
                <MeterWidget percentage={"80%"}/>
                <MeterWidget percentage={"40%"}/>
                <MeterWidget percentage={"10%"}/>
            </div>
        </>
    );
};

export default ProgressBar;
