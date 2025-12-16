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
  const [activeTab, setActiveTab] = useState<TabType>("WITHDRAW");

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

  const withdraws = orders.filter(o => o.typeOrder === "WITHDRAW");
  const deposits = orders.filter(o => o.typeOrder === "DEPOSIT");

  const currentOrders =
    activeTab === "WITHDRAW" ? withdraws : deposits;

  /* ================= HELPERS ================= */

  const formatDateTime = (date?: string) => {
    if (!date) return "—";

    return new Date(date).toLocaleString("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
    });
  };

  /* ================= LOGOUT ================= */

  const handleLogout = () => {
    localStorage.removeItem("userToken");
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
                {/* SAQUES */}
                <button
                  onClick={() => setActiveTab("WITHDRAW")}
                  className={`
                    flex-1 py-3 rounded-xl font-semibold transition-all
                    active:scale-95
                    ${
                      activeTab === "WITHDRAW"
                        ? "bg-indigo-700 text-white"
                        : "border border-indigo-700 text-indigo-400 hover:bg-indigo-700/10"
                    }
                  `}
                >
                  Saques
                </button>

                {/* DEPÓSITOS */}
                <button
                  onClick={() => setActiveTab("DEPOSIT")}
                  className={`
                    flex-1 py-3 rounded-xl font-semibold transition-all
                    active:scale-95
                    ${
                      activeTab === "DEPOSIT"
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
                  currentOrders.map(order => (
                    <div
                      key={order.id}
                      className="bg-zinc-950/50 border border-zinc-800 rounded-xl p-4 flex justify-between items-center"
                    >
                      <div className="space-y-1">
                        <p className="font-medium text-zinc-100">
                          {order.desc}
                        </p>

                        <span className="block text-xs text-zinc-500">
                          {activeTab === "WITHDRAW"
                            ? "Saque"
                            : "Depósito"}{" "}
                          • {formatDateTime(order.createdAt)}
                        </span>
                      </div>

                      <span
                        className={`font-semibold ${
                          activeTab === "WITHDRAW"
                            ? "text-red-400"
                            : "text-emerald-400"
                        }`}
                      >
                        R$ {Number(order.amount).toFixed(2)}
                      </span>
                    </div>
                  ))
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
