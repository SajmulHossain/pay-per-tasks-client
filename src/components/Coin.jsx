
import { FaCoins } from "react-icons/fa";
import useCoin from "../hooks/useCoin";

const Coin = () => {

  const [coin, isLoading] = useCoin();

  

  if (isLoading) {
    return (
      <div className="w-12 flex flex-col">
        <div className="skeleton h-8 w-full"></div>
      </div>
    );
  }
  return (
    <p className="bg-second-color/40 px-4 py-2 btn">
      <FaCoins />
      {coin}
    </p>
  );
};

export default Coin;
