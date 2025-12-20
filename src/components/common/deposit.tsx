import { useEffect, useState } from "react";
import rechargeController from "../../controllers/recharge";
import Cookies from "js-cookie";
import QRCode from "react-qr-code";

export default function Deposit() {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const [pixKey, setPixKey] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(20 * 60); // 20 minutos

  const predefinedValues = [1, 5, 10, 25, 50, 100];

  const handleSelectValue = (value: number) => {
    setAmount(String(value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || Number(amount) < 1) {
      return alert("O valor mínimo de depósito é R$ 1,00");
    }

    const userToken = Cookies.get("userToken");

    if (!userToken) {
      return alert("Usuário não autenticado");
    }

    setLoading(true);

    const response = await rechargeController({
      userToken,
      rechargeValue: amount,
    });

    setLoading(false);

    if (response.status !== 200) {
      return alert(response.message);
    }

    setPixKey(response.pixCopyPasteKey || "");
    setTimeLeft(20 * 60); // reseta contador
  };

  /* ================= TIMER ================= */

  useEffect(() => {
    if (!pixKey) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [pixKey]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  /* ================= COPY ================= */

  const copyPix = async () => {
    if (!pixKey) return;
    await navigator.clipboard.writeText(pixKey);
    alert("Código PIX copiado!");
  };

  return (
    <>
      {/* ================= FORM ================= */}

      <form className="flex w-full mb-3 flex-col gap-3" onSubmit={handleSubmit}>
        <div className="flex w-full flex-wrap gap-2 items-center justify-center">
          {predefinedValues.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => handleSelectValue(value)}
              className="py-2 w-1/3 rounded border border-neutral-600 text-white hover:bg-accent-700 transition"
            >
              R$ {value.toFixed(2)}
            </button>
          ))}
        </div>

        <input
          className="border py-2 px-3 rounded border-neutral-400/30 bg-neutral-800 text-white focus:outline-none"
          type="number"
          min={1}
          placeholder="Valor do depósito"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-accent-600 hover:bg-accent-700 text-white rounded font-medium transition disabled:opacity-50"
        >
          {loading ? "Gerando PIX..." : "Gerar PIX"}
        </button>
      </form>

      {/* ================= MODAL PIX ================= */}

      {pixKey && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="relative w-80 bg-neutral-900 border border-neutral-700 rounded-xl p-5 text-center shadow-2xl">

            {/* FECHAR */}
            <button
              onClick={() => setPixKey(null)}
              className="absolute top-3 right-3 text-neutral-400 hover:text-white"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold text-white mb-2">
              Pague com PIX
            </h2>

            <p className="text-neutral-400 mb-3">
              Tempo restante:
              <span className="text-accent-500 font-semibold ml-1">
                {minutes}:{seconds.toString().padStart(2, "0")}
              </span>
            </p>

            {/* QR CODE */}
            <div className="bg-white p-3 rounded-lg inline-block mb-3">
              <QRCode value={pixKey} size={160} />
            </div>

            {/* PIX COPIA E COLA */}
            <div className="bg-neutral-800 border border-neutral-700 rounded p-2 text-xs text-neutral-300 break-all mb-2">
              {pixKey}
            </div>

            <button
              onClick={copyPix}
              className="w-full py-2 bg-accent-600 hover:bg-accent-700 text-white rounded font-medium transition"
            >
              Copiar código PIX
            </button>
          </div>
        </div>
      )}
    </>
  );
}
