/* eslint-disable react/prop-types */

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "../../../../components/CheckOutForm";

const stripePromise = loadStripe(import.meta.env.VITE_stripe_public_key);


const Payment = ({data}) => {
  const {package: type, price,coin,save} = data;

   
  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-xl text-center border-b border-main-color pb-2">
          Payment
        </h3>
        <div className="py-4 flex flex-col gap-4">
          <p>Package: {type}</p>
          <p>Coin: {coin}</p>
          <p>Price: {price}$</p>
          <p className="px-4 py-1 cursor-pointer rounded-full bg-second-color/30 hover:bg-second-color/50 w-fit">
            Save {save}%
          </p>
        </div>
        <div>
          <Elements stripe={stripePromise}>
            <CheckOutForm price={price} />
          </Elements>
        </div>
      </div>
    </dialog>
  );
};

export default Payment;
