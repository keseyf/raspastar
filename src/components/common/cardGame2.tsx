import { PiPlay } from "react-icons/pi";
import type { Game } from "../../utils/interfaces";

interface CardGameProps {
  item: Game;
}

export default function CardGame2({ item }: CardGameProps) {
  return (
    <div className="bg-transparent flex h-130 flex-col group hover:scale-95 duration-200 rounded overflow-hidden w-full md:w-78 border border-neutral-600/30">
      {/* Contêiner da imagem com overlay */}
      <div className="relative w-full h-96 overflow-hidden">
        {/* Overlay */}
        <div className="absolute inset-0 z-10 flex items-center justify-center backdrop-blur-none group-hover:backdrop-blur-2xl bg-black/0 group-hover:bg-black/30 transition-all duration-200">
          <a href={`/games/${item.id}`}>
            <PiPlay
              size={50}
              className="opacity-0 group-hover:opacity-100 bg-accent-700 h-20 w-20 p-3 rounded-full text-white transition-opacity duration-200"
            />
          </a>
        </div>

        {}
        <img
          src={`../${item.imageUrl}.jpg`}
          className="object-cover w-full h-full transition duration-200 group-hover:blur-sm"
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

          {/* Link para o jogo */}
          <a
            href={`/games/${item.id}`}
            className="mx-3 px-5 bg-accent-700 text-white py-3 rounded hover:bg-accent-800 transition"
          >
            Jogar
          </a>
        </span>
      </div>
    </div>
  );
}
