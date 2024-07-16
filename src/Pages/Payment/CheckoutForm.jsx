import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../../Components/LoadingSpinner";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const CheckoutForm = ({ totalPrice, member, packageName }) => {
  const { loading, setLoading } = useAuth();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch((error) => {
          console.error("Error creating payment intent:", error);
          toast.error("Failed to create payment intent", {
            position: "top-center",
          });
        })
        .finally(() => setLoading(false));
    }
  }, [totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
      setIsSubmitting(false);
      toast.error("Payment error: " + error.message, {
        position: "top-center",
      });
    } else {
      setError("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      setIsSubmitting(false);
      toast.error("Payment confirmation error: " + confirmError.message, {
        position: "top-center",
      });
    } else {
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);

        const paymentData = {
          email: user?.email,
          package: packageName,
          limit: member,
        };

        try {
          const res = await axiosSecure.post("/update-payment", paymentData);
          if (res.data?.paymentResult === "success") {
            toast.success("Payment Success, Limit is increased", {
              position: "top-center",
            });
            navigate("/");
          }
        } catch (error) {
          console.error("Error saving payment:", error);
          toast.error("Failed to save payment", {
            position: "top-center",
          });
        } finally {
          setIsSubmitting(false);
        }
      } else {
        setIsSubmitting(false);
        toast.error("Payment failed", {
          position: "top-center",
        });
      }
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#fff",
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
        className="btn btn-sm btn-primary bg-primary text-white my-4"
        type="submit"
        disabled={!stripe || !clientSecret || isSubmitting}
      >
        {isSubmitting ? "Submitting Request..." : "Pay Now!"}
      </button>
      <p className="text-red-600">{error}</p>
      {transactionId && (
        <p className="text-white"> Your transaction id: {transactionId}</p>
      )}
    </form>
  );
};

export default CheckoutForm;
