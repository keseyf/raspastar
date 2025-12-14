import axios from "axios";
import loginController from "./login";
import type { ResponseData } from "../utils/interfaces";

export default async function signUpController({
    username, name, cpf, password, email
}: any): Promise<ResponseData | undefined> {
    try {
        // Cria o usuário
        await axios.post(
            import.meta.env.VITE_API_URL + "/users/create/",
            { username, name, cpf, password, email },
            {
                headers: {
                    "x-api-key": import.meta.env.VITE_API_KEY,
                    "Content-Type": "application/json"
                }
            }
        );

        // Faz login automaticamente
        const loginResponse = await loginController({ email, password });
        return loginResponse;

    } catch (error: any) {
        console.log(error.response?.data);

        return {
            message: error?.response?.data?.message || "Erro inesperado ao cadastrar.",
            status: error?.response?.status || 500
        };
    }
}

