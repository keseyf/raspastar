import { useState } from "react";
import Cookies from "js-cookie";
import type { ResponseData } from "../../utils/interfaces";
import loginController from "../../controllers/login";
import ResponseCard from "../common/ResponseCard";

export default function LoginForm({ onClickEvent }: any) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("")

    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState("");

    const [cardColor, setCardColor] = useState("")

    return (
        <div className={`animate-formin fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center`}>
            <form
                onSubmit={async (e) => {
                    e.preventDefault()
                    const res = await loginController({ email, password })
                    if (res.status == 200) {
                        setCardColor("bg-green-500")
                        if(res.token){
                            Cookies.set("userToken", res.token)
                        }
                        setTimeout(() => {
                            window.location.reload()
                        }, 1200)
                    } else {
                        setCardColor("bg-red-500")
                    }
                    setResponse(res.message)
                    setTimeout(() => {
                        setResponse("")
                    }, 4800)
                }}

                className="bg-neutral-900 text-white w-full max-w-md p-8 rounded-xl shadow-2xl space-y-4"
            >
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-bold">Conectar-se</h1>
                    <p className="text-xs text-neutral-300">
                        Campos com <span className="text-accent-600">*</span> são obrigatórios
                    </p>
                </div>

                <div className="flex flex-col space-y-3">
                    <div className="flex flex-col">
                        <label htmlFor="Email">
                            <span className="text-accent-600">*</span> Email
                        </label>
                        <input
                            name="Email"
                            id="Email"
                            required
                            className="border py-2 px-3 rounded border-neutral-400/30 duration-300 focus:outline-none focus:border-neutral-400/80"
                            type="email"
                            placeholder="Email:"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="Password">
                            <span className="text-accent-600">*</span> Senha
                        </label>
                        <input
                            required
                            name="Password"
                            id="Password"
                            className="border py-2 px-3 rounded border-neutral-400/30 duration-300 focus:outline-none focus:border-neutral-400/80"
                            type="password"
                            placeholder="Senha:"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 text-white rounded font-semibold transition duration-300 ${loading
                        ? "bg-neutral-700 cursor-not-allowed"
                        : "bg-accent-600 hover:bg-accent-700 cursor-pointer"
                        }`}
                >
                    {loading ? "Conectando..." : "Conectar"}
                </button>

                <button
                    type="button"
                    className="w-full py-2 border-accent-600 border cursor-pointer hover:border-accent-700 text-white rounded font-medium transition duration-300"
                    onClick={onClickEvent}
                >
                    Fechar
                </button>

                <div className="text-center mt-2">
                    <a href="#" className="text-sm text-blue-400 hover:underline">
                        Esqueceu a senha?
                    </a>
                </div>

                {response && (
                    <ResponseCard message={response} bg={cardColor} />
                )}
            </form>
        </div>
    );
}
