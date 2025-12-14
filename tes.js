import axios from "axios";

const response = await axios.post("http://localhost:4444/api/v2/games/gambling", {},{
          headers: {
            "x-api-key": "f455142c9fa86c67b9093b57990a8cd0a3d7e7603683dbdce1cfac9328baa983",
            "x-game-id": 4,
            "x-user-id": "ca7759d6-68a6-4f2c-b7f0-39682f2bb9d7"
          }
        });

        console.log(response)