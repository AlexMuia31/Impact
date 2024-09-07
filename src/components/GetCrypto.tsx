import { Box, Grid, MenuItem, Typography } from "@mui/material";
import React, { useState } from "react";
import { CustomTextField } from "./TextFields";
import { PinkButton } from "./Buttons";
import {
  useGetOnrampMutation,
  useGetKesPriceQuery,
  useGetEthPriceQuery,
} from "@/Api/services";

const tokens = [
  {
    value: "ETH",
    label: "ETH",
  },
  {
    value: "USDT",
    label: "USDT",
  },
  {
    value: "STRK",
    label: "STRK",
  },
];

const currencies = [
  { value: "KES", label: "KES" },
  { value: "TZS", label: "TZS" },
];

const GetCrypto = () => {
  const [createStk, setCreateStk] = useState({
    PhoneNumber: "",
    Amount: "",
    currency: "",
    token: "",
    recipient: "",
    isTestnet: true,
  });
  const [stkPush, { isLoading, isError, isSuccess }] = useGetOnrampMutation();
  const [usdAmount, setUsdAmount] = useState("");

  const {
    data,
    isError: priceError,
    isSuccess: successError,
    isLoading: loadingError,
  } = useGetKesPriceQuery({});

  const {
    data: eth,
    isError: ethError,
    isLoading: ethLoading,
    isSuccess: ethSuccess,
  } = useGetEthPriceQuery({});

  React.useEffect(() => {
    if (data?.data?.quote?.USD?.price && createStk.Amount) {
      const conversionRate = data.data.quote.USD.price;
      const amountInKes = parseFloat(createStk.Amount);
      if (!isNaN(amountInKes)) {
        const amountInUsd = (amountInKes * conversionRate).toFixed(2);
        setUsdAmount(`~ ${amountInUsd} USD`);
      } else {
        setUsdAmount("");
      }
    } else {
      setUsdAmount("");
    }
  }, [data, createStk.Amount]);

  const handleCreateStk = async (event: any) => {
    event.preventDefault();
    try {
      const response = await stkPush(createStk).unwrap();
      console.log("Success:", response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setCreateStk((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Box component="form" onSubmit={handleCreateStk}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ color: "#fff" }}>
            Get Crypto
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box>
            <Typography sx={{ color: "#fff" }}>
              Enter your Phone Number:
            </Typography>
            <CustomTextField
              placeholder="Phone Number"
              name="PhoneNumber"
              value={createStk.PhoneNumber}
              onChange={handleChange}
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
            <Typography sx={{ color: "#fff" }}>Amount to spend:</Typography>
            <CustomTextField
              placeholder="Amount"
              name="Amount"
              value={createStk.Amount}
              onChange={handleChange}
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
            {usdAmount ? (
              <Typography sx={{ color: "#fff" }}>
                Approximately {usdAmount}
              </Typography>
            ) : (
              <></>
            )}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box>
            <Typography sx={{ color: "#fff" }}>
              Select Crypto to Buy:
            </Typography>
            <CustomTextField
              select
              name="token"
              value={createStk.token}
              onChange={handleChange}
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
            <Typography sx={{ color: "#fff" }}>Select Currency:</Typography>
            <CustomTextField
              select
              label="currency"
              name="currency"
              value={createStk.currency}
              onChange={handleChange}
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
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </CustomTextField>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box>
            <Typography sx={{ color: "#fff" }}>
              Recipient of the Crypto :
            </Typography>
            <CustomTextField
              label="Recipient"
              name="recipient"
              value={createStk.recipient}
              onChange={handleChange}
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
          <PinkButton
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Submit"}
          </PinkButton>
        </Grid>
        {isError && (
          <Grid item xs={12}>
            <Typography color="error">
              An error occurred. Please try again.
            </Typography>
          </Grid>
        )}
        {isSuccess && (
          <Grid item xs={12}>
            <Typography color="success" sx={{ color: "#fff" }}>
              Submitted successfully! Please Check Your Phone
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default GetCrypto;
