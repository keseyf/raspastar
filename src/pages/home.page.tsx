import Cookies from "js-cookie"
import Header from "../components/elements/Header"
import NLHeader from "../components/elements/HeaderNL"
import { useEffect, useState } from "react"
import { bloquearAtalhos, desabilitarCliqueDireito } from "../controllers/blockDevTools"
import BannerArea from "../components/elements/Banner"
import LastWinners from "../components/elements/LastWinners"
import Footer from "../components/elements/Footer"
import Games from "../components/common/Games"
import SignUpForm from "../components/elements/SignUp"
import LoginForm from "../components/elements/Login"
import DownMenuMobile from "../components/elements/DownMenuMobile"
import { useNavigate } from "react-router-dom"
import type { ResponseData } from "../utils/interfaces"
import fetchProfiile from "../services/fetchProfile"
import Wallet from "../components/elements/Wallet"

export default function HomePage() {
    const userToken = Cookies.get("userToken")

    const navigate = useNavigate()

    const [showRForm, setSRForm] = useState(false)
    const [showLForm, setSLForm] = useState(false)
    const [showWallet, setShowWallet] = useState(false)

    const [loading, setLoading] = useState(true);
    
    const [response, setResponse] = useState<ResponseData>();
    

    const [windowSize, setWindowSize] = useState<number>(window.innerWidth);


    // useEffect(() => {
    //     window.addEventListener("contextmenu", desabilitarCliqueDireito, { passive: false });
    //     window.addEventListener("keydown", bloquearAtalhos, { passive: false });
    //     return () => {
    //         window.removeEventListener("contextmenu", desabilitarCliqueDireito);
    //         window.removeEventListener("keydown", bloquearAtalhos);
    //     }
    // }, [])

    useEffect(() => {
        const handleResize = () => setWindowSize(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
            if (!userToken) {
                navigate("/");
                return;
            }
    
            fetchProfiile({userToken,setLoading,setResponse})
        }, [userToken, navigate]);

    const balance = Number(response?.usrdata?.balance ?? 0).toFixed(2);

    return (
        <div>
            {/*carregar as imagem antes */}

            <div className="hidden" id="loadcontent">
                <img src="./banner1.png" alt="" />
                <img src="./banner2.png" alt="" />
                <img src="./banner3.png" alt="" />
                <img src="./cardGame1.jpg" alt="" />
                <img src="./cardGame2.jpg" alt="" />
                <img src="./cardGame3.jpg" alt="" />
                <img src="./cardGame4.jpg" alt="" />
            </div>

            {userToken ? <Header balance={Number(balance)} /> : <NLHeader onLoginClick={() => { setSLForm(true) }} onRegisterClick={() => { setSRForm(true) }} />}
            <main className="p-5">
                <BannerArea />
                <hr className="border-neutral-800 my-5" />
                <LastWinners />
                <Games setSLForm={setSLForm}/>
            </main>
            <DownMenuMobile onClickProfileEvent={() => {
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
            }}/>
            {showRForm ? <SignUpForm onClickEvent={() => setSRForm(false)} /> : ""}
            {showLForm ? <LoginForm onClickEvent={() => setSLForm(false)} /> : ""}
            {showWallet ? <Wallet onClickCloseEvent={()=> setShowWallet(!showWallet)}/> : ""}
            <Footer />
        </div>
    )
}