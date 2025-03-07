import React, { useState } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const BuyCourseButton = ({ courseId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false); // Track whether the form should be displayed
  const [formData, setFormData] = useState({
    amount: "",
    currency: "ETB", // You can keep the currency fixed or make it dynamic
    email: "",
    first_name: "",
    last_name: "",
    phone_number: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const purchaseCourseHandler = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://lms-dot-final-3.onrender.com/accept-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: formData.amount,
          currency: formData.currency,
          email: formData.email,
          first_name: formData.first_name,
          last_name: formData.last_name,
          phone_number: formData.phone_number,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data?.checkout_url) {
          window.location.href = data.checkout_url; // Redirect to Chapa checkout URL
        } else {
          toast.error("Invalid response from server.");
        }
      } else {
        toast.error(data?.message || "Failed to create checkout session");
      }
    } catch (error) {
      toast.error("An error occurred while initiating payment.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      {!showForm ? (
        <Button onClick={() => setShowForm(true)} className="w-full py-3 bg-blue-600 text-white hover:bg-blue-700">
          Purchase Course
        </Button>
      ) : (
        <div className="max-w-lg mx-auto mt-6 p-6 border rounded-lg shadow-lg bg-white">
          <form className="space-y-4">
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Enter amount"
                required
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="Enter your first name"
                required
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Enter your last name"
                required
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </form>

          <Button
            disabled={isLoading}
            onClick={purchaseCourseHandler}
            className="w-full py-3 mt-4 bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-300"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Purchase Course"
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default BuyCourseButton;
