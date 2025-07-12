import React from 'react';
import capa from "../assets/letters/capa.png"
import n from "../assets/letters/n.png";
const HeroText = () => {
    return (
        <section className="fixed inset-0 flex items-center justify-center z-10 pointer-events-none px-8 py-8">
            <div className="text-5xl text-gray-400 font-bold -translate-y-25 font-poppins">
                Hi, I'm
            </div>
            <div>
                <div className='flex items-center'>
                    <img
                        src={capa}
                        alt="Capa"
                        className="w-70 h-70 transition-transform duration-200 hover:scale-110"
                    />
                    <img
                        src={n}
                        alt="N"
                        className="w-30 -25 mt-6 transition-transform duration-200 hover:scale-2000"
                    />
                </div>
            </div>
        </section>
    );
};

export default HeroText;