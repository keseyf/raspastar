import { useState } from "react";
import signUpController from "../../controllers/signUp";
import ResponseCard from "../common/ResponseCard";
import Cookies from "js-cookie";

export default function SignUpForm({ onClickEvent }: any) {
  const [animation] = useState<"in" | "out">("in");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [cardColor, setCardColor] = useState("");

  // ================= CPF FORMATTER =================
  function formatCPF(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 11);

    return digits
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }
  // =================================================

  return (
    <div
      className={`animate-form${animation} fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center`}
    >
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);

          // envia CPF sem máscara
          const cpfOnlyNumbers = cpf.replace(/\D/g, "");

          const result = await signUpController({
            username,
            name,
            email,
            password,
            cpf: cpfOnlyNumbers,
          });

          if (result) {
            setCardColor(
              result.status >= 200 && result.status < 300
                ? "bg-green-500"
                : "bg-red-500"
            );

            if (result?.token) {
              Cookies.set("userToken", result.token);
              setTimeout(() => window.location.reload(), 1200);
            }

            setResponse(result.message);
            setTimeout(() => setResponse(""), 4800);
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
              required
              id="Name"
              className="border py-2 px-3 rounded border-neutral-400/30 focus:outline-none focus:border-neutral-400/80"
              type="text"
              placeholder="Nome:"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="User">Usuário</label>
            <input
              id="User"
              className="border py-2 px-3 rounded border-neutral-400/30 focus:outline-none focus:border-neutral-400/80"
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
              required
              id="Email"
              className="border py-2 px-3 rounded border-neutral-400/30 focus:outline-none focus:border-neutral-400/80"
              type="email"
              placeholder="Email:"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="Cpf">
              <span className="text-accent-600">*</span> CPF
            </label>
            <input
              required
              id="Cpf"
              type="text"
              inputMode="numeric"
              placeholder="000.000.000-00"
              maxLength={14}
              value={cpf}
              className="border py-2 px-3 rounded border-neutral-400/30 focus:outline-none focus:border-neutral-400/80"
              onChange={(e) => setCpf(formatCPF(e.target.value))}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="Password">
              <span className="text-accent-600">*</span> Senha
            </label>
            <input
              required
              id="Password"
              type="password"
              placeholder="Senha:"
              className="border py-2 px-3 rounded border-neutral-400/30 focus:outline-none focus:border-neutral-400/80"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded font-semibold transition ${
            loading
              ? "bg-neutral-700 cursor-not-allowed"
              : "bg-accent-600 hover:bg-accent-700"
          }`}
        >
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>

        <button
          type="button"
          className="w-full py-2 border-accent-600 border hover:border-accent-700 rounded"
          onClick={onClickEvent}
        >
          Fechar
        </button>

        {response && <ResponseCard message={response} bg={cardColor} />}
      </form>
    </div>
  );
}
