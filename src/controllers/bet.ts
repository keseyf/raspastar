import axios from "axios";

export const bet = async (gameId: number, userId: string, setLoading: any) => {
    try {
        const sleep = (ms:any) => new Promise(resolve => setTimeout(resolve, ms))
        await sleep(350)

        if(!gameId){
            return "Game Id não definido"
        }

        if(!userId){
            return "User Id não definido"
        }

        const response = await axios.post("http://localhost:4444/api/v2/games/gambling", {}, {
            headers: {
                "x-api-key": "f455142c9fa86c67b9093b57990a8cd0a3d7e7603683dbdce1cfac9328baa983",
                "x-game-id": gameId,
                "x-user-id": userId
            }
        });
        if(response.data.board){
            return response.data
        }
    } catch (error) {
        console.error("Erro ao raspar raspadinha:", error);
        return ("Erro ao raspar raspadinha: " + error);
    } finally {
        setLoading(false);
    }
};