import axios from "axios";
import type { ResponseData } from "../utils/interfaces";

export default async function getProfile(
    userToken: string | undefined,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
): Promise<ResponseData | undefined> {
    try {
        const response = await axios.get(import.meta.env.VITE_API_URL+"users/profile/",
            {
                headers: {
                    "x-api-key": import.meta.env.VITE_API_KEY,
                    "x-user-token": userToken
                }
            }
        );
        return response.data;
        
    } catch (error) {
        console.error("Erro ao buscar perfil:", error);
        return undefined;
    } finally {
        setLoading(false);
    }
}
