import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import DownMenuMobile from "../components/elements/DownMenuMobile";
import Header from "../components/elements/Header";
import Wallet from "../components/elements/Wallet";
import fetchProfiile from "../services/fetchProfile";
import type { Order, ResponseData, TabType } from "../utils/interfaces";

/* ================= COMPONENTE ================= */

export default function ProfilePage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState<ResponseData>();
  const [showWallet, setShowWallet] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("withdrawl");

  const userToken = Cookies.get("userToken");

  /* ================= EFFECTS ================= */

  useEffect(() => {
    if (!userToken) {
      navigate("/");
      return;
    }

    fetchProfiile({ userToken, setLoading, setResponse });
  }, [userToken, navigate]);

  /* ================= DADOS ================= */

  const balance = Number(response?.usrdata?.balance ?? 0).toFixed(2);
  const orders: Order[] = response?.usrdata?.orders ?? [];

  const withdraws = orders.filter(o => o.typeOrder === "withdrawl");
  const deposits = orders.filter(o => o.typeOrder === "recharge");

  const currentOrders =
    activeTab === "withdrawl" ? withdraws : deposits;

  /* ================= HELPERS ================= */

  const formatDateTime = (date?: string) => {
    if (!date) return "—";

    return new Date(date).toLocaleString("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
    });
  };

  // PIX válido por 20 minutos
  const isPixAvailable = (createdAt?: string) => {
    if (!createdAt) return false;

    const created = new Date(createdAt).getTime();
    const now = Date.now();

    const diffMinutes = (now - created) / 1000 / 60;

    return diffMinutes <= 20;
  };

  /* ================= LOGOUT ================= */

  const handleLogout = () => {
    Cookies.remove("userToken");
    window.location.reload();
  };

  /* ================= RENDER ================= */

  return (
    <div className="min-h-screen text-zinc-100">
      <Header balance={Number(balance)} />

      <div className="max-w-4xl mx-auto p-5 space-y-6">
        {loading ? (
          <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
            <p className="text-zinc-400">Carregando...</p>
          </div>
        ) : (
          <>
            {/* ================= CARD DO USUÁRIO ================= */}
            <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
              <h2 className="text-2xl font-bold">
                {response?.usrdata?.name}
              </h2>

              <p className="text-zinc-400">
                {response?.usrdata?.email}
              </p>

              <p className="mt-2 text-sm text-zinc-500">
                Saldo atual:{" "}
                <span className="text-emerald-400 font-semibold">
                  R$ {balance}
                </span>
              </p>
            </div>

            {/* ================= ABAS ================= */}
            <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 space-y-6">
              <div className="flex gap-4">
                <button
                  onClick={() => setActiveTab("withdrawl")}
                  className={`
                    flex-1 py-3 rounded-xl font-semibold transition-all
                    active:scale-95
                    ${
                      activeTab === "withdrawl"
                        ? "bg-indigo-700 text-white"
                        : "border border-indigo-700 text-indigo-400 hover:bg-indigo-700/10"
                    }
                  `}
                >
                  Saques
                </button>

                <button
                  onClick={() => setActiveTab("recharge")}
                  className={`
                    flex-1 py-3 rounded-xl font-semibold transition-all
                    active:scale-95
                    ${
                      activeTab === "recharge"
                        ? "bg-emerald-700 text-white"
                        : "border border-emerald-700 text-emerald-400 hover:bg-emerald-700/10"
                    }
                  `}
                >
                  Depósitos
                </button>
              </div>

              {/* ================= LISTA ================= */}
              <div className="space-y-3">
                {currentOrders.length === 0 ? (
                  <p className="text-center text-zinc-500">
                    Nada aqui por enquanto...
                  </p>
                ) : (
                  currentOrders.map(order => {
                    const pixAvailable =
                      activeTab === "recharge" &&
                      isPixAvailable(order.createdAt);

                    return (
                      <div
                        key={order.id}
                        className={`rounded-xl p-4 border transition
                          ${
                            pixAvailable
                              ? "bg-zinc-950/50 border-zinc-800"
                              : "bg-zinc-900/40 border-zinc-800 opacity-60"
                          }
                        `}
                      >
                        <div className="flex justify-between items-center">
                          <div className="space-y-1">
                            <p className="font-medium text-zinc-100">
                              {order.desc}
                            </p>

                            <span className="block text-xs text-zinc-500">
                              {activeTab === "withdrawl"
                                ? "Saque"
                                : "Depósito"}{" "}
                              • {formatDateTime(order.createdAt)}
                            </span>
                          </div>

                          <span
                            className={`font-semibold ${
                              activeTab === "withdrawl"
                                ? "text-red-400"
                                : "text-emerald-400"
                            }`}
                          >
                            R$ {Number(order.amount).toFixed(2)}
                          </span>
                        </div>

                        {/* ================= PIX ================= */}
                        {activeTab === "recharge" && pixAvailable && (
                          <div className="mt-3 bg-zinc-900 border border-zinc-800 rounded-lg p-3">
                            <p className="text-xs text-zinc-400 mb-1">
                              Chave PIX (copia e cola)
                            </p>

                            <div className="flex items-center gap-2">
                              <span className="text-xs text-zinc-300 break-all">
                                {order.pixCopyPasteKey}
                              </span>

                              <button
                                onClick={() =>
                                  navigator.clipboard.writeText(order.pixCopyPasteKey || "")
                                }
                                className="text-xs text-emerald-400 hover:text-emerald-300 transition"
                              >
                                Copiar
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* ================= SAIR ================= */}
            <button
              onClick={handleLogout}
              className="w-full py-3 rounded-xl bg-red-700 text-white font-semibold
                         hover:bg-red-800 transition active:scale-95"
            >
              Sair da conta
            </button>
          </>
        )}
      </div>

      {/* ================= MENU MOBILE ================= */}
      <DownMenuMobile
        onClickProfileEvent={() => navigate("/perfil")}
        onClickWalletEvent={() => setShowWallet(prev => !prev)}
      />

      {showWallet && (
        <Wallet onClickCloseEvent={() => setShowWallet(false)} />
      )}
    </div>
  );
}
