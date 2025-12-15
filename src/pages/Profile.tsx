import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import DownMenuMobile from "../components/elements/DownMenuMobile";
import type { ResponseData } from "../utils/interfaces";
import Header from "../components/elements/Header";
import fetchProfiile from "../services/fetchProfile";
import Wallet from "../components/elements/Wallet";

export default function ProfilePage() {
    const navigate = useNavigate();

    const [windowSize, setWindowSize] = useState<number>(
        typeof window !== "undefined" ? window.innerWidth : 0
    );

    const [loading, setLoading] = useState(true);
    const [response, setResponse] = useState<ResponseData>();

    const [showLForm, setSLForm] = useState(false);
    const [showWallet, setShowWallet] = useState(false);

    const userToken = Cookies.get("userToken");

    useEffect(() => {
        if (!userToken) {
            navigate("/");
            return;
        }

        fetchProfiile({ userToken, setLoading, setResponse });
    }, [userToken, navigate]);

    useEffect(() => {
        const handleResize = () => setWindowSize(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const balance = Number(response?.usrdata?.balance ?? 0).toFixed(2);

    return (
        <div>
            <Header balance={Number(balance)} />

            {loading ? (
                <div className="p-5">
                    <p>Carregando...</p>
                </div>
            ) : (
                <div className="p-5">
                    <h2>Bem-vindo, {response?.usrdata?.name}</h2>
                    <p>Email: {response?.usrdata?.email}</p>
                    <p>Tamanho da tela: {windowSize}px</p>
                </div>
            )}

            <DownMenuMobile
                onClickProfileEvent={() => {
                    if (userToken) {
                        navigate("/perfil");
                    } else {
                        setSLForm(true);
                    }
                }}
                onClickWalletEvent={() => {
                    if (userToken) {
                        setShowWallet(prev => !prev);
                    } else {
                        setSLForm(true);
                    }
                }}
            />

            {showWallet && (
                <Wallet onClickCloseEvent={() => setShowWallet(false)} />
            )}
        </div>
    );
}
