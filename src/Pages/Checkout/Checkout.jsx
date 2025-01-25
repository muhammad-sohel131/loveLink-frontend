import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosPublic from "../../hooks/UseAxiosPublic";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

// Load Stripe Public Key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_api);

const CheckoutForm = () => {
  const { id } = useParams(); 
  const {user} = useContext(AuthContext);
  const userEmail = user.email; 
  const [clientSecret, setClientSecret] = useState('')
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const { data: bioData} = useQuery({
    queryKey: ["bioId"],
    queryFn: async () => {
      const result = await axiosSecure.get(`/biosId/${id}`);
      return result.data;
    }
  })

  const handleRequestContact = async () => {
    const contact = {
      name: bioData.name,
      auth_email: user.email,
      email: bioData.email,
      phone: bioData.mobile,
      bio_id: bioData.bio_id,
      status: 'pending'
    }
    try{
      const result = await axiosSecure.post('/contact-requests', contact);
      toast.success("You request has been sent!");
    }catch(err){
      console.log(err)
      toast.error("Something Wrong to send request!")
    }
  }
 
  useEffect(()=> {
    axiosSecure.post('/create-payment-intent', {
      price: 5
    })
    .then(res => {
      setClientSecret(res.data.clientSecret)
    })
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError("");

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    const { paymentIntent,error:confirmErr } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          email: userEmail
        }
      }
    })
    
    if(confirmErr){
      console.log(confirmErr)
      toast.error("Something Wrong")
    }else{
      toast.success("Payment Successful!")
      handleRequestContact();
    }
    setLoading(false)
  };


  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">🔒 Request Contact Information</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold">Biodata ID</label>
          <input
            type="text"
            value={id}
            readOnly
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold">Your Email</label>
          <input
            type="email"
            value={userEmail}
            readOnly
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold">Card Details</label>
          <div className="border border-gray-300 p-3 rounded-md">
            <CardElement />
          </div>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading || !clientSecret}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {loading ? "Processing..." : "Pay $5 & Submit Request"}
        </button>
      </form>
    </div>
  );
};

const Checkout = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Checkout;
