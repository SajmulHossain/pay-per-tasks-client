import { useState } from "react";
import Heading from "../../../components/Heading";
import Payment from "./Payment/Payment";


const PurchaseCoin = () => {
  const [data, setData] = useState({});

  const handleModal = (data) => {
    setData(data)
 document.getElementById("my_modal_3").showModal()
  }
  
  return (
    <section className="section">
      <Heading
        heading="Purchase Coin"
        title="Purchase coin to complete your tasks"
      />

      <div className="flex justify-center gap-4 flex-wrap">
        <div className="border w-full max-w-[400px] border-second-color rounded-md overflow-hidden">
          <h3 className="text-center py-3 bg-second-color font-semibold text-white">
            Most Popular
          </h3>

          <div className="p-4">
            <p className="text-gray-600">Save your best possible money</p>

            <div className="mt-6 flex items-center gap-2">
              <p>
                <strike className="text-gray-400">$USD: 100</strike>
              </p>
              <p className="px-4 py-1 cursor-pointer rounded-full bg-second-color/30 hover:bg-second-color/50">
                Save 75%
              </p>
            </div>
            <div className="mt-6 flex flex-col-reverse">
              <div className="flex gap-2 items-end">
                <p className="text-xl">$USD</p>
                <p className="text-2xl font-semibold">35$</p>
              </div>
              <p className="mb-2 text-3xl font-bold">1000 coins</p>
            </div>

            <div className="mt-6">
              <button
                onClick={() =>
                  handleModal({
                    package: "Most Popular",
                    price: 35,
                    coin: 1000,
                    save: 75,
                  })
                }
                className="btn w-full bg-main-color hover:bg-inherit"
              >
                Choose this plan
              </button>
            </div>
          </div>
        </div>

        <div className="border w-full max-w-[400px] border-second-color rounded-md overflow-hidden">
          <h3 className="text-center bg-second-color text-white font-semibold py-3">
            Premium
          </h3>

          <div className="p-4">
            <p className="text-gray-600">Get premium vibes</p>

            <div className="mt-6 flex items-center gap-2">
              <p>
                <strike className="text-gray-400">$USD: 50</strike>
              </p>
              <p className="px-4 py-1 cursor-pointer rounded-full bg-second-color/30 hover:bg-second-color/50">
                Save 60%
              </p>
            </div>
            <div className="mt-6 flex flex-col-reverse">
              <div className="flex gap-2 items-end">
                <p className="text-xl">$USD</p>
                <p className="text-2xl font-semibold">20$</p>
              </div>
              <p className="mb-2 text-3xl font-bold">500 coins</p>
            </div>

            <div className="mt-6">
              <button
                onClick={() =>
                  handleModal({
                    package: "Premium",
                    price: 20,
                    coin: 500,
                    save: 60,
                  })
                }
                className="btn w-full bg-main-color hover:bg-inherit"
              >
                Choose this plan
              </button>
            </div>
          </div>
        </div>

        <div className="border w-full max-w-[400px] border-second-color rounded-md overflow-hidden">
          <h3 className="text-center py-3 border-b border-second-color">
            Advance
          </h3>

          <div className="p-4">
            <p className="text-gray-600">Best deal in budget</p>

            <div className="mt-6 flex items-center gap-2">
              <p>
                <strike className="text-gray-400">$USD: 15</strike>
              </p>
              <p className="px-4 py-1 cursor-pointer rounded-full bg-second-color/30 hover:bg-second-color/50">
                Save 66.67%
              </p>
            </div>
            <div className="mt-6 flex flex-col-reverse">
              <div className="flex gap-2 items-end">
                <p className="text-xl">$USD</p>
                <p className="text-2xl font-semibold">10$</p>
              </div>
              <p className="mb-2 text-3xl font-bold">150 coins</p>
            </div>

            <div className="mt-6">
              <button
                onClick={() =>
                  handleModal({
                    package: "Advance",
                    coin: 150,
                    price: 10,
                    save: 66.67,
                  })
                }
                className="btn w-full bg-main-color hover:bg-inherit"
              >
                Choose this plan
              </button>
            </div>
          </div>
        </div>

        <div className="border w-full max-w-[400px] border-second-color rounded-md overflow-hidden">
          <h3 className="text-center py-3 border-b border-second-color">
            Basic
          </h3>

          <div className="p-4">
            <p className="text-gray-600">Basic package</p>

            <div className="mt-6 flex items-center gap-2">
              <p>
                <strike className="text-gray-400">$USD: 1</strike>
              </p>
              <p className="px-4 py-1 cursor-pointer rounded-full bg-second-color/30 hover:bg-second-color/50">
                Save 00%
              </p>
            </div>
            <div className="mt-6 flex flex-col-reverse">
              <div className="flex gap-2 items-end">
                <p className="text-xl">$USD</p>
                <p className="text-2xl font-semibold">1$</p>
              </div>
              <p className="mb-2 text-3xl font-bold">10 coins</p>
            </div>

            <div className="mt-6">
              <button
                onClick={() =>
                  handleModal({
                    package: "Basic",
                    coin: 10,
                    price: 1,
                    save: '00',
                  })
                }
                className="btn w-full bg-main-color hover:bg-inherit"
              >
                Choose this plan
              </button>
            </div>
          </div>
        </div>
      </div>

      <Payment data={data} />
    </section>
  );
};

export default PurchaseCoin;