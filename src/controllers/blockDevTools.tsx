
export const desabilitarCliqueDireito = (e: MouseEvent) => {
    e.preventDefault();
}

export const bloquearAtalhos = (e: KeyboardEvent) => {
    // Desabilitar F12
    if (e.key === "F12") {
        e.preventDefault();
        return;
    }
    // Ctrl + Shift + I (DevTools)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "I") {
        e.preventDefault();
        return;
    }
    // Ctrl + Shift + J (Console DevTools)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "J") {
        e.preventDefault();
        return;
    }
    // Ctrl + Shift + C (Inspecionar elemento)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "C") {
        e.preventDefault();
        return;
    }
    // Ctrl + U (Ver Source)
    if ((e.ctrlKey || e.metaKey) && e.key === "U") {
        e.preventDefault();
        return;
    }
    // Ctrl + S (Salvar)
    if ((e.ctrlKey || e.metaKey) && e.key === "S") {
        e.preventDefault();
        return;
    }
}