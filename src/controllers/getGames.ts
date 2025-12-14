import axios from "axios";

export const getGames = async (setGames: React.Dispatch<React.SetStateAction<any[]>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>, setError: React.Dispatch<React.SetStateAction<string>>) => {
      try {
        const response = await axios.get("http://localhost:4444/api/v2/games/getAll", {
          headers: {
            "x-api-key": import.meta.env.VITE_API_KEY
          }
        });

        if (response.data.games) {
          setGames(response.data.games);
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