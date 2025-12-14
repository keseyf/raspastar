import { useState } from "react";

export default function Withdrawl() {
  const [amount, setAmount] = useState("");

  const predefinedValues = [1, 5, 10, 25, 50, 100]

  const handleSelectValue = (value:any) => {
    setAmount(value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if(!amount || amount === undefined || parseInt(amount) === 0 ){
        return alert("O Valor mínimo de déposito é 1 real.")
    }
    alert(`saque de ${amount} solicitado`)
  };

  return (
    <form
      className="flex mb-3 bg-neutral-900 flex-col w-full gap-3"
      onSubmit={handleSubmit}
    >
      {/* Grade de botões */}
      <div className="flex flex-wrap gap-2 w-full items-center justify-center">
        <p className="text-xs text-neutral-700 text-center my-2">O saque é processado de forma simples e segura: você solicita, o sistema verifica seu saldo e libera o valor diretamente na sua conta vinculada ao cpf.</p>
        {predefinedValues.map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => handleSelectValue(value)}
            className="py-2 w-1/3 shrink-0 rounded border border-neutral-600 text-white hover:bg-accent-700 hover:border-accent-600 transition duration-300"
          >
            R$ {value.toFixed(2)}
          </button>
        ))}
      </div>

      {/* Campo de valor */}
      <input
        className="border py-2 px-3 rounded border-neutral-400/30 duration-300 focus:outline-none focus:border-neutral-400/80 bg-neutral-800 text-white"
        type="number"
        placeholder="Valor do saque:"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      {/* Botão de saque */}
      <button
        type="submit"
        className="w-full py-2 hover:bg-accent-600 border-accent-600 border cursor-pointer hover:border-accent-700 text-white rounded font-medium transition duration-300"
      >
        Resgatar
      </button>
    </form>
  );
}
