import axios from "axios";
import type { ResponseData } from "../utils/interfaces";

export default async function rechargeController({ userToken, rechargeValue }: { userToken: string, rechargeValue: string }): Promise<ResponseData> {
    try {
        const response = await axios.post(
            import.meta.env.VITE_API_URL + "users/recharge/",
            { rechargeValue },
            {
                headers: {
                    "x-api-key": import.meta.env.VITE_API_KEY,
                    "x-user-token": userToken
                }
            }
        );

        const data: ResponseData = {
            message: response.data?.message,
            pixCopyPasteKey: response.data?.pixCopyPasteKey,
            status: response.status || 200
        };

        return data;
    } catch (e: any) {
         const data: ResponseData = {
            message: e.response?.data?.message,
            status: e.response?.status || 400
        };
        return data || "Erro na recarga";
    }
}
