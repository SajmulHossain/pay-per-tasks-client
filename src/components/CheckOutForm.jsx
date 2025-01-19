/* eslint-disable react/prop-types */

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import "../styles/common.css";
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useCoin from "../hooks/useCoin";
import { useEffect, useState } from "react";

const CheckOutForm = ({ price=0, coin=0 }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [,,refetch] = useCoin();
  const [clientSecret, setClientSecret] = useState('');

useEffect(() => {
  const fetchClientSecrete = async () => {
    try {
      const { data } = await axiosSecure.post("/payment", {
        price: parseFloat(price),
      });
      setClientSecret(data?.clientSecret);
    } catch (err) {
      console.log(err);
    }
  }

  fetchClientSecrete();
},[axiosSecure, price])



  const {mutateAsync, isPending} = useMutation({
    mutationKey: ['payments', user?.email],
    mutationFn: async(data) => {
     try {
       await axiosSecure.post(`/payments/${user?.email}`, data);
     } catch (err) {
      console.log(err);
     }
    }
  })

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return toast.error("Something went wrong!");
    }

    document.getElementById("my_modal_3").close();

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error,/* paymentMethod*/ } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("PaymentMethod successfull");
    }

    const { error:paymentError,paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: user?.displayName,
          email: user?.email,
        },
      },
    });


    if(paymentError)  {
      return toast.error('Payment failed!')
    }


    const {amount, currency, id} = paymentIntent || {};
    if (paymentIntent?.status === "succeeded") {
      toast.success("Payment Successfull");      
      navigate('/dashboard/payment-history', {state: isPending});
      const data = {
        amount, currency, id,coin,
        email:user?.email,
        name: user?.displayName
      }

      try {
        await mutateAsync(data);
        refetch();
      } catch (err) {
        console.log(err);
      }
    } else {
      toast.error('Something Went Wrong!')
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        type="submit"
        className="w-full btn bg-main-color/90 hover:bg-main-color hover:shadow-md"
        disabled={!stripe}
      >
        Pay ${price}
      </button>
    </form>
  );
};

export default CheckOutForm;
