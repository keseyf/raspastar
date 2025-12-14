import { BiUser, BiWallet } from "react-icons/bi";
import { HiHome } from "react-icons/hi";

export default function DownMenuMobile({ onClickProfileEvent, onClickWalletEvent}: any) {
    return (
        <article className="fixed z-20 flex py-2 items-center justify-center bottom-10 px-7 border border-neutral-600/50 bg-neutral-900/70 backdrop-blur-lg rounded-3xl -translate-x-1/2 left-1/2">
            <nav>
                <ul className="flex gap-7">
                    <li>
                        <a href="/">
                            <HiHome className=" rounded-full p-4 hover:bg-accent-700/80 active:bg-accent-600 duration-200 w-14 h-14" />
                        </a>
                    </li>
                    <li className="group">
                        <a className="cursor-pointer duration-200" onClick={() => { onClickWalletEvent() }}>
                            <BiWallet className=" rounded-full p-4 hover:bg-accent-700/80 active:bg-accent-600 duration-200 w-14 h-14" />
                        </a>
                    </li>
                    <li>
                        <a onClick={() => {
                            onClickProfileEvent()
                        }}>
                            <BiUser className="cursor-pointer rounded-full p-4 hover:bg-accent-700/80 active:bg-accent-600 duration-200 w-14 h-14" />
                        </a>
                    </li>
                </ul>
            </nav>
        </article>
    )
}