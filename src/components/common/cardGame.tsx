import { PiPlay } from "react-icons/pi";
import type { Game } from "../../utils/interfaces";

interface CardGameProps {
  item: Game;
  onGameClick: (game: Game) => void;
}

export default function CardGame({ item, onGameClick }: CardGameProps) {
  return (
    <div className="bg-transparent flex h-130 flex-col group hover:scale-95 duration-200 rounded-lg overflow-hidden w-full sm:w-66 md:w-78 border border-neutral-600/30">
      {/* Contêiner da imagem com overlay */}
      <div className="relative w-full h-96 overflow-hidden">
        {/* Overlay */}
        <span className="absolute m-2 bg-accent-700 px-5 py-1 rounded-2xl z-20 border-accent-700 font-bold border-2">

        <h1 >NOVO!</h1>
        </span>
        <div className="absolute inset-0 z-10 flex items-center justify-center backdrop-blur-none group-hover:backdrop-blur-lg bg-black/0 group-hover:bg-black/50 transition-all duration-200">
          <button
            onClick={() => onGameClick(item)}
            className="flex items-center justify-center"
          >
            <PiPlay
              size={50}
              className="opacity-0 cursor-pointer group-hover:opacity-100 bg-accent-700/80 shadow-accent-700 shadow-2xl h-20 w-20 p-3 rounded-full text-white transition-opacity duration-200"
            />
          </button>
        </div>



        <img
          src={`./${item.imageUrl}.jpg`}
          className="object-cover w-full h-full transition duration-200 group-hover:blur-sm group-hover:scale-125"
          alt={`Imagem do jogo ${item.name}`}
        />
        
      </div>

      {/* Conteúdo */}
      <div className="p-3 justify-between flex flex-col items-stretch h-full">
        <h1 className="text-xl font-bold my-2">{item.name}</h1>
        <p>{item.desc}</p>
        <span className="flex py-3 w-full items-center justify-between">
          <h1 className="text-2xl text-green-500 font-black">
            R$ {item.gamePrice.toFixed(2)}
          </h1>

          <button
            onClick={() => onGameClick(item)}
            className="mx-3 px-5 cursor-pointer bg-accent-700 text-white py-3 rounded hover:bg-accent-800 transition"
          >
            Jogar
          </button>
        </span>
      </div>
    </div>
  );
}
