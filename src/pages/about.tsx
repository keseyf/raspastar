/* COMPONENTE REUTILIZÁVEL PARA SEÇÕES */
function Section({ id, title, children }: any) {
    return (
        <>
            <section id={id} className="scroll-mt-32 px-6">
                <h2 className="text-4xl font-black mb-4 text-accent-600">{title}</h2>
                <p className="text-neutral-400 leading-relaxed">{children}</p>
            </section>

            <hr className="border-neutral-800 opacity-40 my-10 mx-6" />
        </>
    );
}

export default function About() {
    return (
        <main className="w-full flex flex-col gap-16">

            {/* HEADER */}
            <header className="w-full text-xs sticky top-0 z-[1000] flex-wrap flex items-center justify-center gap-8 px-10 py-4 border-b border-neutral-700/50 bg-neutral-950/60 backdrop-blur-lg shadow-lg">
                {[
                    { href: "#regulamentos", label: "Regulamentos" },
                    { href: "#jogo-responsavel", label: "Jogo Responsável" },
                    { href: "#politica-de-privacidade", label: "Política" },
                    { href: "#termos-de-uso", label: "Termos" },
                    { href: "#perguntas-frequentes", label: "FAQ" },
                    { href: "#como-jogar", label: "Como Jogar" },
                    { href: "#como-sacar-premios", label: "Como Sacar" },
                    { href: "#suporte-ao-cliente", label: "Suporte" }
                ].map((item, i) => (
                    <a
                        key={i}
                        href={item.href}
                        className="text-neutral-300 hover:text-accent-600 transition-colors duration-200 font-medium"
                    >
                        {item.label}
                    </a>
                ))}
            </header>

            {/* SECTION TEMPLATE */}
            <Section id="regulamentos" title="Regulamentos">
                Este jogo de raspadinha digital foi desenvolvido para fins de
                entretenimento. O usuário deve ler atentamente todas as regras antes
                de participar. Cada raspadinha possui um valor específico e oferece a
                possibilidade de premiações variadas de acordo com a sorte do jogador.
                <br /><br />
                As premiações são determinadas de forma automática pelo sistema,
                utilizando algoritmos de geração aleatória certificados. A participação
                no jogo implica concordância integral com todos os termos, políticas e
                condições aqui descritas.
            </Section>

            <Section id="jogo-responsavel" title="Jogo Responsável">
                Incentivamos a prática de jogo consciente. A raspadinha é uma forma de
                diversão e não deve ser encarada como fonte de renda. Estabeleça limites
                para seus gastos e jogue apenas valores que não comprometam suas
                finanças.
                <br /><br />
                Caso sinta perda de controle, recomendamos que interrompa suas
                atividades e procure ajuda profissional.
            </Section>

            <Section id="politica-de-privacidade" title="Política de Privacidade">
                Coletamos apenas informações essenciais para garantir o bom
                funcionamento da plataforma, como dados de cadastro, histórico de jogo
                e transações financeiras.
                <br /><br />
                Todas as informações são armazenadas de forma segura e nunca são
                compartilhadas com terceiros sem autorização.
            </Section>

            <Section id="termos-de-uso" title="Termos de Uso">
                Ao utilizar este serviço, o usuário declara estar ciente e de acordo com
                todas as regras estabelecidas nesta plataforma. É proibido o uso
                indevido, tentativas de fraude, manipulação de resultados ou qualquer
                atividade que possa comprometer a integridade do sistema.
                <br /><br />
                A plataforma reserva-se o direito de suspender contas que violem estes
                termos.
            </Section>

            <Section id="perguntas-frequentes" title="Perguntas Frequentes">
                <strong>• Como funciona o jogo?</strong><br />
                Você escolhe uma raspadinha, realiza o pagamento e raspa a tela para
                revelar os prêmios.
                <br /><br />
                <strong>• Os resultados são aleatórios?</strong><br />
                Sim. Utilizamos algoritmos que garantem sorteios 100% randômicos.
                <br /><br />
                <strong>• Onde vejo meus prêmios?</strong><br />
                Seus ganhos ficam registrados no painel da sua conta.
            </Section>

            <Section id="como-jogar" title="Como Jogar?">
                1. Escolha a raspadinha desejada.<br />
                2. Confirme o valor e finalize a compra.<br />
                3. Raspe a área indicada para revelar os símbolos.<br />
                4. Caso forme uma combinação premiada, o valor é creditado
                automaticamente em sua conta.
                <br /><br />
                É simples, rápido e divertido!
            </Section>

            <Section id="como-sacar-premios" title="Como Sacar Prêmios?">
                Para sacar seus prêmios, acesse o menu “Saques”, escolha o valor
                desejado e selecione o método de pagamento disponível.
                <br /><br />
                Saques são processados dentro do prazo informado e podem exigir
                verificação de identidade para segurança do usuário.
            </Section>

            <Section id="suporte-ao-cliente" title="Suporte ao Cliente">
                Nossa equipe está disponível para ajudar em dúvidas, problemas técnicos
                ou orientações gerais.
                <br /><br />
                Você pode entrar em contato via chat, e-mail ou pelo formulário de
                suporte. Estamos sempre prontos para ajudar!
            </Section>

        </main>
    );
}

