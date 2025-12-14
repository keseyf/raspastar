import { useState } from "react";
import { generateRandomUsername } from "../../utils/func";
import LastWinnerCard from "../common/cardLastWinner";

export default function LastWinners() {
  const [prizeAmount] = useState(() => {
    return (Math.floor(Math.random() * 79999 * 100) / 100).toLocaleString(
      "pt-BR",
      { style: "currency", currency: "BRL" }
    );
  });
  
  const [winners] = useState(()=>{
    return Array.from({ length: 25 }, (_, i) => (
          <LastWinnerCard key={`a-${i}`} />
        ))
  })
return (
  <section className="flex w-full my-5 overflow-x-hidden flex-col">
    <article className="flex px-5 flex-col md:flex-row justify-between w-full md:items-center">
      <h1 className="font-black text-3xl md:text-4xl">Últimos ganhadores</h1>
      <span className="flex my-4 md:my-0 flex-col">
        <h3 className="text-sm text-neutral-600 my-2">Prêmios distribuídos</h3>
        <h1 className="font-black text-4xl md:text-3xl text-green-400">
          {
            prizeAmount
          }
        </h1>

      </span>
    </article>
    <article className="flex h-full gap-5 my-10 overflow-hidden relative">
      <div className="absolute left-0 top-0 h-full w-32 from-neutral-950 to-neutral-950/0 bg-gradient-to-r z-10"></div>

      <div className="absolute right-0 top-0 h-full w-32 from-neutral-950 to-neutral-950/0 bg-gradient-to-l z-10"></div>
      <div className="flex animate-scroll gap-5">
        {winners}
        {/* duplica os itens para looping */}
        {winners}
      </div>
    </article>

  </section>
);
}
