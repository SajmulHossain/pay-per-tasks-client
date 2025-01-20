import { BiCoinStack } from "react-icons/bi";
import { CiDollar } from "react-icons/ci";
import useCoin from "../../../hooks/useCoin";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import CrudLoading from "../../../components/CrudLoading";

const Withdrawal = () => {
  const [coin, isLoading] = useCoin();
  const [withdrawCoin, setWithdrawCoin] = useState(0);
  const { user } = useAuth();
  const [error, setError] = useState('');
  const axiosSecure = useAxiosSecure();
  const [isClicked, setIsClicked] = useState(false);

  const {mutateAsync, isPending} = useMutation({
    mutationFn: async(withdrawData) => {
      const { data } = await axiosSecure.post(`/withdraws`, withdrawData);

      if(data?.insertedId) {
        toast.success('Payment withdraw request sent successfully!');
      } else {
        toast.error('Something went wrong!')
      }
    }
  })

  const handlePayment = async (e) => {
    setIsClicked(true);
    e.preventDefault();

    const form = e.target;
    const payment_method = form.payment_method.value;
    const accountNumber = form.accountNumber.value;

    if(!withdrawCoin || isNaN(withdrawCoin) || !payment_method || !accountNumber ) {
      setIsClicked(false);
      return setError('Please give valid input. Account number and Coin should number input!')
    }

    const data = {
      worker_email: user?.email,
      worker_name: user?.displayName,
      withdrawal_coin: parseInt(withdrawCoin),
      withdrawal_amount: withdrawCoin * 0.05,
      payment_system: payment_method,
      withdraw_date: new Date().toISOString(),
      account_number: accountNumber,
    };


    try {
      await mutateAsync(data);
      document.getElementById("payment-form").close();
    } finally {
      setIsClicked(false);
    }
  };

  return (
    <section className="section">
      {isLoading ? (
        <div className="w-full join join-vertical md:join-horizontal gap-[1px]">
          <div className="skeleton h-20 w-full join-item"></div>
          <div className=" h-20 bg-gray-300 hidden skeleton w-[4px] md:block"></div>
          <hr className="md:hidden border-gray-300" />
          <div className="skeleton h-20 w-full join-item"></div>
          <div className=" h-20 bg-gray-300 hidden skeleton w-[4px] md:block"></div>
          <hr className="md:hidden border-gray-300" />
          <div className="skeleton h-20 w-full join-item"></div>
        </div>
      ) : (
        <>
          <div className="stats stats-vertical md:stats-horizontal shadow w-full">
            <div className="stat">
              <div className="stat-figure text-main-color">
                <BiCoinStack size={30} />
              </div>
              <div className="stat-title">Total Coin</div>
              <div className="stat-value">{coin}</div>
            </div>
            <div className="stat">
              <div className="stat-figure text-main-color">
                <CiDollar size={30} />
              </div>
              <div className="stat-title">Dollars</div>
              <div className="stat-value">{coin * 0.05}$</div>
            </div>
          </div>
          <p className="mt-2 italic text-gray-500 text-sm">
            Note: You must have minimum 200 coins to withdraw the payment.
          </p>

          <div className="flex justify-center mt-4">
            <button
              onClick={() =>
                document.getElementById("payment-form").showModal()
              }
              disabled={coin < 200}
              className="btn bg-main-color"
            >
              Request for Withdraw
            </button>
          </div>
        </>
      )}

      <dialog id="payment-form" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Withdraw Payment!</h3>

          <form onSubmit={handlePayment}>
            {error && <p className="text-red-600 my-4 text-center">{error}</p>}
            <div className="space-y-2">
              <div className="form-control">
                <label htmlFor="coin" className="label">
                  Coin
                </label>
                <input
                  onChange={(e) => setWithdrawCoin(e.target.value)}
                  type="text"
                  name="coin"
                  id="coin"
                  placeholder="Coin"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label htmlFor="dollars" className="label">
                  Dollars
                </label>
                <input
                  readOnly
                  disabled
                  value={(withdrawCoin * 0.05).toFixed(2)}
                  type="text"
                  id="dollars"
                  placeholder="Dollars"
                  className="input input-bordered"
                />
              </div>

              <div className="form-control">
                <label className="label" htmlFor="payment_method">Payment Method</label>
                <select className="select select-bordered" defaultValue='' name="payment_method" id="payment_method">
                  <option value=''>Select payment method</option>
                  <option value='bkash'>Bkash</option>
                  <option value='nagad'>Nagad</option>
                  <option value='rocket'>Rocket</option>
                </select>
              </div>

              <div className="form-control">
                <label htmlFor="accountNumber" className="label">Account Number</label>
                <input type="text" placeholder="Enter Account Number" className="input input-bordered" id="accountNumber" name="accountNumber" />
              </div>
            </div>

            <div className="mt-4 space-x-2">
              <button
                type="button"
                className="btn bg-second-color/70 hover:bg-second-color"
                onClick={() => document.getElementById("payment-form").close()}
              >
                Close
              </button>
              <button disabled={(withdrawCoin > coin) || isClicked} className="btn bg-main-color/70 hover:bg-main-color" type="submit">{withdrawCoin > coin ? 'Insufficient Coin': 'Submit'}{isPending && <CrudLoading />}</button>
            </div>
          </form>
        </div>
      </dialog>
    </section>
  );
};

export default Withdrawal;
