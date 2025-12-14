import axios from "axios";
import type { ResponseData } from "../utils/interfaces";

export default async function loginController({ email, password }: { email: string, password: string }): Promise<ResponseData> {
    try {
        const response = await axios.post(
            import.meta.env.VITE_API_URL + "/users/login",
            { email, password },
            {
                headers: {
                    "x-api-key": import.meta.env.VITE_API_KEY,
                    "Content-Type": "application/json"
                }
            }
        );

        const data: ResponseData = {
            message: response.data?.message,
            token: response.data?.token,
            status: response.status || 200
        };

        return data;
    } catch (e: any) {
         const data: ResponseData = {
            message: e.response?.data?.message,
            status: e.response?.status || 400
        };
        return data || "Erro no login";
    }
}
