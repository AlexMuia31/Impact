import { Box, Grid, MenuItem, Typography, Alert } from "@mui/material";
import React, { useState } from "react";
import { CustomTextField } from "./TextFields";
import { PinkButton } from "./Buttons";

const tokens = [
  { value: "ETH", label: "ETH" },
  { value: "USDT", label: "USDT" },
  { value: "STRK", label: "STRK" },
];

const GetFiat: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [token, setToken] = useState("USDT");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const postData = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setErrorMessage("");

    let headersList = {
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      PhoneNumber: phoneNumber,
      Token: token,
      Amount: Number(amount), // Make sure amount is a number
    });

    try {
      let response = await fetch(
        "https://off-the-ramp-api.onrender.com/api/v1/offramp-api",
        {
          method: "POST",
          body: bodyContent,
          headers: headersList,
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      setSuccess(true);
    } catch (error) {
      console.error("API call failed:", error);
      setErrorMessage("Failed to process your request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={postData}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ color: "#fff" }}>
            Get Fiat
          </Typography>
        </Grid>

        {/* Success Message */}
        {success && (
          <Grid item xs={12}>
            <Alert severity="success">Transaction successful!</Alert>
          </Grid>
        )}

        {/* Error Message */}
        {errorMessage && (
          <Grid item xs={12}>
            <Alert severity="error">{errorMessage}</Alert>
          </Grid>
        )}

        <Grid item xs={12}>
          <Box>
            <Typography sx={{ color: "#fff" }}>
              Enter your Phone Number:
            </Typography>
            <CustomTextField
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              fullWidth
              inputProps={{
                sx: {
                  "&::placeholder": {
                    color: "#fff",
                  },
                  color: "#fff",
                  backgroundColor: "grey",
                  borderRadius: "12px",
                },
              }}
            />
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box>
            <Typography sx={{ color: "#fff" }}>
              Select Crypto to Offramp:
            </Typography>
            <CustomTextField
              select
              value={token}
              onChange={(e) => setToken(e.target.value)}
              fullWidth
              inputProps={{
                sx: {
                  "&::placeholder": {
                    color: "#fff",
                  },
                  color: "#fff",
                  backgroundColor: "grey",
                  borderRadius: "12px",
                },
              }}
            >
              {tokens.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </CustomTextField>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box>
            <Typography sx={{ color: "#fff" }}>Amount to spend:</Typography>
            <CustomTextField
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              fullWidth
              inputProps={{
                sx: {
                  "&::placeholder": {
                    color: "#fff",
                  },
                  color: "#fff",
                  backgroundColor: "grey",
                  borderRadius: "12px",
                },
              }}
              type="number"
            />
          </Box>
        </Grid>

        <Grid item xs={12}>
          <PinkButton
            type="submit"
            fullWidth
            sx={{ marginTop: "16px" }}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </PinkButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GetFiat;
