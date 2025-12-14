import { GiAlliedStar } from "react-icons/gi";
const nameApp1 = import.meta.env.VITE_NAME_APP1
const nameApp2 = import.meta.env.VITE_NAME_APP2

if(!nameApp1 || !nameApp2){
    throw new Error("Nome da aplicação deve ser definido.")
}

type Props = {
  onRegisterClick: () => void;
  onLoginClick: ()=> void;
};

export default function NLHeader({onRegisterClick, onLoginClick}: Props, 
 ){
    return(
        <header className="w-full z-1000 sticky top-0 px-10 py-3 border border-neutral-600/50 bg-neutral-900/70 backdrop-blur-lg">
            <nav className="flex w-full justify-between items-center">
                
                    <a href="/" className="font-bold text-lg justify-center flex hover:scale-90 duration-200 items-center space-x-3">
                        <GiAlliedStar size={25}/>
                        {nameApp1}
                        <span className="text-accent-600">{nameApp2}</span>
                    </a>
                <ul className="space-x-7 text-sm hidden sm:flex">
                    <li >
                        <a className="hover:text-accent-600 duration-300" href="/">Inicio</a>
                    </li>
                    <li >
                        <a className="hover:text-accent-600 duration-300" href="#cartelas">Cartelas</a>
                    </li>
                </ul>
                <ul className="flex space-x-5">
                    <li>
                        <button name="regisbtn" className=" text-xs bg-accent-600 hover:bg-accent-700 duration-300 cursor-pointer py-2 px-4 text-white rounded"  onClick={()=>{onRegisterClick()}}>Registrar-se</button>
                    </li>
                    <li>
                        <button className=" text-xs border border-accent-700 hover:bg-accent-700 duration-300 cursor-pointer py-2 px-4 text-white rounded"  onClick={()=>{onLoginClick()}}>Conectar-se</button>
                    </li>
                </ul>
            </nav>
        </header>
    )
} 