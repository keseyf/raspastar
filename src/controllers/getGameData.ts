import axios from "axios";

export const getGameData = async (setGameInfo: React.Dispatch<React.SetStateAction<any>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>, setError: React.Dispatch<React.SetStateAction<string>>, id: number) => {  
    try { 
        const response = await axios.get(`${import.meta.env.VITE_API_URL}games/getById/`+id, {
          headers: {
            "x-api-key": import.meta.env.VITE_API_KEY
          }
        });

        if (response.data.gameInfo) {
          setGameInfo(response.data.gameInfo);
          console.log(response.data.gameInfo)
        }else{
            setError(response.data.message)
        }
      } catch (error) {
        console.error("Erro ao buscar raspadinhas:", error);
        setError("Erro ao buscar jogos: "+ error);
      } finally {
        setLoading(false);
      }
    };