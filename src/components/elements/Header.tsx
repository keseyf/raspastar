import { FaGift } from "react-icons/fa";
import { GiAlliedStar } from "react-icons/gi";
const nameApp1 = import.meta.env.VITE_NAME_APP1
const nameApp2 = import.meta.env.VITE_NAME_APP2

if(!nameApp1 || !nameApp2){
    throw new Error("Nome da aplicação deve ser definido.")
}

interface HeaderProps {
    balance: number;
}

export default function Header({ balance }: HeaderProps) {
    return (
        <header className="w-full sticky z-1000 top-0 px-5 py-3 border border-neutral-600/50 bg-neutral-950/70 backdrop-blur-lg">
            <nav className="flex w-full justify-between items-center">
                <a
                    href="/"
                    className="font-bold text-lg justify-center flex hover:scale-90 duration-200 items-center space-x-3"
                >
                    <GiAlliedStar size={25} />
                    {nameApp1}
                    <span className="text-accent-600">{nameApp2}</span>
                </a>

                <ul className="space-x-7 text-sm hidden md:flex">
                    <li>
                        <a className="hover:text-accent-600 duration-300" href="/">Inicio</a>
                    </li>
                    <li>
                        <a className="hover:text-accent-600 duration-300" href="#cartelas">Cartelas</a>
                    </li>
                    <li>
                        <a className="hover:text-accent-600 duration-300" href="/perfil">Perfil</a>
                    </li>
                </ul>

                <ul className="flex space-x-5">
                    <li>
                        <a
                            href="/saque"
                            className="flex items-center justify-between gap-3 text-xs bg-accent-600 hover:bg-accent-700 duration-300 cursor-pointer py-2 px-4 text-white rounded"
                        >
                            Ganhar <FaGift />
                        </a>
                    </li>
                    <li>
                        <p className="flex items-center justify-between gap-5 text-xs border border-accent-600 hover:border-accent-700 duration-300 cursor-pointer p-2 text-white rounded">
                            BRL {balance.toFixed(2)}
                        </p>
                    </li>
                    
                </ul>
            </nav>
        </header>
    );
}
