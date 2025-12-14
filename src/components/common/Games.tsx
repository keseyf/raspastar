import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardGame from "./cardGame";
import { getGames } from "../../controllers/getGames";
import Cookies from "js-cookie";
import type { Game } from "../../utils/interfaces";

export default function Games({setSLForm}: any) {
  // User token ne
  const userToken = Cookies.get("userToken")


  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState<any[]>([]);
  const [response, setResponse] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate()

  useEffect(() => {
    getGames(setGames, setLoading, setError);
  }, []);

  return (
    <div className="flex" id="cartelas">
      {loading ? (
        <div>
          <h1 className="font-black text-accent-600 text-4xl md:text-3xl">Raspadinhas</h1>
          Carregando...
        </div>
      ) : (
        <div className="flex flex-col w-full p-5">
          <h1 className="font-black text-accent-600 text-4xl md:text-3xl mb-10">Raspadinhas</h1>

          <ul className="flex-wrap flex items-center justify-evenly w-full gap-5">
            {games.map((item, index) => (
              <li key={index}>
                <CardGame onGameClick={(game: Game) => {
                  if (userToken) {
                    navigate(`/games/${game.id}`)
                  } else {
                    setSLForm(true)
                  }
                }} item={item} /></li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
