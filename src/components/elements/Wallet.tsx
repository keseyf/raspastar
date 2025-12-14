import { useState } from "react";
import Withdrawl from "../common/withdrawl";
import Deposit from "../common/deposit";
// import Deposit from "../common/deposit"; // <-- caso você tenha esse componente

export default function Wallet({ onClickWithdrawlEvent, onClickDepositEvent, onClickCloseEvent }: any) {
  const [selectedTab, setSelectedTab] = useState<"deposit" | "withdraw">("withdraw");

  const handleSelect = (tab: "deposit" | "withdraw") => {
    setSelectedTab(tab);
    if (tab === "deposit") onClickDepositEvent();
    else onClickWithdrawlEvent();
  };

  return (
    <div className="flex-col animate-formin fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-neutral-900 p-5 rounded-lg  w-[350px]">
        
        {/* Navegação de abas */}
        <nav className="flex items-center justify-center gap-3 mb-4">
          <button
            onClick={() => handleSelect("deposit")}
            className={`px-4 py-2 rounded font-medium transition duration-300 ${
              selectedTab === "deposit"
                ? "bg-accent-600 text-white"
                : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
            }`}
          >
            Depósito
          </button>

          <button
            onClick={() => handleSelect("withdraw")}
            className={`px-4 py-2 rounded font-medium transition duration-300 ${
              selectedTab === "withdraw"
                ? "bg-accent-600 text-white"
                : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
            }`}
          >
            Retirar
          </button>
        </nav>

        {/* Conteúdo condicional */}
        <div>
          {selectedTab === "withdraw" ? (
            <Withdrawl />
          ) : (
            <Deposit/>
          )}
          <button onClick={()=>{
              onClickCloseEvent()
          }} className=" w-full py-2 hover:bg-red-600 border-red-600 border cursor-pointer hover:border-red-700 text-white rounded font-medium transition duration-300">Fechar</button>
        </div>
      </div>
    </div>
  );
}
