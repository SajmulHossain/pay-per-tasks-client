/* eslint-disable react/prop-types */


import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import "../styles/common.css";
import toast from "react-hot-toast";
import { useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";

const CheckOutForm = ({price}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();


  
  const getPaymentIntent = async () => {
    try {
      console.log(price);
      const { data } = await axiosSecure.post('/payment', {price});
setClientSecret(data.clientSecret);
    } catch(err) {
      console.log(err);
    }
  }

  const handleSubmit = async (event) => {
    
    getPaymentIntent();
    // Block native form submission.
    event.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return toast.error('Something went wrong!');
    }
    
    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);
    
    if (card == null) {
      return;
    }
    
    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    
    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }

     const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
       payment_method: {
         card: card,
         billing_details: {
           name: user?.displayName,
           email: user?.email,
         },
       },
     });
if(paymentIntent.status === 'succeeded') {
  console.log('do something');
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
      <button type="submit" className="w-full" disabled={!stripe}>
        Pay ${price}
      </button>
    </form>
  );
};


export default CheckOutForm;
