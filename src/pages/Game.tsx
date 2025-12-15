import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getGameData } from "../controllers/getGameData";
import type { Game, ResponseData } from "../utils/interfaces";
import Cookies from "js-cookie";
import Header from "../components/elements/Header";
import NLHeader from "../components/elements/HeaderNL";
import DownMenuMobile from "../components/elements/DownMenuMobile";
import LoginForm from "../components/elements/Login";
import SignUpForm from "../components/elements/SignUp";
import fetchProfiile from "../services/fetchProfile";
import Gameboard from "../components/elements/GameBoard";
import Wallet from "../components/elements/Wallet";

export default function GameInfoPage() {
  const userToken = Cookies.get("userToken");
  const [showLForm, setSLForm] = useState(false);
  const [showRForm, setSRForm] = useState(false);
  const [response, setResponse] = useState<ResponseData>();
    const [showWallet, setShowWallet] = useState(false);
  
  const [windowSize, setWindowSize] = useState<number>(window.innerWidth);

  const navigate = useNavigate();
  const { id } = useParams();
  const [gameInfo, setGameInfo] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userToken) {
      navigate("/");
      return;
    }
    fetchProfiile({ userToken, setLoading, setResponse });
  }, [userToken, navigate]);

  const balance = Number(response?.usrdata?.balance ?? 0).toFixed(2);

  useEffect(() => {
    if (id) {
      getGameData(setGameInfo, setLoading, setError, Number(id));
    }
  }, [id]);

  useEffect(() => {
    const handleResize = () => setWindowSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      {userToken ? (
        <Header balance={Number(balance)} />
      ) : (
        <NLHeader
          onLoginClick={() => setSLForm(true)}
          onRegisterClick={() => setSRForm(true)}
        />
      )}

      {loading ? (
        <p className="text-center my-5">Carregando informações...</p>
      ) : error ? (
        <p className="text-center text-red-500">Erro: {error}</p>
      ) : gameInfo ? (
        <div className="flex flex-col w-full items-center justify-center">

          <Gameboard userId={String(response?.usrdata?.id)} game={gameInfo}/>
        </div>
      ) : (
        <p>Jogo não encontrado.</p>
      )}

      {windowSize <= 768 && userToken && <DownMenuMobile onClickProfileEvent={() => {
                if (userToken) {
                    navigate("/perfil")
                } else {
                    setSLForm(true)
                }
            }} onClickWalletEvent={()=>{
                if (userToken) {
                    setShowWallet(!showWallet)
                } else {
                    setSLForm(true)
                }
            }}/>}
      {showRForm && <SignUpForm onClickEvent={() => setSRForm(false)} />}
      {showLForm && <LoginForm onClickEvent={() => setSLForm(false)} />}
      {showWallet && (
                      <Wallet onClickCloseEvent={() => setShowWallet(false)} />
                  )}
    </div>
  );
}
