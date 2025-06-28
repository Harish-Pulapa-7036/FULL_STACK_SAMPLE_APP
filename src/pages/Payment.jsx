import React from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Divider,
} from "@mui/material";

const Payment = () => {
  const handleRazorpayPayment = () => {
    const options = {
      key: "rzp_test_BmGGSY6MaqCzWn", // 🔁 Replace with your Razorpay test key
      amount: 49900, // 499.00 INR in paise
      currency: "INR",
      name: "ABOSS Store",
      description: "Test Transaction",
      image: "https://yourlogo.url/logo.png", // optional
      handler: function (response) {
        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
        console.log("Razorpay Payment Response:", response);
      },
      prefill: {
        name: "Harish",
        email: "harish@example.com",
        contact: "9876543210",
      },
      notes: {
        address: "ABOSS Mock Address",
      },
      theme: {
        color: "#1976d2",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", p: 3 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom align="center">
          Razorpay Payment
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="body1" sx={{ mb: 2 }}>
          Click the button below to make a mock payment of ₹499 using Razorpay.
        </Typography>

        <Button
          variant="contained"
          fullWidth
          color="primary"
          sx={{ py: 1.5 }}
          onClick={handleRazorpayPayment}
        >
          Pay ₹499 with Razorpay
        </Button>
      </Paper>
    </Box>
  );
};

export default Payment;
