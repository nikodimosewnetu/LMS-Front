import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PaymentSuccess = () => {
  const [message, setMessage] = useState("");
  const location = useLocation();
  const tx_ref = new URLSearchParams(location.search).get("tx_ref");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const response = await fetch(`https://lms-dot-final-3.onrender.com/verify-payment/${tx_ref}`);
        const data = await response.json();

        if (data.success) {
          setMessage(data.message);
        } else {
          setMessage("Payment failed or was not verified.");
        }
      } catch (error) {
        setMessage("Error verifying payment.");
      }
    };

    verifyPayment();
  }, [tx_ref]);

  return <div>{message}</div>;
};

export default PaymentSuccess;
