import { useState } from "react";
import signUpController from "../../controllers/signUp";
import type { ResponseData } from "../../utils/interfaces";
import ResponseCard from "../common/ResponseCard";
import loginController from "../../controllers/login";
import Cookies from "js-cookie";

export default function SignUpForm({ onClickEvent }: any) {
    const [animation, setAnimation] = useState<"in" | "out">("in");
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState("");

    const [cardColor, setCardColor] = useState("")

    return (
        <div className={`animate-form${animation} fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center`}>
            <form
                onSubmit={async (e) => {
                    e.preventDefault();
                    setLoading(true);

                    const result = await signUpController({ username, name, cpf, password, email });

                    console.log(result); // <-- agora não será undefined
                    console.log("RESULTADO DO CADASTRO/LOGIN:", result);

                    if (result) {
                        if (result.status >= 200 && result.status < 300) {
                            setCardColor("bg-green-500");
                        } else {
                            setCardColor("bg-red-500");
                        }

                        if (result?.token) {
                            Cookies.set("userToken", result.token);
                            
                            setTimeout(() => {
                                window.location.reload();
                            }, 1200);
                        }
                        setResponse(result.message)
                        setTimeout(() => {
                            setResponse("")
                        }, 4800)
                    }

                    setLoading(false);
                }}

                className="bg-neutral-900 text-white w-full max-w-md p-8 rounded-xl shadow-2xl space-y-4"
            >
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-bold">Cadastre-se</h1>
                    <p className="text-xs text-neutral-300">
                        Campos com <span className="text-accent-600">*</span> são obrigatórios
                    </p>
                </div>

                <div className="flex flex-col space-y-3">
                    <div className="flex flex-col">
                        <label htmlFor="Name">
                            <span className="text-accent-600">*</span> Nome e Sobrenome
                        </label>
                        <input
                            name="Name"
                            id="Name"
                            required
                            className="border py-2 px-3 rounded border-neutral-400/30 duration-300 focus:outline-none focus:border-neutral-400/80"
                            type="text"
                            placeholder="Nome:"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="User">Usuário</label>
                        <input
                            name="User"
                            id="User"
                            className="border py-2 px-3 rounded border-neutral-400/30 duration-300 focus:outline-none focus:border-neutral-400/80"
                            type="text"
                            placeholder="Usuário:"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

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
                        <label htmlFor="Cpf">
                            <span className="text-accent-600">*</span> Cpf
                        </label>
                        <input
                            name="Cpf"
                            id="Cpf"
                            required
                            className="border py-2 px-3 rounded border-neutral-400/30 duration-300 focus:outline-none focus:border-neutral-400/80"
                            type="text"
                            placeholder="CPF:"
                            onChange={(e) => setCpf(e.target.value)}
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
                    name="submitBtn"
                    disabled={loading}
                    className={`w-full py-2 text-white rounded font-semibold transition duration-300 ${loading
                        ? "bg-neutral-700 cursor-not-allowed"
                        : "bg-accent-600 hover:bg-accent-700 cursor-pointer"
                        }`}
                >
                    {loading ? "Cadastrando..." : "Cadastrar"}
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

                    // <p
                    //     className={`text-sm mt-2 text-center ${
                    //         response.type === "success" ? "text-green-400" : "text-red-400"
                    //     }`}
                    // >
                    //     {response.data.message}
                    // </p>
                )}
            </form>
        </div>
    );
}
