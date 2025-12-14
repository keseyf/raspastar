import { useState } from "react";
import type { Game } from "../../utils/interfaces";
import { bet } from "../../controllers/bet";

export default function Gameboard({ game, userId }: { game: Game, userId: string }) {

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);

  const fetchBet = async () => {
    setLoading(true);
    const res = await bet(Number(game.id), userId, setLoading);
    setResponse(res);
    setShowResult(true); // abre o card automaticamente
  };

  return (
    <div className="relative flex flex-col items-center">
      {game ? (
        <>
          <div className="grid grid-cols-3 grid-rows-3 gap-3 p-4 bg-neutral-900 rounded-xl shadow-xl">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className="w-24 h-24 bg-neutral-800 border border-neutral-600 rounded-lg flex items-center justify-center text-white text-2xl font-bold shadow-inner"
              >
                {response?.board?.[i] ?? ""}
              </div>
            ))}
          </div>

          <button
            onClick={fetchBet}
            disabled={loading}
            className="mt-4 w-40 py-2 bg-accent-600 hover:bg-accent-700 text-white rounded-lg font-semibold shadow-md transition disabled:opacity-50"
          >
            {loading ? "Processando..." : "RASPAR!"}
          </button>

          {/* RESULT MODAL */}
          {showResult && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-neutral-900 border border-neutral-700 p-6 rounded-xl shadow-2xl w-80 text-center animate-fadeIn">
                
                {/* Título */}
                <h2 className={`text-2xl font-bold mb-2 ${
                  response?.won ? "text-green-400" : "text-red-400"
                }`}>
                  {response?.won ? "🎉 Você ganhou!" : "😢 Não foi dessa vez"}
                </h2>

                {/* Mensagem */}
                <p className="text-neutral-300 mb-3">
                  {response?.message}
                </p>

                {/* Prêmio */}
                {response?.won && response?.prize && (
                  <p className="text-xl font-semibold text-green-400 mb-3">
                    Prêmio: {response.prize}
                  </p>
                )}

                {/* Botão Fechar */}
                <button
                  onClick={() => setShowResult(false)}
                  className="mt-3 w-full py-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-600 text-white rounded-lg transition"
                >
                  Fechar
                </button>

              </div>
            </div>
          )}
        </>
      ) : (
        "nada"
      )}
    </div>
  );
}
