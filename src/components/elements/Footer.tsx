import React from "react";

export default function Footer() {

  const nome1 = import.meta.env.VITE_NAME_APP1
  const nome2 = import.meta.env.VITE_NAME_APP2

  if(!nome1 || !nome2){
    throw new Error("Nomes devem ser definidos antes.")
  }
  return (
    <footer className="bg-neutral-900 text-white py-10 px-6 mt-16">
      <section className="max-w-6xl mx-auto flex flex-col md:flex-row items-start justify-between gap-10">
        {/* Logo */}
        <div className="w-full flex justify-center items-start space-y-3 flex-col">
          <h1 className="text-2xl font-black ">#{nome1}<span className="text-accent-700">{nome2}</span></h1>
          <p className="text-sm text-neutral-400">
            A sorte está a um clique de distância.
          </p>
          <div className="text-center text-sm text-neutral-500">
            &copy; {new Date().getFullYear()} {nome1+nome2}. Todos os direitos reservados.
          </div>
        </div>

        {/* Navegação */}
        <nav className="flex flex-col sm:flex-row gap-10 w-full justify-end">
          {/* Coluna 1 */}
          <div>
            <h2 className="text-lg font-semibold mb-3 px-3 bg-accent-700">Regulamentos</h2>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                <a href="/sobre/#jogo-responsavel" className="hover:text-white hover:animate-easego duration-150">
                  Jogo responsável
                </a>
              </li>
              <li>
                <a href="/sobre/#politica-de-privacidade" className="hover:text-white hover:animate-easego duration-150">
                  Política de privacidade
                </a>
              </li>
              <li>
                <a href="/sobre/#termos-de-uso" className="hover:text-white hover:animate-easego duration-150">
                  Termos de uso
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 2 */}
          <div>
            <h2 className="text-lg font-semibold mb-3 px-3 bg-accent-700">Perguntas frequentes</h2>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                <a href="/sobre/#como-jogar" className="hover:text-white hover:animate-easego duration-150">
                  Como jogar?
                </a>
              </li>
              <li>
                <a href="/sobre/#como-sacar-premios" className="hover:text-white hover:animate-easego duration-150">
                  Como sacar prêmios?
                </a>
              </li>
              <li>
                <a href="/sobre/#suporte-ao-cliente" className="hover:text-white hover:animate-easego duration-150">
                  Suporte ao cliente
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </section>
    </footer>
  );
}
