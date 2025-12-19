import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardGame from "./cardGame";
import { getGames } from "../../controllers/getGames";
import Cookies from "js-cookie";
import type { Game } from "../../utils/interfaces";

export default function Games({ setSLForm }: any) {
  const userToken = Cookies.get("userToken");

  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState<any[]>([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const fetchGames = () => {
    setLoading(true);
    setError("");
    getGames(setGames, setLoading, setError);
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center w-full"
      id="cartelas"
    >
      {loading ? (
        /* ===== LOADING ===== */
        <div className="flex flex-col items-center justify-center gap-4 p-10">
          <h1 className="font-black bg-accent-700 px-4 py-2 text-4xl md:text-3xl text-center">
            Raspadinhas
          </h1>

          <span className="text-xl font-semibold text-neutral-300 animate-pulse">
            Carregando...
          </span>
        </div>
      ) : (
        /* ===== CONTEÚDO ===== */
        <div className="flex flex-col w-full p-5 items-center">
          <h1 className="font-black bg-accent-700 px-4 py-2 text-white text-4xl md:text-3xl mb-10 text-center">
            Raspadinhas
          </h1>

          {games.length > 0 ? (
            <ul className="flex flex-wrap items-center justify-center w-full gap-5">
              {games.map((item, index) => (
                <li key={index}>
                  <CardGame
                    item={item}
                    onGameClick={(game: Game) => {
                      if (userToken) {
                        navigate(`/games/${game.id}`);
                      } else {
                        setSLForm(true);
                      }
                    }}
                  />
                </li>
              ))}
            </ul>
          ) : (
            /* ===== SEM JOGOS ===== */
            <div className="flex flex-col items-center gap-4">
              <p className="text-lg text-neutral-400 text-center">
                Não foi possível encontrar os jogos 😢
              </p>

              <button
                onClick={fetchGames}
                className="px-6 py-2 rounded-lg bg-accent-600 text-white font-semibold hover:bg-accent-700 transition"
              >
                Tentar novamente
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
