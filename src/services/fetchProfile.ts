import getProfile from "../controllers/getProfile";

export default async function fetchProfiile({ userToken, setLoading, setResponse }: any) {


    const fetchProfile = async () => {
        const res = await getProfile(userToken, setLoading);
        if (res) {
            setResponse(res);
            console.log("Resposta da API:", res.usrdata);
        }
    };

    fetchProfile();
}