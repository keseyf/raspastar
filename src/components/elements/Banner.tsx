import { useEffect, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

export default function BannerArea() {
  const [index, setIndex] = useState<number>(0);
  const [windowSize, setWindowSize] = useState<number>(window.innerWidth);

  const imgs = [
    "./src/assets/banner1.png",
    "./src/assets/banner2.png",
    "./src/assets/banner3.png"
  ];

  const prev = () => {
    setIndex(index === 0 ? imgs.length - 1 : index - 1);
  };

  const next = () => {
    setIndex(index === imgs.length - 1 ? 0 : index + 1);
  };

  // Atualiza o tamanho da tela em tempo real
  useEffect(() => {
    const handleResize = () => setWindowSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col w-full items-center justify-start">
      {windowSize <= 1228 ? (
        // --- MOBILE ---
        <div className="flex justify-center flex-col items-center">
          <img
            key={index}
            className="w-full animate-easefade"
            src={imgs[index]}
            alt=""
          />
          <div className="flex flex-row w-full space-x-6 px-3 mt-4">
            <MdKeyboardArrowLeft
              className=" bg-accent-700 rounded flex-1 active:scale-75 duration-300 cursor-pointer"
              size={50}
              onClick={prev}
            />
            <MdKeyboardArrowRight
              className=" bg-accent-700 rounded flex-1 active:scale-75 duration-300 cursor-pointer"
              size={50}
              onClick={next}
            />
          </div>
        </div>
      ) : (
        // --- TABLET / DESKTOP ---
        <div className="flex flex-row h-fit items-center space-x-10">
          <MdKeyboardArrowLeft
            className="active:scale-75 duration-300 cursor-pointer"
            size={50}
            onClick={prev}
          />
          <img
            key={index}
            className="animate-easefade w-full"
            src={imgs[index]}
            alt=""
          />
          <MdKeyboardArrowRight
            className="active:scale-75 duration-300 cursor-pointer"
            size={50}
            onClick={next}
          />
        </div>
      )}
    </div>
  );
}
