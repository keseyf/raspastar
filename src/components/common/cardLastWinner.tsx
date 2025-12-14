import Cookie from "js-cookie";
import { genRandomUser, grp, grv } from "../../utils/func";

export default function LastWinnerCard() {

    const user = genRandomUser()

    return (
        <div className="flex hover:scale-95 group cursor-pointer duration-300 flex-col w-fit justify-center items-center ">
            <h2 className={`px-9 mb-2 w-full py-1 text-white text-center rounded-xl duration-300 ${user.prize === "pix" ? "bg-accent-700 group-hover:bg-accent-600" : "bg-green-600 group-hover:bg-green-500"}`}>{user.prize}</h2>
            <div className="px-3 py-3 flex w-fit items-center justify-evenly gap-5 rounded border border-accent-600">

                <div className="flex flex-col flex-1 items-center justify-center">
                    <h1 className="font-bold">{user.username.toLocaleUpperCase()}</h1>
                    <p className="text-xs text-neutral-500 whitespace-nowrap overflow-hidden text-ellipsis">
  Há {Math.floor(Math.random() * 59 + 1)} minutos
</p>
                </div>
                <div className="flex flex-col justify-start">
                    <h1 className="font-bold">R$<span className="text-accent-600 mx-0.5 font-black">{user.prize === "pix" ? grp() : grv()}</span></h1>
                </div>

            </div>
        </div>
    )
}