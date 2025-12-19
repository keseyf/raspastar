import { useEffect, useState } from "react";
import type { Game } from "../../utils/interfaces";
import { bet } from "../../controllers/bet";

/* ================= MAPA DE IMAGENS ================= */

const prizeImages: Record<string, string> = {
  "iPhone 15 Pro Max": "/prizes/iphone15icon.png",
  "Moto Honda CG 160": "/prizes/moto_icon.png",
  "Scooter elétrica": "/prizes/scooter_icon.png",
  "Notebook Gamer": "/prizes/notebook_icon.png",
  "Smartwatch Premium": "/prizes/smartwatch_icon.png",

  "iPhone 14 Pro": "/prizes/iphone14pro_icon.png",
  "Smart TV 65 polegadas": "/prizes/tv65_icon.png",
  "Máquina de lavar moderna": "/prizes/maquina_lavar_icon.png",
  "Tablet Samsung Galaxy": "/prizes/tablet_samsung_icon.png",
  "Fone Bluetooth Top de Linha": "/prizes/fone_bluetooth_icon.png",

  "Caixinha de som portátil": "/prizes/caixinha_som_icon.png",
  "Fone Bluetooth básico": "/prizes/fone_basico_icon.png",
  "Smartphone R$1500-2500": "/prizes/smartphone_icon.png",
  "Relógio digital esportivo": "/prizes/relogio_digital_icon.png",

  "Xbox Series S/X": "/prizes/xbox_series_icon.png",
  "Smartphone R$3000-5000": "/prizes/smartphone_premium_icon.png",

  "PIX R$1000": "/prizes/pix1000_icon.png",
  "PIX R$100": "/prizes/pix100_icon.png",
  "PIX R$50": "/prizes/pix50_icon.png",
  "PIX R$10": "/prizes/pix10_icon.png",
  "PIX R$5": "/prizes/pix5_icon.png",
  "PIX R$2": "/prizes/pix2_icon.png",
  "PIX R$1": "/prizes/pix1_icon.png",

  "": "/prizes/vazio_icon.png",
};


export function preloadPrizeImages() {
  Object.values(prizeImages).forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}




  
/* ================= COMPONENTE ================= */

export default function Gameboard({
  game,
  userId,
}: {
  game: Game;
  userId: string;
}) {

  useEffect(() => {
    preloadPrizeImages();
  }, []);

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const fetchBet = async () => {
    setLoading(true);
    setShowResult(false);
    setActiveIndex(null);

    const res = await bet(Number(game.id), userId, setLoading);
    setResponse(res);

    setTimeout(() => {
      setShowResult(true);
    }, 900);
  };

  return (
    <div className="relative flex flex-col items-center">
      {game ? (
        <>
          {/* ===== BOARD ===== */}
          <div className="grid grid-cols-3 grid-rows-3 gap-3 rounded-xl shadow-xl p-2">
            {[...Array(9)].map((_, i) => {
              const prize = response?.board?.[i] ?? "";
              const image = prizeImages[prize];
              const isActive = activeIndex === i;

              return (
                <div
                  key={i}
                  onClick={() =>
                    setActiveIndex(isActive ? null : i)
                  }
                  className="relative group w-36 h-36 bg-neutral-800 border border-neutral-700/20 rounded-4xl overflow-hidden flex items-center justify-center shadow-inner cursor-pointer"
                >
                  {/* IMAGEM */}
                  {image && (
                    <img
                      src={image}
                      alt={prize || "Vazio"}
                      className="w-full h-full object-cover"
                    />
                  )}

                  {/* OVERLAY */}
                  <div
                    className={`
                      absolute inset-0 flex items-center justify-center
                      bg-black/50 backdrop-blur-sm
                      transition-opacity duration-300
                      opacity-0
                      group-hover:opacity-100
                      ${isActive ? "opacity-100" : ""}
                    `}
                  >
                    <span className="text-white text-sm font-semibold text-center px-3">
                      {prize || "Sem prêmio"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ===== BOTÃO ===== */}
          <button
            onClick={fetchBet}
            disabled={loading}
            className={`mt-5 w-44 py-3 ${
              loading
                ? "pointer-events-none bg-neutral-700"
                : "bg-accent-600 hover:bg-accent-700"
            } text-white rounded-lg font-semibold shadow-md transition`}
          >
            {loading ? "Processando..." : "RASPAR!"}
          </button>

          {/* ===== RESULT MODAL ===== */}
          {showResult && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-neutral-900 border border-neutral-700 p-6 rounded-xl shadow-2xl w-80 text-center animate-fadeIn">
                <h2
                  className={`text-2xl font-bold mb-2 ${
                    response?.won
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {response?.won
                    ? "🎉 Você ganhou!"
                    : "😢 Não foi dessa vez"}
                </h2>

                <p className="text-neutral-300 mb-3">
                  {response?.message}
                </p>

                {response?.won && response?.prize && (
                  <p className="text-xl font-semibold text-green-400 mb-3">
                    Prêmio: {response.prize}
                  </p>
                )}

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
        <span className="text-neutral-500">Nada</span>
      )}
    </div>
  );
}
